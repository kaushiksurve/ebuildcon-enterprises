import { Order, OrderItem, Language } from '../types';
import { CBM_MAP } from '../data/products';
import { COMPANY_INFO } from '../data/company';

export function calculateBlockCbm(inch: string, qty: number): { cbm: string; cbmVal: number; per: number } {
  const cleanInch = inch.includes('"') ? inch : `${inch}"`;
  const per = CBM_MAP[cleanInch] || 55;
  const cbmVal = qty > 0 ? qty / per : 0;
  return {
    cbm: cbmVal.toFixed(2),
    cbmVal,
    per
  };
}

export function calculateOrderTotals(items: OrderItem[], lang: Language = 'mr') {
  let totCbm = 0;
  let totBlockPcs = 0;
  const bagMap: Record<string, { qty: number; name: string }> = {};

  items.forEach(it => {
    if (it.type === 'block') {
      totCbm += it.cbmVal || parseFloat(it.cbm || '0');
      totBlockPcs += it.qty;
    } else {
      if (!bagMap[it.prod]) {
        bagMap[it.prod] = { qty: 0, name: it.name };
      }
      bagMap[it.prod].qty += it.qty;
    }
  });

  const unitPcs = lang === 'en' ? 'Pcs' : 'नग';
  const blockSummary = totBlockPcs > 0 ? `${totCbm.toFixed(2)} CBM (${totBlockPcs} ${unitPcs})` : '';

  const bagParts: string[] = [];
  for (const key in bagMap) {
    bagParts.push(`${bagMap[key].qty} Bag ${bagMap[key].name.split('-')[0].trim()}`);
  }
  const bagsSummary = bagParts.join(' + ');

  let combinedSummary = '';
  if (blockSummary && bagsSummary) {
    combinedSummary = `${blockSummary} + ${bagsSummary}`;
  } else if (blockSummary) {
    combinedSummary = blockSummary;
  } else if (bagsSummary) {
    combinedSummary = bagsSummary;
  } else {
    combinedSummary = '0 CBM';
  }

  return {
    totalCbm: totCbm.toFixed(2),
    totalBlockPcs: totBlockPcs,
    bagsSummary,
    combinedSummary,
    hasBlocks: totBlockPcs > 0,
    hasBags: bagParts.length > 0
  };
}

export function getTodayFormatted(): string {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export function cleanPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith('91')) return digits;
  return digits;
}

// Generate structured, readable WhatsApp message with full details localized per language
export function generateWhatsAppOrderMessage(order: Order, lang: Language = 'mr'): string {
  const isEn = lang === 'en';
  const isHi = lang === 'hi';
  const unitPcs = isEn ? 'Pcs' : 'नग';

  const itemsText =
    order.items && order.items.length > 0
      ? order.items
          .map((it, idx) => {
            if (it.type === 'block') {
              return `  ${idx + 1}. AAC Block ${it.inch || ''}: ${it.qty} ${unitPcs} (${it.cbm || ''} CBM)`;
            }
            return `  ${idx + 1}. ${it.name || it.prod}: ${it.qty} Bag`;
          })
          .join('\n')
      : `  • ${order.tot}`;

  if (isEn) {
    return `*🏗️ NEW ORDER! E BUILDCON ENTERPRISES*
━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Shop / Builder:* ${order.name}
📞 *Party Phone:* ${order.phone}
👷 *Site Supervisor:* ${order.supName}
📱 *Supervisor Phone:* ${order.supPhone}
📅 *Required Delivery Date:* ${order.date}
📍 *Site Address:* ${order.site}${order.del ? `\n🚚 *Delivery Location:* ${order.del}` : ''}${order.maps ? `\n🗺️ *Google Maps:* ${order.maps}` : ''}

📦 *Ordered Material (Total):*
*${order.tot}*

📋 *Item Details:*
${itemsText}
━━━━━━━━━━━━━━━━━━━━━━━━
🏢 *E BUILDCON ENTERPRISES*
📍 Plot No.5/2, Younus Estate, Khandipada Road, Kaman, Vasai (E) - 401202
✉️ ${COMPANY_INFO.email}
✅ ISO 9001:2015 Certified`;
  }

  if (isHi) {
    return `*🏗️ नई ऑर्डर! E BUILDCON ENTERPRISES*
━━━━━━━━━━━━━━━━━━━━━━━━
👤 *दुकान / बिल्डर:* ${order.name}
📞 *पार्टी फोन:* ${order.phone}
👷 *साइट सुपरवाइजर:* ${order.supName}
📱 *सुपरवाइजर फोन:* ${order.supPhone}
📅 *चाहिए डिलीवरी तारीख:* ${order.date}
📍 *साइट का पता:* ${order.site}${order.del ? `\n🚚 *डिलीवरी स्थान:* ${order.del}` : ''}${order.maps ? `\n🗺️ *गूगल मैप्स:* ${order.maps}` : ''}

📦 *सामग्री (Total Order):*
*${order.tot}*

📋 *आइटम विवरण:*
${itemsText}
━━━━━━━━━━━━━━━━━━━━━━━━
🏢 *E BUILDCON ENTERPRISES*
📍 Plot No.5/2, Younus Estate, Khandipada Road, Kaman, Vasai (E) - 401202
✉️ ${COMPANY_INFO.email}
✅ ISO 9001:2015 Certified`;
  }

  // Default Marathi
  return `*🏗️ नवीन ऑर्डर! E BUILDCON ENTERPRISES*
━━━━━━━━━━━━━━━━━━━━━━━━
👤 *दुकान / बिल्डर:* ${order.name}
📞 *पार्टी फोन:* ${order.phone}
👷 *साईट सुपरवायझर:* ${order.supName}
📱 *सुपरवायझर फोन:* ${order.supPhone}
📅 *हवी असलेली डिलिव्हरी तारीख:* ${order.date}
📍 *साईट पत्ता:* ${order.site}${order.del ? `\n🚚 *डिलिव्हरी ठिकाण:* ${order.del}` : ''}${order.maps ? `\n🗺️ *गुगल मॅप्स:* ${order.maps}` : ''}

📦 *मागवलेली सामग्री (Order Total):*
*${order.tot}*

📋 *आयटम तपशील:*
${itemsText}
━━━━━━━━━━━━━━━━━━━━━━━━
🏢 *E BUILDCON ENTERPRISES*
📍 Plot No.5/2, Younus Estate, Khandipada Road, Kaman, Vasai (E) - 401202
✉️ ${COMPANY_INFO.email}
✅ ISO 9001:2015 Certified`;
}

// Generate SAFE HTTPS wa.me links
export function generateWhatsAppOrderUrl(targetNumber: string, order: Order, lang: Language = 'mr'): string {
  const num = cleanPhoneNumber(targetNumber);
  const msg = generateWhatsAppOrderMessage(order, lang);
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}

export function generateDateChangeWhatsAppUrl(targetNumber: string, order: Order, newDate: string): string {
  const num = cleanPhoneNumber(targetNumber);
  const partyMsg = `नमस्कार ${order.name}! 🙏 E-Buildcon\nतुमची ऑर्डर तारीख बदलली आहे.\n📦 ऑर्डर: ${order.tot}\n📍 Site: ${order.site}\n📅 जुनी तारीख: ${order.origDate || order.date}\n📅 नवीन Delivery तारीख: ${newDate}\nकंपनी ने बदलली - कृपया Confirm करा.\nधन्यवाद - E-Buildcon - Vasai\nEmail: ${COMPANY_INFO.email}`;
  return `https://wa.me/${num}?text=${encodeURIComponent(partyMsg)}`;
}

export function generateDateChangeSmsUrl(targetNumber: string, order: Order, newDate: string): string {
  const clean = targetNumber.replace(/\D/g, '');
  const partyMsg = `E-Buildcon: Order Date Changed for ${order.name}. Old: ${order.origDate || order.date}, New: ${newDate}. Site: ${order.site}. Contact: 9819927174`;
  return `sms:+91${clean}?body=${encodeURIComponent(partyMsg)}`;
}

export function generateConfirmationWhatsAppUrl(targetNumber: string, order: Order): string {
  const num = cleanPhoneNumber(targetNumber);
  const msg = `तुमची ऑर्डर Confirm झाली! ${order.name} - ${order.tot} - हवी असलेली तारीख ${order.date} - E BUILDCON ENTERPRISES - ${COMPANY_INFO.email} - Personal Email नाही`;
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}

export function generateDispatchWhatsAppUrl(
  targetNumber: string,
  order: Order,
  driver: string,
  dPhone: string,
  vehicle: string
): string {
  const num = cleanPhoneNumber(targetNumber);
  const msg = `🚚 गाडी निघाली आहे! Party: ${order.name} - ${order.tot} - Driver: ${driver} - Phone: ${dPhone || ''} - Vehicle: ${vehicle || ''} - Site: ${order.site} ${order.del ? '- Delivery: ' + order.del : ''} - Maps: ${order.maps || ''} - हवी असलेली तारीख: ${order.date} - E BUILDCON - ${COMPANY_INFO.email}`;
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}

export interface CustomerReplyTemplate {
  id: string;
  label: string;
  message: string;
}

export function getCustomerReplyTemplates(order: Order, lang: Language = 'mr'): CustomerReplyTemplate[] {
  if (lang === 'en') {
    return [
      {
        id: 'confirm',
        label: '✅ Order Confirmed & Scheduled',
        message: `Hello ${order.name}! 🙏 Greetings from E BUILDCON ENTERPRISES.\nYour order for ${order.tot} has been confirmed for delivery on ${order.date}.\n📍 Site: ${order.site}\nOur team is preparing your dispatch. Thank you for your partnership!\n- E-Buildcon Enterprises, Vasai (Contact: 9819927174)\nEmail: ${COMPANY_INFO.email}`
      },
      {
        id: 'dispatch',
        label: '🚚 Vehicle Dispatched & Driver Info',
        message: `🚚 Material Dispatched! (E-Buildcon Enterprises)\nDear ${order.name},\nYour order ${order.tot} is loaded and dispatched from our factory.\n📍 Site: ${order.site}${order.del ? `\n🚚 Delivery Location: ${order.del}` : ''}${order.driverName ? `\n👤 Driver: ${order.driverName} (${order.driverPhone || 'On-call'})` : ''}${order.vehicleType ? `\n🚛 Vehicle: ${order.vehicleType}` : ''}\nPlease ensure site clearance and unloading personnel are ready.\n- E-Buildcon Enterprises, Vasai (9819927174)`
      },
      {
        id: 'date_update',
        label: '📅 Delivery Schedule Update',
        message: `📅 Delivery Date Update (E-Buildcon)\nDear ${order.name},\nRegarding your order (${order.tot}) at ${order.site}:\nUpdated Delivery Date: ${order.date}.\nPlease confirm if this date is suitable for site unloading.\n- E-Buildcon Enterprises, Vasai (9819927174)`
      },
      {
        id: 'location_inquiry',
        label: '📍 Location & Unloading Spot Inquiry',
        message: `📍 Site Location Clarification (E-Buildcon)\nDear ${order.name},\nRegarding your delivery at ${order.site}:\nKindly share the exact unloading location or send the Google Maps pin so our transport truck reaches without delays.\n- E-Buildcon Enterprises, Vasai (9819927174)`
      },
      {
        id: 'delivered',
        label: '🎉 Delivery Completed & Received',
        message: `✅ Delivery Completed! (E-Buildcon Enterprises)\nDear ${order.name},\nYour material (${order.tot}) has arrived at ${order.site}.\nPlease inspect the materials and acknowledge the delivery slip with the driver.\nThank you for choosing E-Buildcon Enterprises!\nEmail: ${COMPANY_INFO.email}`
      }
    ];
  }

  if (lang === 'hi') {
    return [
      {
        id: 'confirm',
        label: '✅ ऑर्डर कन्फर्म और शेड्यूल्ड',
        message: `नमस्ते ${order.name}! 🙏 E BUILDCON ENTERPRISES की ओर से।\nआपका ऑर्डर (${order.tot}) कन्फर्म हो गया है।\n📅 डिलीवरी तारीख: ${order.date}\n📍 साइट: ${order.site}\nसामग्री समय पर पहुंचाने के लिए हम पूरी तरह तैयार हैं। धन्यवाद!\n- E-Buildcon Enterprises, Kaman, Vasai\nईमेल: ${COMPANY_INFO.email}`
      },
      {
        id: 'dispatch',
        label: '🚚 गाड़ी रवाना और ड्राइवर विवरण',
        message: `🚚 गाड़ी रवाना हो चुकी है! (E-Buildcon Enterprises)\nग्राहक: ${order.name}\n📦 सामग्री: ${order.tot}\n📍 साइट: ${order.site}${order.del ? `\n🚚 डिलीवरी स्थान: ${order.del}` : ''}${order.driverName ? `\n👤 ड्राइवर: ${order.driverName} (${order.driverPhone || 'सीधा संपर्क'})` : ''}${order.vehicleType ? `\n🚛 वाहन: ${order.vehicleType}` : ''}\nगाड़ी शीघ्र ही पहुंच रही है। कृपया अनलोडिंग की व्यवस्था तैयार रखें।\n- E-Buildcon, Vasai (फोन: 9819927174)`
      },
      {
        id: 'date_update',
        label: '📅 डिलीवरी तारीख अपडेट',
        message: `📅 डिलीवरी तारीख अपडेट (E-Buildcon)\nग्राहक: ${order.name}\n📦 ऑर्डर: ${order.tot}\n📍 साइट: ${order.site}\n📅 नई डिलीवरी तारीख: ${order.date}\nकृपया इस तारीख की पुष्टि करें ताकि अनलोडिंग समय पर हो सके।\n- E-Buildcon Enterprises, Vasai (9819927174)`
      },
      {
        id: 'location_inquiry',
        label: '📍 लोकेशन / अनलोडिंग स्पॉट विवरण',
        message: `📍 साइट लोकेशन स्पष्टीकरण (E-Buildcon)\nप्रिय ${order.name},\nआपकी साइट ${order.site} के लिए कृपया सटीक अनलोडिंग स्थान या गूगल मैप्स लोकेशन लिंक इस WhatsApp पर भेजें ताकि डिलीवरी गाड़ी बिना देरी के पहुंचे।\n- E-Buildcon Enterprises, Vasai (9819927174)`
      },
      {
        id: 'delivered',
        label: '🎉 डिलीवरी पूर्ण और पुष्टि',
        message: `✅ सामग्री डिलीवर हो गई है! (E-Buildcon Enterprises)\nग्राहक: ${order.name}\n📦 ऑर्डर: ${order.tot}\n📍 साइट: ${order.site}\nआपकी सामग्री साइट पर सुरक्षित रूप से पहुंच गई है। कृपया जांच कर रसीद पर हस्ताक्षर करें। धन्यवाद!\n- E-Buildcon Enterprises, Vasai\nईमेल: ${COMPANY_INFO.email}`
      }
    ];
  }

  // Default Marathi
  return [
    {
      id: 'confirm',
      label: '✅ ऑर्डर कन्फर्म आणि नियोजित',
      message: `नमस्कार ${order.name}! 🙏 E BUILDCON ENTERPRISES कडून.\nतुमची ऑर्डर (${order.tot}) Confirm झाली आहे.\n📅 नियोजित डिलिव्हरी तारीख: ${order.date}\n📍 साईट: ${order.site}\nमाल वेळेवर पोहोचवण्यासाठी आमची टीम कार्यरत आहे. धन्यवाद!\n- E-Buildcon Enterprises, Kaman, Vasai\nईमेल: ${COMPANY_INFO.email}`
    },
    {
      id: 'dispatch',
      label: '🚚 गाडी निघाली आणि ड्रायव्हर माहिती',
      message: `🚚 गाडी निघाली आहे! (E-Buildcon Enterprises)\nग्राहक: ${order.name}\n📦 साहित्य: ${order.tot}\n📍 साईट: ${order.site}${order.del ? `\n🚚 डिलिव्हरी ठिकाण: ${order.del}` : ''}${order.driverName ? `\n👤 ड्रायव्हर: ${order.driverName} (${order.driverPhone || 'थेट संपर्क'})` : ''}${order.vehicleType ? `\n🚛 वाहन: ${order.vehicleType}` : ''}\nगाडी लवकरच पोहोचत आहे. कृपया अनलोडिंगची तयारी ठेवावी.\n- E-Buildcon, Vasai (फोन: 9819927174)`
    },
    {
      id: 'date_update',
      label: '📅 डिलिव्हरी तारीख बदल नोंद',
      message: `📅 डिलिव्हरी तारीख बदल नोंद (E-Buildcon)\nग्राहक: ${order.name}\n📦 ऑर्डर: ${order.tot}\n📍 साईट: ${order.site}\n📅 नवीन डिलिव्हरी तारीख: ${order.date}\nकृपया ही तारीख Confirm करावी जेणेकरून साईटवर अडचण येणार नाही.\n- E-Buildcon Enterprises, Vasai (9819927174)`
    },
    {
      id: 'location_inquiry',
      label: '📍 लोकेशन / अनलोडिंग पॉईंट माहिती हवी',
      message: `📍 साईट लोकेशन / अनलोडिंग पॉईंट माहिती हवी (E-Buildcon)\nग्राहक: ${order.name},\nतुमच्या ${order.site} साईटसाठी अचूक अनलोडिंग ठिकाण किंवा गुगल मॅप्स लोकेशन लिंक WhatsApp वर रिप्लाय करा, जेणेकरून गाडी थेट विनाअडथळा पोहोचू शकेल.\n- E-Buildcon Enterprises, Vasai (9819927174)`
    },
    {
      id: 'delivered',
      label: '🎉 साहित्य पोहोचले - पोच पावती',
      message: `✅ साहित्य पोहोचले आहे! (E-Buildcon Enterprises)\nग्राहक: ${order.name}\n📦 ऑर्डर: ${order.tot}\n📍 साईट: ${order.site}\nतुमचे साहित्य साईटवर यशस्वीरित्या पोहोचले आहे. कृपया माल तपासून ड्रायव्हरकडे पावती सही करावी. सहकार्याबद्दल धन्यवाद!\n- E-Buildcon Enterprises, Vasai\nईमेल: ${COMPANY_INFO.email}`
    }
  ];
}

export function generateCustomerReplyWhatsAppUrl(targetNumber: string, message: string): string {
  const num = cleanPhoneNumber(targetNumber);
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export function generateCustomerReplySmsUrl(targetNumber: string, message: string): string {
  const clean = targetNumber.replace(/\D/g, '');
  return `sms:+91${clean}?body=${encodeURIComponent(message)}`;
}
