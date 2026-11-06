import { BlockSizeInfo, ProductInfo, Language } from '../types';

export const CBM_MAP: Record<string, number> = {
  '2"': 166,
  '3"': 111,
  '4"': 83,
  '5"': 66,
  '6"': 55,
  '8"': 41,
  '9"': 37
};

export const AAC_BLOCK_SIZES: BlockSizeInfo[] = [
  { inch: '2"', inchNum: 2, mm: '600 x 200 x 50', perCbm: 166, description: 'Lightweight partition wall & lining' },
  { inch: '3"', inchNum: 3, mm: '600 x 200 x 75', perCbm: 111, description: 'Internal non-load bearing partitions' },
  { inch: '4"', inchNum: 4, mm: '600 x 200 x 100', perCbm: 83, description: 'Standard partition walls & duct shafts' },
  { inch: '5"', inchNum: 5, mm: '600 x 200 x 125', perCbm: 66, description: 'Intermediate interior masonry' },
  { inch: '6"', inchNum: 6, mm: '600 x 200 x 150', perCbm: 55, description: 'Most popular external & internal walls' },
  { inch: '8"', inchNum: 8, mm: '600 x 200 x 200', perCbm: 41, description: 'Heavy external boundary & structural perimeter' },
  { inch: '9"', inchNum: 9, mm: '600 x 200 x 225', perCbm: 37, description: 'Heavy-duty exterior wall insulation' }
];

export function getLocalizedProducts(lang: Language): ProductInfo[] {
  if (lang === 'en') {
    return [
      {
        id: 'block',
        name: 'AAC Blocks (Autoclaved Aerated Concrete)',
        category: 'Masonry Blocks',
        packageSize: '2" - 9" (Standard Sizes)',
        coverage: 'Measured in Pcs / CBM',
        features: [
          'Standard Sizes Available (2" to 9")',
          'Precise Dimensions (600mm x 200mm)',
          'Lightweight & High Compressive Strength',
          'Chemical not auto-included - add Block Mortar separately'
        ],
        description: 'Certified top-grade lightweight, fire-resistant, and thermally insulating AAC blocks from 2 inch to 9 inch.',
        badge: 'ISO Certified',
        image: '/brochure/page2_img0.jpg',
        infoNote: 'No price online - information and order enquiry only'
      },
      {
        id: 'plaster',
        name: 'ReadyMix Plaster',
        category: 'Ready-mix Mortars',
        packageSize: '40kg Bag',
        coverage: '125 sq ft / Bag',
        features: [
          'Crack Free (Zero shrinkage cracks)',
          'Waterproof formulation',
          'Ready to Use (Just mix water)',
          'High quality smooth finish and strong grip'
        ],
        description: 'Polymer-enriched pre-mixed plaster of exceptional quality. Simply add water and apply immediately. Prevents hairline cracks completely.',
        badge: 'Crack Free',
        image: '/brochure/page4_img0.jpg',
        infoNote: 'No price online - informational only'
      },
      {
        id: 'mortar',
        name: 'Block Mortar / Jointing Mortar',
        category: 'Jointing Chemicals',
        packageSize: '40kg Bag',
        coverage: '80 Blocks (6") / Bag',
        features: [
          'Strong Joint (High tensile adhesion)',
          'High Bonding Strength',
          'No Water Curing Required',
          'Optional - Add separately as needed'
        ],
        description: 'Special polymer thin-joint mortar engineered specifically for laying AAC blocks. Much faster construction and tighter joints than sand-cement.',
        badge: 'High Bonding',
        image: '/brochure/page5_img0.jpg',
        infoNote: 'No price online - informational only'
      },
      {
        id: 'adhesive',
        name: 'Tile Adhesive',
        category: 'Tile Fixing Solutions',
        packageSize: '20kg & 40kg Bag',
        coverage: 'Floor & Wall (High Strength)',
        features: [
          'Floor & Wall - High Strength',
          'No Shrinkage (Zero de-bonding)',
          'Long Life Durability',
          'Suitable for ceramic, vitrified and stone tiles'
        ],
        description: 'Premium polymer tile adhesive for durable and high-strength installation of tiles on floors and walls with zero hollow spaces.',
        badge: 'High Strength',
        image: '/brochure/page6_img0.jpg',
        infoNote: 'No price online - informational only'
      }
    ];
  }

  if (lang === 'hi') {
    return [
      {
        id: 'block',
        name: 'AAC Blocks (ऑटोक्लेव्ड एरेटेड कंक्रीट)',
        category: 'चिनाई ब्लॉक्स',
        packageSize: '2" से 9" (मानक साइज)',
        coverage: 'नग / CBM आधारित माप',
        features: [
          'मानक Sizes उपलब्ध (2" से 9")',
          'सटीक आकार (600mm x 200mm)',
          'हल्का वजन और उच्च मजबूती',
          'केमिकल स्वतः शामिल नहीं - मॉर्टर अलग से जोड़ें'
        ],
        description: 'उच्च गुणवत्ता वाले हल्के, अग्निरोधक और ऊष्मा-रोधी AAC ब्लॉक्स। 2 इंच से 9 इंच तक उपलब्ध।',
        badge: 'ISO प्रमाणित',
        image: '/brochure/page2_img0.jpg',
        infoNote: 'कोई कीमत नहीं - सिर्फ जानकारी व कोटेशन'
      },
      {
        id: 'plaster',
        name: 'ReadyMix Plaster',
        category: 'रेडी-मिक्स मॉर्टर',
        packageSize: '40kg Bag',
        coverage: '125 वर्ग फुट / बैग',
        features: [
          'क्रैक-फ्री (दरार मुक्त)',
          'वाटरप्रूफ (जलरोधी गुण)',
          'रेडी टू यूज़ (उपयोग में बेहद आसान)',
          'उत्कृष्ट फिनिशिंग व मजबूत पकड़'
        ],
        description: 'पॉलिमर-युक्त उच्च गुणवत्ता वाला रेडीमिक्स प्लास्टर। बस पानी मिलाएं और तुरंत इस्तेमाल करें। प्लास्टर में दरारें आने से रोकता है।',
        badge: 'क्रैक-फ्री',
        image: '/brochure/page4_img0.jpg',
        infoNote: 'कोई कीमत नहीं - सिर्फ जानकारी'
      },
      {
        id: 'mortar',
        name: 'Block Mortar / Jointing Mortar',
        category: 'ज्वाइंटिंग केमिकल',
        packageSize: '40kg Bag',
        coverage: '80 ब्लॉक्स (6") / बैग',
        features: [
          'मजबूत जोड़ (Strong Joint)',
          'उच्च बॉन्डिंग सामर्थ्य (High Bonding)',
          'पानी की तराई की आवश्यकता नहीं',
          'वैकल्पिक - आवश्यकतानुसार अलग से जोड़ें'
        ],
        description: 'AAC ब्लॉक्स जोड़ने के लिए विशेष पॉलीमर मॉर्टर। सामान्य सीमेंट-रेत की तुलना में तीव्र निर्माण और मजबूत पकड़।',
        badge: 'उच्च बॉन्डिंग',
        image: '/brochure/page5_img0.jpg',
        infoNote: 'कोई कीमत नहीं - सिर्फ जानकारी'
      },
      {
        id: 'adhesive',
        name: 'Tile Adhesive',
        category: 'टाइल फिक्सिंग समाधान',
        packageSize: '20kg व 40kg Bag',
        coverage: 'फर्श और दीवार (Floor & Wall)',
        features: [
          'फर्श और दीवार - उच्च शक्ति',
          'सिकुड़न नहीं (No Shrinkage)',
          'दीर्घकालिक टिकाऊपन (Long Life)',
          'सभी प्रकार की टाइल्स के लिए उपयुक्त'
        ],
        description: 'टाइल्स को फर्श और दीवारों पर मजबूती से लगाने के लिए प्रीमियम पॉलीमर टाइल एडहेसिव। लंबे समय तक मजबूत पकड़ बनाए रखता है।',
        badge: 'उच्च शक्ति',
        image: '/brochure/page6_img0.jpg',
        infoNote: 'कोई कीमत नहीं - सिर्फ जानकारी'
      }
    ];
  }

  // Default: Marathi
  return [
    {
      id: 'block',
      name: 'AAC Blocks (Autoclaved Aerated Concrete)',
      category: 'Masonry Blocks',
      packageSize: '2" ते 9" (प्रमाणित साईज)',
      coverage: 'नग / CBM आधारित मोजमाप',
      features: [
        'प्रमाणित Sizes उपलब्ध (2" ते 9")',
        'अचूक आकार (600mm x 200mm)',
        'हलके वजन व उच्च सामर्थ्य',
        'केमिकल Auto नाही - स्वतंत्र Block Mortar आवश्यक असल्यास जोडा'
      ],
      description: 'उच्च दर्जाचे हलके, आग-प्रतिरोधक आणि उष्णता-रोधक AAC ब्लॉक्स. 2 इंच पासून 9 इंच पर्यंत उपलब्ध.',
      badge: 'ISO प्रमाणित',
      image: '/brochure/page2_img0.jpg',
      infoNote: 'पैसे नाहीत - फक्त माहिती व ऑर्डर विनंती'
    },
    {
      id: 'plaster',
      name: 'ReadyMix Plaster',
      category: 'Ready-mix Mortars',
      packageSize: '40kg Bag',
      coverage: '125 sq ft / Bag',
      features: [
        'Crack Free (तडे जात नाहीत)',
        'Waterproof (जलरोधक)',
        'Ready to Use (वापरण्यास सोपे)',
        'उच्च फिनिशिंग व मजबूत पकड'
      ],
      description: 'पॉलिमर-युक्त दर्जेदार रेडीमिक्स प्लास्टर. फक्त पाणी मिसळा आणि त्वरित वापरा. तडे जाणे पूर्णपणे थांबवते.',
      badge: 'Crack Free',
      image: '/brochure/page4_img0.jpg',
      infoNote: 'पैसे नाहीत - फक्त माहिती'
    },
    {
      id: 'mortar',
      name: 'Block Mortar / Jointing Mortar',
      category: 'Jointing Chemicals',
      packageSize: '40kg Bag',
      coverage: '80 Blocks (6") / Bag',
      features: [
        'Strong Joint (अतिशय मजबूत जोडणी)',
        'High Bonding Strength (उच्च बाँडिंग सामर्थ्य)',
        'पाण्याची क्युरिंगची आवश्यकता नाही',
        'Optional - आवश्यकतेनुसार स्वतंत्रपणे ॲड करा'
      ],
      description: 'AAC ब्लॉक्स जोडण्यासाठी विशेष पातळ सांधे (Thin Joint) मॉर्टर. मजबूत पकड आणि सिमेंट-वाळूच्या तुलनेत अधिक वेगवान बांधकाम.',
      badge: 'High Bonding',
      image: '/brochure/page5_img0.jpg',
      infoNote: 'पैसे नाहीत - फक्त माहिती'
    },
    {
      id: 'adhesive',
      name: 'Tile Adhesive',
      category: 'Tile Fixing Solutions',
      packageSize: '20kg व 40kg Bag',
      coverage: 'Floor & Wall (फरशी व भिंतीसाठी)',
      features: [
        'Floor & Wall - High Strength',
        'No Shrinkage (आकुंचन पावत नाही)',
        'Long Life (दीर्घायुष्य)',
        'सर्व प्रकारच्या फरशांसाठी योग्य'
      ],
      description: 'फरशी आणि टाईल्स मजबूत बसवण्यासाठी प्रिमियम पॉलिमर टाईल अडेसिव्ह. भिंत आणि जमिनीवरील टाईल्ससाठी दीर्घायुषी व मजबूत जोड.',
      badge: 'High Strength',
      image: '/brochure/page6_img0.jpg',
      infoNote: 'पैसे नाहीत - फक्त माहिती'
    }
  ];
}

export const PRODUCTS = getLocalizedProducts('mr');
