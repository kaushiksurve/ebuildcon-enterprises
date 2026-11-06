import { useState, useCallback } from 'react';
import { GeolocationState, Language } from '../types';

/**
 * Reverse geocode latitude and longitude into a clean, human-readable place name.
 * 1st choice: BigDataCloud Client Reverse Geocode API (fast, client-side CORS friendly)
 * 2nd choice: OpenStreetMap Nominatim API
 * 3rd choice: Regional intelligent fallback with GPS pin
 */
export async function reverseGeocodeCoordinates(
  lat: number,
  lng: number,
  lang: Language = 'mr'
): Promise<string> {
  // 1. Try BigDataCloud free client reverse geocode with a 3.5s timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const localityLang = lang === 'mr' ? 'mr' : lang === 'hi' ? 'hi' : 'en';
    const resp = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=${localityLang}`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (resp.ok) {
      const data = await resp.json();
      const parts: string[] = [];
      if (data.locality) parts.push(data.locality);
      if (data.city && !parts.includes(data.city)) parts.push(data.city);
      if (data.principalSubdivision && !parts.includes(data.principalSubdivision)) parts.push(data.principalSubdivision);
      if (data.postcode) parts.push(data.postcode);

      if (parts.length > 0) {
        return parts.join(', ');
      }
    }
  } catch (err) {
    console.warn('BigDataCloud reverse geocode lookup failed:', err);
  }

  // 2. Try Nominatim (OpenStreetMap) with a 4s timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const langHeader = lang === 'en' ? 'en' : lang === 'hi' ? 'hi,en' : 'mr,en';
    const resp = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      {
        signal: controller.signal,
        headers: {
          'Accept-Language': langHeader
        }
      }
    );
    clearTimeout(timeoutId);

    if (resp.ok) {
      const data = await resp.json();
      const a = data.address || {};
      const parts: string[] = [];

      // Most specific local entity (road, street, building, or residential)
      const road = a.road || a.pedestrian || a.street || a.residential;
      if (road) parts.push(road);

      // Suburb or neighbourhood
      const suburb = a.suburb || a.neighbourhood || a.subdistrict;
      if (suburb && !parts.includes(suburb)) parts.push(suburb);

      // Town or city
      const town = a.town || a.city || a.village || a.municipality;
      if (town && !parts.includes(town)) parts.push(town);

      // District
      const dist = a.state_district || a.county;
      if (dist && !parts.includes(dist) && dist !== town) parts.push(dist);

      const postcode = a.postcode;

      if (parts.length > 0) {
        return postcode ? `${parts.join(', ')} - ${postcode}` : parts.join(', ');
      }
      if (data.display_name) {
        return data.display_name.split(',').slice(0, 3).map((s: string) => s.trim()).join(', ');
      }
    }
  } catch (err) {
    console.warn('Nominatim reverse geocode lookup failed:', err);
  }

  // 3. Fallback clean place description if offline
  const isVasaiVirar = lat >= 19.3 && lat <= 19.5 && lng >= 72.75 && lng <= 72.95;
  if (isVasaiVirar) {
    return `Vasai-Virar Region (Site GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)})`;
  }
  return `Site Location (GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)})`;
}

function getLocalizedStatusMessage(
  code: GeolocationState['statusCode'],
  lang: Language,
  accuracy?: number | null,
  placeName?: string | null
): string {
  if (code === 'idle') {
    if (lang === 'en') return '📍 Click the button to fetch live location & place name via GPS.';
    if (lang === 'hi') return '📍 GPS द्वारा लाइव स्थान और जगह का नाम प्राप्त करने के लिए बटन दबाएं।';
    return '📍 GPS On + Location Allow करून जागेचे नाव आणि नकाशे मिळवण्यासाठी क्लिक करा.';
  }
  if (code === 'loading') {
    if (lang === 'en') return '⏳ Detecting GPS & fetching place name... (Please wait)';
    if (lang === 'hi') return '⏳ GPS खोज रहा है और जगह का नाम प्राप्त हो रहा है... (कृपया प्रतीक्षा करें)';
    return '⏳ Location व जागेचे नाव शोधत आहे... कृपया GPS चालू ठेवून थोडे थांबा...';
  }
  if (code === 'success') {
    const accStr = accuracy ? ` (±${Math.round(accuracy)}m)` : '';
    const placeStr = placeName ? `: ${placeName}` : '';
    if (lang === 'en') return `✅ Location & Place Name Detected${accStr}${placeStr}`;
    if (lang === 'hi') return `✅ लोकेशन और स्थान का नाम मिल गया${accStr}${placeStr}`;
    return `✅ Location व जागेचे नाव मिळाले${accStr}${placeStr}`;
  }
  if (code === 'denied') {
    if (lang === 'en') return '❌ Permission Denied - Location blocked in browser settings. Please allow location.';
    if (lang === 'hi') return '❌ Permission Denied - ब्राउज़र सेटिंग्स में Location Allow करें।';
    return '❌ Permission Denied - ब्राउझर सेटिंग्ज मध्ये जाऊन Location Allow करा.';
  }
  if (code === 'gps_off') {
    if (lang === 'en') return '❌ GPS Unavailable - Please enable device GPS and internet.';
    if (lang === 'hi') return '❌ GPS अनुपलब्ध - कृपया मोबाइल में GPS और इंटरनेट चालू करें।';
    return '❌ GPS Off किंवा स्थान अनुपलब्ध - मोबाईल मधील GPS व इंटरनेट चालू करा.';
  }
  if (code === 'timeout') {
    if (lang === 'en') return '❌ Request Timed Out - Please move to open sky and retry.';
    if (lang === 'hi') return '❌ Timeout - कृपया खुले आसमान में जाएं और पुनः प्रयास करें।';
    return '❌ Timeout - खुल्या जागेत जा, GPS चालू ठेवा आणि पुन्हा प्रयत्न करा.';
  }
  if (lang === 'en') return '❌ Failed to detect location. Order can still proceed.';
  if (lang === 'hi') return '❌ लोकेशन प्राप्त करने में विफल। इसके बिना भी ऑर्डर दे सकते हैं।';
  return '❌ एरर आला. तरीही ऑर्डर दिली जाऊ शकते, लोकेशन ऐच्छिक आहे.';
}

export function useGeolocation(lang: Language = 'mr') {
  const [geoState, setGeoState] = useState<GeolocationState>({
    loading: false,
    latitude: null,
    longitude: null,
    accuracy: null,
    mapsUrl: null,
    addressSummary: null,
    placeName: null,
    statusMessage: getLocalizedStatusMessage('idle', lang),
    statusCode: 'idle'
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoState({
        loading: false,
        latitude: null,
        longitude: null,
        accuracy: null,
        mapsUrl: null,
        addressSummary: null,
        placeName: null,
        statusMessage:
          lang === 'en'
            ? '❌ Geolocation is not supported in this browser. Please use Chrome or Edge.'
            : lang === 'hi'
            ? '❌ इस ब्राउज़र में Geolocation समर्थित नहीं है। कृपया Chrome या Edge का उपयोग करें।'
            : '❌ या ब्राउझरमध्ये Geolocation Supported नाही. कृपया Chrome किंवा Edge वापरा.',
        statusCode: 'error'
      });
      return;
    }

    setGeoState(prev => ({
      ...prev,
      loading: true,
      statusCode: 'loading',
      statusMessage: getLocalizedStatusMessage('loading', lang)
    }));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

        // Reverse geocode to get the human-readable place name instead of raw coordinates
        const placeName = await reverseGeocodeCoordinates(latitude, longitude, lang);

        setGeoState({
          loading: false,
          latitude,
          longitude,
          accuracy,
          mapsUrl,
          addressSummary: placeName,
          placeName,
          statusMessage: getLocalizedStatusMessage('success', lang, accuracy, placeName),
          statusCode: 'success'
        });
      },
      (error) => {
        let statusCode: GeolocationState['statusCode'] = 'error';

        if (error.code === 1) { // PERMISSION_DENIED
          statusCode = 'denied';
        } else if (error.code === 2) { // POSITION_UNAVAILABLE
          statusCode = 'gps_off';
        } else if (error.code === 3) { // TIMEOUT
          statusCode = 'timeout';
        }

        setGeoState(prev => ({
          ...prev,
          loading: false,
          statusCode,
          statusMessage: getLocalizedStatusMessage(statusCode, lang)
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      }
    );
  }, [lang]);

  const resetLocation = useCallback(() => {
    setGeoState({
      loading: false,
      latitude: null,
      longitude: null,
      accuracy: null,
      mapsUrl: null,
      addressSummary: null,
      placeName: null,
      statusMessage: getLocalizedStatusMessage('idle', lang),
      statusCode: 'idle'
    });
  }, [lang]);

  return {
    ...geoState,
    requestLocation,
    resetLocation
  };
}
