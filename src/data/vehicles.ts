import { Vehicle, Language } from '../types';

export function getLocalizedVehicles(lang: Language): Vehicle[] {
  if (lang === 'en') {
    return [
      {
        name: 'Tempo',
        type: 'Light Commercial Vehicle',
        capacityTon: '1.5 Ton',
        cbmCapacity: 2.3,
        description: 'Ideal for narrow access lanes and fast local site delivery (Up to 2.3 CBM)',
        badge: '100% Company-Owned',
        icon: 'Truck'
      },
      {
        name: 'Truck (4.5 Ton)',
        type: 'Medium Duty Truck',
        capacityTon: '4.5 Ton',
        cbmCapacity: 6.9,
        description: 'Perfect for standard building construction sites and medium orders (Up to 6.9 CBM)',
        badge: '100% Company-Owned',
        icon: 'Truck'
      },
      {
        name: 'Truck (13 Ton)',
        type: 'Heavy Duty Multi-Axle Truck',
        capacityTon: '13 Ton',
        cbmCapacity: 18.0,
        description: 'High efficiency bulk transit for large builders and tower developments (Up to 18 CBM)',
        badge: '100% Company-Owned',
        icon: 'Truck'
      },
      {
        name: 'Truck (22 Ton)',
        type: 'Heavy Commercial Hauler',
        capacityTon: '22 Ton',
        cbmCapacity: 32.0,
        description: 'Maximum capacity for commercial mega-projects and direct factory bulk supply (Up to 32 CBM)',
        badge: '100% Company-Owned',
        icon: 'Truck'
      }
    ];
  }

  if (lang === 'hi') {
    return [
      {
        name: 'Tempo',
        type: 'हल्का वाणिज्यिक वाहन',
        capacityTon: '1.5 Ton',
        cbmCapacity: 2.3,
        description: 'तंग गलियों और त्वरित स्थानीय साइट डिलीवरी के लिए उपयुक्त (2.3 CBM तक)',
        badge: '100% अपनी गाड़ी',
        icon: 'Truck'
      },
      {
        name: 'Truck (4.5 Ton)',
        type: 'मध्यम ट्रक',
        capacityTon: '4.5 Ton',
        cbmCapacity: 6.9,
        description: 'मध्यम आकार की साइट्स और सामान्य निर्माण ऑर्डर्स के लिए उपयुक्त (6.9 CBM तक)',
        badge: '100% अपनी गाड़ी',
        icon: 'Truck'
      },
      {
        name: 'Truck (13 Ton)',
        type: 'हेवी ड्यूटी मल्टी-एक्सल ट्रक',
        capacityTon: '13 Ton',
        cbmCapacity: 18.0,
        description: 'बड़े बिल्डर्स और हाउसिंग प्रोजेक्ट्स के लिए कुशल भारी परिवहन (18 CBM तक)',
        badge: '100% अपनी गाड़ी',
        icon: 'Truck'
      },
      {
        name: 'Truck (22 Ton)',
        type: 'विशाल कमर्शियल हॉलर',
        capacityTon: '22 Ton',
        cbmCapacity: 32.0,
        description: 'विशालकाय बल्क ऑर्डर्स और सीधे कारखाने से मेगा प्रोजेक्ट साइट सप्लाय (32 CBM तक)',
        badge: '100% अपनी गाड़ी',
        icon: 'Truck'
      }
    ];
  }

  // Default: Marathi
  return [
    {
      name: 'Tempo',
      type: 'Light Commercial Vehicle',
      capacityTon: '1.5 Ton',
      cbmCapacity: 2.3,
      description: 'लहान गल्ल्या आणि त्वरित स्थानिक डिलिव्हरीसाठी योग्य (Up to 2.3 CBM)',
      badge: '100% मालकीची गाडी',
      icon: 'Truck'
    },
    {
      name: 'Truck (4.5 Ton)',
      type: 'Medium Duty Truck',
      capacityTon: '4.5 Ton',
      cbmCapacity: 6.9,
      description: 'मध्यम आकाराच्या साईट्स आणि मध्यम ऑर्डर्ससाठी योग्य (Up to 6.9 CBM)',
      badge: '100% मालकीची गाडी',
      icon: 'Truck'
    },
    {
      name: 'Truck (13 Ton)',
      type: 'Heavy Duty Multi-Axle Truck',
      capacityTon: '13 Ton',
      cbmCapacity: 18.0,
      description: 'मोठ्या बिल्डर्स व गृहनिर्माण प्रकल्पांसाठी कार्यक्षम वाहतूक (Up to 18 CBM)',
      badge: '100% मालकीची गाडी',
      icon: 'Truck'
    },
    {
      name: 'Truck (22 Ton)',
      type: 'Heavy Commercial Hauler',
      capacityTon: '22 Ton',
      cbmCapacity: 32.0,
      description: 'प्रचंड मोठ्या ऑर्डर्स आणि थेट कारखाना ते साईट बल्क सप्लाय (Up to 32 CBM)',
      badge: '100% मालकीची गाडी',
      icon: 'Truck'
    }
  ];
}

export const VEHICLES = getLocalizedVehicles('mr');

export function getRecommendedVehicle(totalCbm: number, lang: Language = 'mr'): Vehicle | null {
  const list = getLocalizedVehicles(lang);
  if (totalCbm <= 0) return null;
  if (totalCbm <= 2.3) return list[0];
  if (totalCbm <= 6.9) return list[1];
  if (totalCbm <= 18.0) return list[2];
  return list[3];
}
