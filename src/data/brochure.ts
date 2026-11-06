import { BrochurePage, Language } from '../types';

export function getLocalizedBrochure(lang: Language): BrochurePage[] {
  if (lang === 'en') {
    return [
      {
        pageNumber: 1,
        title: 'Page 1: Company Profile & Certifications',
        description: 'E BUILDCON ENTERPRISES - ISO 9001:2015 Certified Company',
        images: [{ src: '/brochure/page1_img0.jpg', caption: 'Cover Page & Company Profile', alt: 'E BUILDCON Company Cover and Profile' }]
      },
      {
        pageNumber: 2,
        title: 'Page 2: AAC Blocks Specifications',
        description: 'Autoclaved Aerated Concrete blocks technical specifications and advantages',
        images: [{ src: '/brochure/page2_img0.jpg', caption: 'AAC Block Features & Comparison', alt: 'AAC Blocks Features and Comparison' }]
      },
      {
        pageNumber: 3,
        title: 'Page 3: Block Sizes & Dimensions',
        description: 'AAC block dimensions and CBM measurement breakdown',
        images: [{ src: '/brochure/page3_img0.jpg', caption: 'AAC Block Sizes & CBM Chart', alt: 'AAC Block Sizes and CBM Chart' }]
      },
      {
        pageNumber: 4,
        title: 'Page 4: ReadyMix Plaster Technical Data',
        description: '40kg Bag - 125 sq ft coverage, Crack-Free & Waterproof',
        images: [{ src: '/brochure/page4_img0.jpg', caption: 'ReadyMix Plaster 40kg', alt: 'ReadyMix Plaster Specifications' }]
      },
      {
        pageNumber: 5,
        title: 'Page 5: Block Mortar (Jointing Adhesive)',
        description: '40kg Bag - 80 blocks coverage, ultra-strong thin-joint bonding',
        images: [{ src: '/brochure/page5_img0.jpg', caption: 'Block Jointing Mortar 40kg', alt: 'Block Mortar Specifications' }]
      },
      {
        pageNumber: 6,
        title: 'Page 6: Tile Adhesive Range',
        description: '20kg & 40kg Bags - Floor and wall applications with high bonding strength',
        images: [{ src: '/brochure/page6_img0.jpg', caption: 'Tile Adhesive 20kg & 40kg', alt: 'Tile Adhesive Specifications' }]
      },
      {
        pageNumber: 7,
        title: 'Page 7: Quality Standards & Lab Testing',
        description: 'Stringent laboratory testing and compliance with international construction standards',
        images: [{ src: '/brochure/page7_img0.jpg', caption: 'Quality Assurance & Testing', alt: 'Quality Standards and Testing' }]
      },
      {
        pageNumber: 8,
        title: 'Page 8: Construction Benefits & Savings',
        description: 'Substantial structural weight reduction, speed, and cost savings vs red clay bricks',
        images: [{ src: '/brochure/page8_img0.jpg', caption: 'Structural Savings & Benefits', alt: 'Construction Savings and Benefits' }]
      },
      {
        pageNumber: 9,
        title: 'Page 9: Application & Workmanship Guide',
        description: 'Best practice masonry instructions for laying blocks and applying plaster',
        images: [{ src: '/brochure/page9_img0.jpg', caption: 'Application Methods & Workmanship', alt: 'Application and Usage Guide' }]
      },
      {
        pageNumber: 10,
        title: 'Page 10: Product Range & Certified Badges',
        description: 'All 12 product icons and international technical certifications',
        images: [
          { src: '/brochure/page10_img0.jpg', caption: 'Product Overview', alt: 'Product Range' },
          { src: '/brochure/page10_img1.jpg', caption: 'ReadyMix Plaster Bag', alt: 'ReadyMix Plaster Icon' },
          { src: '/brochure/page10_img2.jpg', caption: 'Block Mortar Bag', alt: 'Block Mortar Icon' },
          { src: '/brochure/page10_img3.jpg', caption: 'Tile Adhesive Bag', alt: 'Tile Adhesive Icon' },
          { src: '/brochure/page10_img4.jpg', caption: 'Eco-Friendly Badge', alt: 'Eco Friendly Badge' },
          { src: '/brochure/page10_img5.jpg', caption: 'Thermal Insulation', alt: 'Thermal Insulation Icon' },
          { src: '/brochure/page10_img6.jpg', caption: 'Fire Resistant', alt: 'Fire Resistant Icon' },
          { src: '/brochure/page10_img7.jpg', caption: 'High Strength', alt: 'High Strength Icon' },
          { src: '/brochure/page10_img8.jpg', caption: 'Water Resistant', alt: 'Water Resistant Icon' },
          { src: '/brochure/page10_img9.jpg', caption: 'Lightweight Design', alt: 'Lightweight Design Icon' },
          { src: '/brochure/page10_img10.jpg', caption: 'ISO 9001:2015 Logo', alt: 'ISO 9001:2015 Certified Logo' },
          { src: '/brochure/page10_img11.jpg', caption: 'Certified Quality Stamp', alt: 'Quality Assurance Stamp' }
        ]
      },
      {
        pageNumber: 11,
        title: 'Page 11: Logistics & Delivery Fleet',
        description: 'Company-owned fleet - from Tempo 1.5 Ton to 22 Ton Heavy Truck',
        images: [{ src: '/brochure/page11_img0.jpg', caption: 'Delivery Network & Fleet', alt: 'Delivery Logistics and Fleet' }]
      },
      {
        pageNumber: 12,
        title: 'Page 12: Contact Details & Factory Location',
        description: 'Younus Estate, Khandipada Road, Kaman, Vasai (East) - 401202',
        images: [{ src: '/brochure/page12_img0.jpg', caption: 'Contact Details & Factory Map', alt: 'Contact and Factory Address' }]
      }
    ];
  }

  if (lang === 'hi') {
    return [
      {
        pageNumber: 1,
        title: 'पृष्ठ 1: कंपनी परिचय और प्रमाणपत्र',
        description: 'E BUILDCON ENTERPRISES - ISO 9001:2015 प्रमाणित कंपनी',
        images: [{ src: '/brochure/page1_img0.jpg', caption: 'कवर पेज व कंपनी प्रोफाइल', alt: 'E BUILDCON Company Cover and Profile' }]
      },
      {
        pageNumber: 2,
        title: 'पृष्ठ 2: AAC Blocks विशेषताएं व लाभ',
        description: 'ऑटोक्लेव्ड एरेटेड कंक्रीट ब्लॉक्स तकनीकी विवरण और फायदे',
        images: [{ src: '/brochure/page2_img0.jpg', caption: 'AAC ब्लॉक्स विशेषताएं व तुलना', alt: 'AAC Blocks Features and Comparison' }]
      },
      {
        pageNumber: 3,
        title: 'पृष्ठ 3: ब्लॉक साइज व CBM गणना चार्ट',
        description: 'AAC ब्लॉक साइज और CBM माप विवरण',
        images: [{ src: '/brochure/page3_img0.jpg', caption: 'AAC ब्लॉक साइज व CBM चार्ट', alt: 'AAC Block Sizes and CBM Chart' }]
      },
      {
        pageNumber: 4,
        title: 'पृष्ठ 4: ReadyMix Plaster तकनीकी विवरण',
        description: '40 किलो बैग - 125 वर्ग फुट कवरेज, क्रैक-फ्री और वाटरप्रूफ',
        images: [{ src: '/brochure/page4_img0.jpg', caption: 'ReadyMix Plaster 40kg', alt: 'ReadyMix Plaster Specifications' }]
      },
      {
        pageNumber: 5,
        title: 'पृष्ठ 5: Block Mortar (ज्वाइंटिंग केमिकल)',
        description: '40 किलो बैग - 80 ब्लॉक्स कवरेज, अत्यंत मजबूत जोड़',
        images: [{ src: '/brochure/page5_img0.jpg', caption: 'Block Jointing Mortar 40kg', alt: 'Block Mortar Specifications' }]
      },
      {
        pageNumber: 6,
        title: 'पृष्ठ 6: Tile Adhesive उत्पाद',
        description: '20 किलो व 40 किलो बैग - फर्श और दीवार के लिए मजबूत पकड़',
        images: [{ src: '/brochure/page6_img0.jpg', caption: 'Tile Adhesive 20kg & 40kg', alt: 'Tile Adhesive Specifications' }]
      },
      {
        pageNumber: 7,
        title: 'पृष्ठ 7: गुणवत्ता मानक और लैब टेस्टिंग',
        description: 'सख्त गुणवत्ता निरीक्षण और अंतर्राष्ट्रीय मानकों के अनुरूप निर्माण',
        images: [{ src: '/brochure/page7_img0.jpg', caption: 'गुणवत्ता नियंत्रण और परीक्षण', alt: 'Quality Standards and Testing' }]
      },
      {
        pageNumber: 8,
        title: 'पृष्ठ 8: निर्माण बचत और फायदे',
        description: 'पारंपरिक लाल ईंटों की तुलना में वजन, समय और लागत की भारी बचत',
        images: [{ src: '/brochure/page8_img0.jpg', caption: 'निर्माण बचत और लाभ', alt: 'Construction Savings and Benefits' }]
      },
      {
        pageNumber: 9,
        title: 'पृष्ठ 9: उपयोग विधि और अनुप्रयोग मार्गदर्शिका',
        description: 'ब्लॉक्स और प्लास्टर के उचित उपयोग के तकनीकी निर्देश',
        images: [{ src: '/brochure/page9_img0.jpg', caption: 'उपयोग विधि और तकनीकी सूचना', alt: 'Application and Usage Guide' }]
      },
      {
        pageNumber: 10,
        title: 'पृष्ठ 10: उत्पाद श्रेणी और प्रमाणन प्रतीक',
        description: 'सभी 12 उत्पाद आइकन्स और अंतर्राष्ट्रीय तकनीकी प्रमाणन',
        images: [
          { src: '/brochure/page10_img0.jpg', caption: 'उत्पाद अवलोकन', alt: 'Product Range' },
          { src: '/brochure/page10_img1.jpg', caption: 'ReadyMix Plaster Bag', alt: 'ReadyMix Plaster Icon' },
          { src: '/brochure/page10_img2.jpg', caption: 'Block Mortar Bag', alt: 'Block Mortar Icon' },
          { src: '/brochure/page10_img3.jpg', caption: 'Tile Adhesive Bag', alt: 'Tile Adhesive Icon' },
          { src: '/brochure/page10_img4.jpg', caption: 'Eco-Friendly Badge', alt: 'Eco Friendly Badge' },
          { src: '/brochure/page10_img5.jpg', caption: 'Thermal Insulation', alt: 'Thermal Insulation Icon' },
          { src: '/brochure/page10_img6.jpg', caption: 'Fire Resistant', alt: 'Fire Resistant Icon' },
          { src: '/brochure/page10_img7.jpg', caption: 'High Strength', alt: 'High Strength Icon' },
          { src: '/brochure/page10_img8.jpg', caption: 'Water Resistant', alt: 'Water Resistant Icon' },
          { src: '/brochure/page10_img9.jpg', caption: 'Lightweight Design', alt: 'Lightweight Design Icon' },
          { src: '/brochure/page10_img10.jpg', caption: 'ISO 9001:2015 Logo', alt: 'ISO 9001:2015 Certified Logo' },
          { src: '/brochure/page10_img11.jpg', caption: 'Certified Quality Stamp', alt: 'Quality Assurance Stamp' }
        ]
      },
      {
        pageNumber: 11,
        title: 'पृष्ठ 11: लॉजिस्टिक्स और वाहन बेड़ा',
        description: 'अपनी गाड़ियां - टेम्पो 1.5 टन से 22 टन हेवी ट्रक',
        images: [{ src: '/brochure/page11_img0.jpg', caption: 'डिलिवरी नेटवर्क व फ्लीट', alt: 'Delivery Logistics and Fleet' }]
      },
      {
        pageNumber: 12,
        title: 'पृष्ठ 12: संपर्क और कारखाना पता',
        description: 'यूनुस एस्टेट, खंडीपाड़ा रोड, कामण, वसई (पूर्व) - 401202',
        images: [{ src: '/brochure/page12_img0.jpg', caption: 'संपर्क विवरण और कारखाना नक्शा', alt: 'Contact and Factory Address' }]
      }
    ];
  }

  // Default: Marathi
  return [
    {
      pageNumber: 1,
      title: 'पृष्ठ १: कंपनी परिचय व प्रमाणपत्रे',
      description: 'E BUILDCON ENTERPRISES - ISO 9001:2015 प्रमाणित कंपनी',
      images: [{ src: '/brochure/page1_img0.jpg', caption: 'कव्हर पेज व कंपनी प्रोफाइल', alt: 'E BUILDCON Company Cover and Profile' }]
    },
    {
      pageNumber: 2,
      title: 'पृष्ठ २: AAC Blocks वैशिष्ट्ये',
      description: 'ऑटोक्लेव्हड एरेटेड काँक्रीट ब्लॉक्स तांत्रिक माहिती व फायदे',
      images: [{ src: '/brochure/page2_img0.jpg', caption: 'AAC ब्लॉक्स वैशिष्ट्ये व तुलना', alt: 'AAC Blocks Features and Comparison' }]
    },
    {
      pageNumber: 3,
      title: 'पृष्ठ ३: ब्लॉक साईज व मोजमाप',
      description: 'AAC ब्लॉक साईज आणि CBM मोजणी तपशील',
      images: [{ src: '/brochure/page3_img0.jpg', caption: 'AAC ब्लॉक साईज व CBM चार्ट', alt: 'AAC Block Sizes and CBM Chart' }]
    },
    {
      pageNumber: 4,
      title: 'पृष्ठ ४: ReadyMix Plaster माहिती',
      description: '४० किलो बॅग - कव्हरेज १२५ चौरस फूट, क्रॅक-फ्री व वॉटरप्रूफ',
      images: [{ src: '/brochure/page4_img0.jpg', caption: 'ReadyMix Plaster 40kg', alt: 'ReadyMix Plaster Specifications' }]
    },
    {
      pageNumber: 5,
      title: 'पृष्ठ ५: Block Mortar (जॉइंटिंग केमिकल)',
      description: '४० किलो बॅग - ८० ब्लॉक्स कव्हरेज, मजबूत सांधे',
      images: [{ src: '/brochure/page5_img0.jpg', caption: 'Block Jointing Mortar 40kg', alt: 'Block Mortar Specifications' }]
    },
    {
      pageNumber: 6,
      title: 'पृष्ठ ६: Tile Adhesive उत्पादने',
      description: '२० किलो व ४० किलो बॅग - जमीन व भिंतींसाठी मजबूत पकड',
      images: [{ src: '/brochure/page6_img0.jpg', caption: 'Tile Adhesive 20kg & 40kg', alt: 'Tile Adhesive Specifications' }]
    },
    {
      pageNumber: 7,
      title: 'पृष्ठ ७: गुणवत्ता मानके व लॅब टेस्टिंग',
      description: 'कठोर गुणवत्ता तपासणी व आंतरराष्ट्रीय मानकांनुसार उत्पादन',
      images: [{ src: '/brochure/page7_img0.jpg', caption: 'गुणवत्ता नियंत्रण व चाचणी', alt: 'Quality Standards and Testing' }]
    },
    {
      pageNumber: 8,
      title: 'पृष्ठ ८: बांधकाम फायदे व बचत',
      description: 'पारंपारिक विटांच्या तुलनेत खर्च, वेळ आणि वजनाची बचत',
      images: [{ src: '/brochure/page8_img0.jpg', caption: 'बांधकाम बचत व फायदे', alt: 'Construction Savings and Benefits' }]
    },
    {
      pageNumber: 9,
      title: 'पृष्ठ ९: ॲप्लिकेशन व वापर मार्गदर्शक',
      description: 'ब्लॉक्स आणि प्लास्टर वापरण्याच्या योग्य पद्धती',
      images: [{ src: '/brochure/page9_img0.jpg', caption: 'वापर पद्धती व तांत्रिक सूचना', alt: 'Application and Usage Guide' }]
    },
    {
      pageNumber: 10,
      title: 'पृष्ठ १०: उत्पादन श्रेणी व सर्टिफिकेशन आयकॉन्स',
      description: 'सर्व १२ उत्पादन आयकॉन्स व तांत्रिक प्रमाणीकरणे',
      images: [
        { src: '/brochure/page10_img0.jpg', caption: 'उत्पादन विहंगावलोकन', alt: 'Product Range' },
        { src: '/brochure/page10_img1.jpg', caption: 'ReadyMix Plaster Bag', alt: 'ReadyMix Plaster Icon' },
        { src: '/brochure/page10_img2.jpg', caption: 'Block Mortar Bag', alt: 'Block Mortar Icon' },
        { src: '/brochure/page10_img3.jpg', caption: 'Tile Adhesive Bag', alt: 'Tile Adhesive Icon' },
        { src: '/brochure/page10_img4.jpg', caption: 'Eco-Friendly Badge', alt: 'Eco Friendly Badge' },
        { src: '/brochure/page10_img5.jpg', caption: 'Thermal Insulation', alt: 'Thermal Insulation Icon' },
        { src: '/brochure/page10_img6.jpg', caption: 'Fire Resistant', alt: 'Fire Resistant Icon' },
        { src: '/brochure/page10_img7.jpg', caption: 'High Strength', alt: 'High Strength Icon' },
        { src: '/brochure/page10_img8.jpg', caption: 'Water Resistant', alt: 'Water Resistant Icon' },
        { src: '/brochure/page10_img9.jpg', caption: 'Lightweight Design', alt: 'Lightweight Design Icon' },
        { src: '/brochure/page10_img10.jpg', caption: 'ISO 9001:2015 Logo', alt: 'ISO 9001:2015 Certified Logo' },
        { src: '/brochure/page10_img11.jpg', caption: 'Certified Quality Stamp', alt: 'Quality Assurance Stamp' }
      ]
    },
    {
      pageNumber: 11,
      title: 'पृष्ठ ११: लॉजिस्टिक्स व वाहतूक फ्लीट',
      description: 'आमच्या मालकीच्या गाड्या - टेम्पो ते २२ टन हेवी ट्रक',
      images: [{ src: '/brochure/page11_img0.jpg', caption: 'डिलिव्हरी नेटवर्क व फ्लीट', alt: 'Delivery Logistics and Fleet' }]
    },
    {
      pageNumber: 12,
      title: 'पृष्ठ १२: संपर्क व कारखाना पत्ता',
      description: 'युनुस इस्टेट, खंडीपाडा रोड, कामण, वसई (पूर्व) - ४०१२०२',
      images: [{ src: '/brochure/page12_img0.jpg', caption: 'संपर्क तपशील व नकाशा', alt: 'Contact and Factory Address' }]
    }
  ];
}

export const BROCHURE_PAGES = getLocalizedBrochure('mr');
