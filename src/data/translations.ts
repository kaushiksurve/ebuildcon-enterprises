import { Language } from '../types';

export interface WhyPoint {
  title: string;
  desc: string;
  badge: string;
}

export interface TranslationDictionary {
  // Navigation & Tabs
  tab_brochure: string;
  tab_order: string;
  tab_myorders: string;
  tab_company: string;
  
  // Header & Brand
  tagline: string;
  badge_no_personal_email: string;
  badge_no_price: string;
  badge_safe_wa: string;
  select_lang_label: string;
  
  // Auth & Sign In
  auth_login_title: string;
  auth_login_subtitle: string;
  auth_signup_title: string;
  auth_signup_subtitle: string;
  auth_tab_login: string;
  auth_tab_signup: string;
  auth_phone_label: string;
  auth_phone_placeholder: string;
  auth_name_label: string;
  auth_name_placeholder: string;
  auth_pin_label: string;
  auth_pin_placeholder: string;
  auth_remember_me: string;
  auth_login_btn: string;
  auth_signup_btn: string;
  auth_demo_login_btn: string;
  auth_no_account: string;
  auth_has_account: string;
  auth_logout_btn: string;
  auth_logout_confirm: string;
  auth_welcome_back: string;
  auth_stored_info_note: string;
  auth_err_phone_req: string;
  auth_err_pin_req: string;
  auth_err_name_req: string;
  auth_err_invalid: string;
  auth_profile_title: string;
  auth_default_site_title: string;
  auth_update_profile_btn: string;
  auth_profile_updated: string;
  auth_confirm_pin_label: string;
  auth_confirm_pin_placeholder: string;
  auth_err_pin_mismatch: string;
  auth_err_user_not_found: string;
  auth_err_incorrect_pin: string;
  auth_forgot_pin_help: string;
  auth_terms_agreement: string;
  auth_terms_required: string;
  
  // Hero Section
  hero_title: string;
  hero_subtitle: string;
  hero_cta_order: string;
  hero_cta_products: string;
  hero_cta_brochure: string;
  quick_wa_quote: string;
  hero_badge_kaman: string;
  hero_feat_sizes: string;
  hero_feat_fleet: string;
  hero_feat_plaster: string;
  hero_direct_inquiry: string;
  hero_card_desc: string;
  hero_official_email: string;
  hero_direct_phone: string;
  
  // Why Choose Us
  why_choose_tag: string;
  why_choose_title: string;
  why_points: WhyPoint[];
  
  // Products Section
  prod_title: string;
  prod_subtitle: string;
  no_price_badge: string;
  view_details: string;
  add_to_order_action: string;
  coverage_label: string;
  modal_packing_size: string;
  modal_coverage: string;
  modal_key_features: string;
  modal_add_to_order: string;
  modal_close: string;
  
  // AAC Block Chart & Calculator
  size_title: string;
  size_subtitle: string;
  calc_title: string;
  calc_subtitle: string;
  calc_accurate_badge: string;
  calc_label_size: string;
  calc_label_qty: string;
  calc_res_cbm: string;
  calc_res_rec_vehicle: string;
  calc_add_to_cart: string;
  calc_selected_size: string;
  calc_pcs_unit: string;
  calc_inch_unit: string;
  calc_action_select: string;
  calc_rec_vehicle_label: string;
  calc_7_inch_badge: string;
  calc_action_col: string;
  weight_col_note: string;
  pcs_per_cbm: string;
  
  // Vehicles
  vehicle_title: string;
  vehicle_subtitle: string;
  vehicle_owned_badge: string;
  vehicle_capacity_label: string;
  vehicle_fleet_footer: string;
  
  // Brochure Viewer
  brochure_header_title: string;
  brochure_header_sub: string;
  brochure_tab_book: string;
  brochure_tab_gallery: string;
  brochure_download_btn: string;
  brochure_prev_btn: string;
  brochure_next_btn: string;
  brochure_page_label: string;
  brochure_all_photos_note: string;
  brochure_total_photos: string;
  
  // Order System
  order_title: string;
  order_subtitle: string;
  order_sec_customer: string;
  order_sec_delivery: string;
  shop_label: string;
  shop_placeholder: string;
  sup_name_label: string;
  sup_name_placeholder: string;
  sup_phone_label: string;
  sup_phone_placeholder: string;
  phone_label: string;
  phone_placeholder: string;
  site_label: string;
  site_placeholder: string;
  del_loc_label: string;
  del_loc_placeholder: string;
  maps_link_label: string;
  maps_link_placeholder: string;
  loc_option_title: string;
  loc_opt_manual_title: string;
  loc_opt_manual_desc: string;
  loc_opt_gps_title: string;
  loc_opt_gps_desc: string;
  loc_manual_tip: string;
  loc_gps_detected_place: string;
  loc_gps_refetch_btn: string;
  loc_gps_status_idle: string;
  gps_fetching_place: string;
  gps_not_supported: string;
  share_gps_btn: string;
  gps_fetching: string;
  gps_success: string;
  gps_denied: string;
  gps_off: string;
  gps_timeout: string;
  order_view_on_maps: string;
  date_label: string;
  date_placeholder: string;
  order_date_note: string;
  
  // Order Items
  item_add_title: string;
  add_item_btn: string;
  place_order_btn: string;
  calc_info_block: string;
  calc_info_plaster: string;
  calc_info_mortar: string;
  calc_info_adhesive: string;
  total_label: string;
  no_item: string;
  block_opt: string;
  plaster_opt: string;
  mortar_opt: string;
  adhesive_opt: string;
  order_items_col_separate: string;
  order_location_optional_note: string;
  
  // WhatsApp Notification
  wa_order_success_title: string;
  wa_order_success_desc: string;
  order_summary_customer: string;
  order_summary_supervisor: string;
  order_summary_material: string;
  order_summary_req_date: string;
  order_summary_site: string;
  order_wa_send_prefix: string;
  close_view_my_orders: string;
  
  // My Orders
  myorders_title: string;
  myorders_subtitle: string;
  myorders_count_label: string;
  myorders_clear_all: string;
  myorders_new_order_btn: string;
  myorders_filter_status: string;
  myorders_status_pending: string;
  myorders_status_confirmed: string;
  myorders_status_dispatched: string;
  myorders_status_delivered: string;
  myorders_req_date_label: string;
  myorders_site_label: string;
  myorders_del_loc_label: string;
  myorders_view_maps: string;
  myorders_items_breakdown: string;
  myorders_resend_wa_btn: string;
  myorders_close_btn: string;
  myorders_no_result: string;
  no_orders_yet: string;
  search_orders_placeholder: string;
  
  // Company Panel
  company_title: string;
  company_login_title: string;
  company_login_sub: string;
  comp_mode_demo: string;
  comp_mode_prod: string;
  comp_demo_hint: string;
  comp_prod_hint: string;
  comp_verify_secure: string;
  comp_auth_system: string;
  comp_auth_demo_desc: string;
  comp_auth_prod_desc: string;
  comp_verified_session: string;
  comp_logout: string;
  comp_site_addr: string;
  comp_del_loc: string;
  comp_del_date: string;
  comp_open_maps: string;
  otp_placeholder: string;
  verify_otp_btn: string;
  enable_noti_btn: string;
  no_company_orders: string;
  btn_change_date: string;
  btn_change_del: string;
  btn_confirm_wa: string;
  btn_dispatch: string;
  btn_delivered: string;
  comp_auth_gate_title: string;
  comp_auth_gate_desc: string;
  comp_auth_allowed_ids_label: string;
  comp_auth_id_input_label: string;
  comp_auth_id_placeholder: string;
  comp_auth_pin_label: string;
  comp_auth_err_unauthorized: string;
  comp_auth_quick_select: string;
  comp_auth_detected_badge: string;
  comp_orders_all_title: string;
  comp_orders_all_sub: string;
  comp_search_orders: string;
  comp_filter_all: string;
  comp_filter_pending: string;
  comp_filter_confirmed: string;
  comp_filter_dispatched: string;
  comp_filter_delivered: string;
  comp_stat_total_orders: string;
  comp_stat_total_cbm: string;
  comp_btn_reply_customer: string;
  comp_reply_modal_title: string;
  comp_reply_call_party: string;
  comp_reply_call_sup: string;
  comp_reply_templates_label: string;
  comp_reply_custom_label: string;
  comp_reply_send_wa_party: string;
  comp_reply_send_wa_sup: string;
  comp_reply_send_sms: string;
  comp_reply_close: string;
  comp_order_items_heading: string;
  comp_driver_details_heading: string;
  comp_party_supervisor_label: string;
  challan_modal_title: string;
  challan_doc_heading: string;
  challan_doc_sub: string;
  challan_number_label: string;
  challan_order_ref: string;
  challan_booking_date: string;
  challan_consignee_heading: string;
  challan_destination_heading: string;
  challan_dispatch_heading: string;
  challan_items_heading: string;
  challan_terms_heading: string;
  challan_sign_dispatcher: string;
  challan_sign_driver: string;
  challan_sign_receiver: string;
  challan_btn_print: string;
  challan_btn_share: string;
  challan_btn_view: string;
  comp_change_status_title: string;
  
  // Order CTA Banner
  cta_direct_badge: string;
  cta_headline: string;
  cta_description: string;
  cta_button: string;
  
  // Contact
  contact_title: string;
  contact_subtitle: string;
  contact_direct_wa: string;
  contact_wa_sub: string;
  contact_view_maps: string;
  contact_vasai_city: string;
  call_or_wa: string;
  factory_addr: string;
  
  // Footer
  footer_desc: string;
  footer_all_rights: string;
  footer_vasai_address: string;
  footer_brochure_link: string;
  footer_order_link: string;
  footer_myorders_link: string;
  footer_company_link: string;
  footer_quick_links_heading: string;
  footer_contacts_heading: string;
  
  // General
  lang_saved: string;
  toast_order_placed: string;
  toast_order_deleted: string;
  toast_orders_cleared: string;
  toast_product_selected: string;
  toast_block_applied: string;
  toast_status_updated: string;
  toast_date_updated: string;
  toast_location_updated: string;
  
  // WhatsApp & Modal Localization
  wa_send_main_btn: string;
  wa_send_alternate_label: string;
  order_summary_heading: string;
  wa_copy_btn: string;
  wa_copy_success: string;
  factory_dispatch_note: string;
  date_picker_title: string;
  date_picker_cancel: string;
  date_picker_ok: string;
  date_picker_select_year: string;
  date_picker_select_month: string;
  comp_notify_party_title: string;
  comp_old_date_label: string;
  comp_new_date_label: string;
  comp_wa_party_btn: string;
  comp_wa_sup_btn: string;
  comp_sms_party_btn: string;
  comp_close_btn: string;
  comp_save_btn: string;
  comp_cancel_btn: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  mr: {
    tab_brochure: '📘 ब्रोशर',
    tab_order: '📦 ऑर्डर',
    tab_myorders: '📋 माझे ऑर्डर',
    tab_company: '🏢 कंपनी',
    
    tagline: 'Plot No.5/2, Younus Estate, Khandipada Road, Kaman, Vasai (E) - 401202 | ISO 9001:2015 Certified',
    badge_no_personal_email: '✓ Personal Email कुठेही नाही',
    badge_no_price: '✓ पैसे कुठेही नाहीत (माहिती फक्त)',
    badge_safe_wa: '✓ Notification https://wa.me/ - Error नाही',
    select_lang_label: 'भाषा निवडा:',
    
    // Auth & Sign In
    auth_login_title: 'E-Buildcon मध्ये साइन इन करा',
    auth_login_subtitle: 'तुमच्या नोंदणीकृत मोबाईल नंबरने किंवा दुकानाच्या नावाने लॉगिन करा',
    auth_signup_title: 'नवीन बिल्डर / ग्राहक नोंदणी',
    auth_signup_subtitle: 'एकदाच नोंदणी करा आणि तुमचे साईट तपशील व मागील सर्व ऑर्डर्स नेहमी सेव्ह ठेवा',
    auth_tab_login: 'साइन इन (लॉगिन)',
    auth_tab_signup: 'नवीन नोंदणी',
    auth_phone_label: 'मोबाईल नंबर *',
    auth_phone_placeholder: 'उदा. 9819927174',
    auth_name_label: 'दुकान / बिल्डर / पार्टीचे नाव *',
    auth_name_placeholder: 'उदा. रमेश बिल्डर्स / पाटील ट्रेडर्स',
    auth_pin_label: 'सुरक्षा पिन / पासवर्ड *',
    auth_pin_placeholder: '४ अंकी पिन टाका (उदा. 1234)',
    auth_remember_me: 'या डिव्हाइसवर मला लॉग इन ठेवा',
    auth_login_btn: 'साइन इन करा व पुढे जा',
    auth_signup_btn: 'नोंदणी करा व साइन इन व्हा',
    auth_demo_login_btn: '👷 जलद डेमो लॉगिन (रमेश बिल्डर्स - पिन: 1234)',
    auth_no_account: 'अकाउंट नाही? आताच नवीन नोंदणी करा',
    auth_has_account: 'आधीच नोंदणी केली आहे? साइन इन करा',
    auth_logout_btn: 'लॉगआउट',
    auth_logout_confirm: 'तुम्हाला नक्की लॉगआउट करायचे आहे का?',
    auth_welcome_back: 'पुन्हा स्वागत आहे,',
    auth_stored_info_note: '🔒 तुमचे तपशील आणि मागील सर्व ऑर्डर्स या डिव्हाइसवर सुरक्षित साठवले जातात.',
    auth_err_phone_req: 'कृपया वैध १० अंकी मोबाईल नंबर टाका',
    auth_err_pin_req: 'कृपया तुमचा ४ अंकी सुरक्षा पिन टाका',
    auth_err_name_req: 'कृपया दुकान किंवा बिल्डरचे नाव टाका',
    auth_err_invalid: 'चुकीचा मोबाईल नंबर किंवा पिन. कृपया तपासून पुन्हा प्रयत्न करा.',
    auth_profile_title: 'माझे बिल्डर प्रोफाईल',
    auth_default_site_title: 'माझे डीफॉल्ट साईट तपशील',
    auth_update_profile_btn: 'प्रोफाईल सेव्ह करा',
    auth_profile_updated: 'प्रोफाईल यशस्वीरित्या अपडेट झाले!',
    auth_confirm_pin_label: 'पिनची पुष्टी करा *',
    auth_confirm_pin_placeholder: '४ अंकी पिन पुन्हा टाका',
    auth_err_pin_mismatch: 'दोन्ही सुरक्षा पिन जुळत नाहीत! कृपया पुन्हा तपासा.',
    auth_err_user_not_found: 'या मोबाईल क्रमांकावर खाते आढळले नाही. कृपया "नवीन नोंदणी" टॅबमधून नोंदणी करा.',
    auth_err_incorrect_pin: 'चुकीचा सुरक्षा पिन! कृपया योग्य ४ अंकी पिन टाका किंवा मदत मिळवा.',
    auth_forgot_pin_help: 'पिन विसरलात? थेट फॅक्टरी सपोर्टशी संपर्क करा (WhatsApp)',
    auth_terms_agreement: 'मी थेट फॅक्टरी पुरवठ्यासाठी अधिकृत ग्राहक/बिल्डर म्हणून नोंदणी करत आहे.',
    auth_terms_required: 'नोंदणी पूर्ण करण्यासाठी कृपया अटी मान्यतेचा चेकबॉक्स निवडा.',
    
    hero_title: 'दर्जेदार बांधकाम साहित्याचे विश्वसनीय पुरवठादार',
    hero_subtitle: 'ISO 9001:2015 प्रमाणित AAC ब्लॉक्स (२" ते ९"), ReadyMix Plaster, Block Mortar आणि Tile Adhesive. १००% आमच्या स्वतःच्या वाहनांद्वारे जलद डिलिव्हरी.',
    hero_cta_order: '📦 नवीन ऑर्डर टाका',
    hero_cta_products: '🏗️ आमची उत्पादने पहा',
    hero_cta_brochure: '📘 ब्रोशर पहा (२३ फोटो)',
    quick_wa_quote: 'WhatsApp वर संपर्क',
    hero_badge_kaman: 'ISO 9001:2015 प्रमाणित • कामण, वसई (पूर्व) थेट कारखाना पुरवठा',
    hero_feat_sizes: 'सर्व ८ Sizes (२" ते ९")',
    hero_feat_fleet: '१००% स्वतःच्या गाड्या',
    hero_feat_plaster: 'तडे-मुक्त ReadyMix',
    hero_direct_inquiry: 'थेट संपर्क व चौकशी',
    hero_card_desc: 'काँक्रीट उत्पादने, रेडीमिक्स प्लास्टर व टाइल अडेसिव्ह पुरवठा',
    hero_official_email: 'कंपनी अधिकृत ईमेल:',
    hero_direct_phone: 'थेट फोन संपर्क:',
    
    why_choose_tag: 'का निवडावे ई-बिल्डकॉन?',
    why_choose_title: 'आमची ताकद आणि गुणवत्ता हमी (Why Choose Us)',
    why_points: [
      {
        title: 'ISO 9001:2015 प्रमाणित गुणवत्ता',
        desc: 'कठोर गुणवत्ता तपासणी आणि आंतरराष्ट्रीय मानकांनुसार उत्पादन प्रक्रिया.',
        badge: 'Certified'
      },
      {
        title: '१००% स्वतःची वाहतूक व्यवस्था (Own Fleet)',
        desc: 'टेम्पो १.५ टन ते २२ टन हेवी ट्रक अशी ४ प्रकारची स्वतःची वाहने. वेळेत आणि सुरक्षित डिलिव्हरी.',
        badge: '4 Owned Vehicles'
      },
      {
        title: 'कामण, वसई थेट कारखाना पुरवठा',
        desc: 'युनुस इस्टेट, खंडीपाडा रोड, कामण येथून थेट साईटवर माल रवाना. कोणताही मध्यस्थ नाही.',
        badge: 'Direct Dispatch'
      },
      {
        title: 'सर्व ८ साईजेस (७" इंच सहित)',
        desc: '२", ३", ४", ५", ६", ७", ८", ९" अशा सर्व ८ साईजेसचे AAC ब्लॉक्स आणि अचूक CBM मोजणी.',
        badge: 'All 8 Sizes'
      },
      {
        title: 'क्रॅक-फ्री रेडीमिक्स प्लास्टर व मॉर्टर',
        desc: 'उच्च सामर्थ्य, वॉटरप्रूफ गुणधर्म आणि सिमेंट-वाळूच्या तुलनेत अधिक वेगवान व दर्जेदार बांधकाम.',
        badge: 'Crack-Free'
      },
      {
        title: 'पारदर्शक थेट संपर्क व सुरक्षित प्रणाली',
        desc: 'थेट WhatsApp द्वारे ऑर्डर सूचना, कंपनी ईमेल आणि पारदर्शक व्यवस्था.',
        badge: 'Safe wa.me'
      }
    ],
    
    prod_title: '🏗️ आमची प्रोडक्ट्स - माहिती फक्त - पैसे नाहीत',
    prod_subtitle: 'कुठेही पैसे नाहीत - फक्त तांत्रिक माहिती, साईजेस आणि कव्हरेज तपशील',
    no_price_badge: '✓ No Price Anywhere - फक्त माहिती',
    view_details: 'सविस्तर माहिती',
    add_to_order_action: 'ऑर्डर मध्ये जोडा',
    coverage_label: 'कव्हरेज / मोजमाप:',
    modal_packing_size: 'पॅकिंग / आकार',
    modal_coverage: 'कव्हरेज (Coverage)',
    modal_key_features: 'महत्त्वाची वैशिष्ट्ये व गुणधर्म',
    modal_add_to_order: 'ऑर्डर फॉर्म मध्ये जोडा',
    modal_close: 'बंद करा',
    
    size_title: '📊 AAC Block Size Chart - 2" ते 9" - सर्व Sizes - पैसे नाहीत',
    size_subtitle: 'कुठेही पैसे नाहीत - Rs. नाही - ₹ नाही - Rate नाही - फक्त Size आणि नग / CBM',
    calc_title: '📐 परस्परसंवादी AAC Block CBM कॅल्क्युलेटर',
    calc_subtitle: 'आकार आणि नग टाकून त्वरित CBM आणि योग्य वाहनाची शिफारस पहा',
    calc_accurate_badge: '✓ थेट अचूक मोजणी',
    calc_label_size: 'ब्लॉक साईज निवडा (इंच)',
    calc_label_qty: 'नग (Pieces) प्रविष्ट करा',
    calc_res_cbm: 'एकूण अंदाज CBM:',
    calc_res_rec_vehicle: 'शिफारस केलेले वाहन:',
    calc_add_to_cart: 'हे मोजमाप ऑर्डर फॉर्म मध्ये जोडा',
    calc_selected_size: 'निवडलेला आकार:',
    calc_pcs_unit: 'नग',
    calc_inch_unit: 'इंच',
    calc_action_select: 'ऑर्डर निवडा',
    calc_rec_vehicle_label: 'शिफारस गाडी:',
    calc_7_inch_badge: '',
    calc_action_col: 'कृती',
    weight_col_note: 'Weight नाही - फक्त नग',
    pcs_per_cbm: 'नग / 1 CBM',
    
    vehicle_title: '🚚 उपलब्ध गाड्या - सर्व आमच्या मालकीच्या - 4 गाड्या',
    vehicle_subtitle: 'प्रत्येक गाडी पुढे "आमची गाडी" लेबल नाही - फक्त CBM - सर्व गाड्या आमच्या मालकीच्या आहेत',
    vehicle_owned_badge: '✓ १००% आमच्या मालकीची गाडी',
    vehicle_capacity_label: 'क्षमता:',
    vehicle_fleet_footer: '✓ थेट कारखान्यातून जलद पोहोच • भाडे आणि मध्यस्थांशिवाय स्वतःचे लॉजिस्टिक्स नेटवर्क',
    
    brochure_header_title: '📄 अधिकृत उत्पादन ब्रोशर (Official PDF & Gallery)',
    brochure_header_sub: '१२ पृष्ठे • २३ छायाचित्रे • ब्राउझरमध्येच संपूर्ण ब्रोशर उपलब्ध',
    brochure_tab_book: 'पृष्ठानुसार (Page View)',
    brochure_tab_gallery: 'सर्व २३ फोटो (All 23)',
    brochure_download_btn: 'डाउनलोड',
    brochure_prev_btn: 'मागील पृष्ठ',
    brochure_next_btn: 'पुढील पृष्ठ',
    brochure_page_label: 'पृष्ठ',
    brochure_all_photos_note: '✓ मूळ कॅटलॉग मधील सर्व २३ Real JPG छायाचित्रे खाली दिलेली आहेत:',
    brochure_total_photos: 'एकूण २३ फोटो',
    
    order_title: '📦 नवीन ऑर्डर टाका - सर्व Fix - Notification जाईल!',
    order_subtitle: 'Location Optional - हवी असलेली तारीख Required - https://wa.me/ - whatsapp:// नाही - Error नाही!',
    order_sec_customer: 'ग्राहक व साईट माहिती (Customer & Site Details)',
    order_sec_delivery: 'डिलिव्हरी लोकेशन व GPS नकाशे (Delivery Location & GPS)',
    shop_label: 'दुकानाचे / बिल्डर चे नाव * - सर्वात वरती',
    shop_placeholder: 'दुकानाचे / बिल्डर चे नाव - उदा. रमेश बिल्डर्स / पाटील ट्रेडर्स',
    sup_name_label: '👷 साईट सुपरवायझर चे नाव *',
    sup_name_placeholder: 'सुपरवायझर नाव - उदा. सुनिल',
    sup_phone_label: '📱 सुपरवायझर मोबाइल नंबर *',
    sup_phone_placeholder: 'सुपरवायझर मोबाइल - उदा. 9876543210',
    phone_label: 'फोन नंबर *',
    phone_placeholder: 'उदा. 7798820534',
    site_label: 'साईटचा पत्ता *',
    site_placeholder: 'उदा. नालासोपारा वेस्ट',
    del_loc_label: 'Delivery Location (Optional) - कंपल्सरी नाही - नसेल तरी Order जाईल',
    del_loc_placeholder: 'उदा. Nalasopara (Optional)',
    maps_link_label: 'Google Maps Link (Optional) - नसेल तरी चालेल',
    maps_link_placeholder: 'https://maps.google.com/... (Share केल्यावर Auto येईल)',
    loc_option_title: 'डिलिव्हरी लोकेशनचा पर्याय निवडा:',
    loc_opt_manual_title: 'पर्याय १: पत्ता स्वतः टाईप करा',
    loc_opt_manual_desc: 'साईटचे ठिकाण, लँडमार्क किंवा परिसर लिहा',
    loc_opt_gps_title: 'पर्याय २: Google Maps / GPS द्वारे मिळवा',
    loc_opt_gps_desc: 'थेट गावाचे/भागाचे नाव आणि Maps लिंक ऑटो-डिटेक्ट होते',
    loc_manual_tip: '💡 तुम्ही कोणताही लँडमार्क, इमारत किंवा रस्त्याचे नाव टाईप करू शकता. Google Maps लिंक देणे ऐच्छिक आहे.',
    loc_gps_detected_place: 'शोधलेले ठिकाण:',
    loc_gps_refetch_btn: '🔄 पुन्हा लोकेशन शोधा (Refresh)',
    loc_gps_status_idle: 'GPS द्वारे थेट लोकेशन आणि जागेचे नाव मिळवण्यासाठी खालील बटण दाबा.',
    gps_fetching_place: '⏳ GPS शोधत आहे व गावाचे/भागाचे नाव मिळवत आहे... (कृपया थांबा)',
    gps_not_supported: '❌ या ब्राउझरमध्ये Geolocation Supported नाही. कृपया Chrome किंवा Edge वापरा.',
    share_gps_btn: '📍 Share Current Location - चालू करा - GPS + Maps - Click करा',
    gps_fetching: '⏳ Location घेत आहे... 10 सेकंद वाट पहा...',
    gps_success: '✅ Location मिळाली! Delivery Location मध्ये Auto Fill झाली.',
    gps_denied: '❌ Permission Denied - Chrome मध्ये Settings > Location > Allow करा.',
    gps_off: '❌ GPS Off - मोबाईल मधील GPS व इंटरनेट चालू करा.',
    gps_timeout: '❌ Timeout - मोकळ्या जागेत जा व पुन्हा प्रयत्न करा.',
    order_view_on_maps: 'Google Maps वर पहा',
    date_label: '📅 हवी असलेली तारीख / तुम्हाला माल कधी पाहिजे? * Required - ही दिसते का चेक करा *',
    date_placeholder: 'DD/MM/YYYY - उदा. 09/09/2026',
    order_date_note: 'टीप: तारीख DD/MM/YYYY फॉरमॅट मध्ये ठेवा (उदा. 09/09/2026).',
    
    item_add_title: 'Item Add करा - सर्व Product - Block + Plaster + Mortar + Adhesive',
    add_item_btn: '➕ Add Item - Product Add करा - Total:',
    place_order_btn: '✅ ऑर्डर पाठवा - थेट WhatsApp वर पाठवा',
    calc_info_block: '3" 800 नग = 7.20 CBM - केमिकल Auto नाही - पाहिजे असेल तर Block Mortar अलग से Add करा',
    calc_info_plaster: 'ReadyMix Plaster - Bag टाका - 40kg',
    calc_info_mortar: 'Block Mortar - केमिकल - पाहिजे असेल तर अलग से Add करा - Optional',
    calc_info_adhesive: 'Tile Adhesive - Bag टाका - 20kg / 40kg',
    total_label: 'Total - CBM + Bags',
    no_item: 'अजून आयटम नाही - Product निवडा - Add करा - 3" 800 नग = CBM - केमिकल अलग से',
    block_opt: '🧱 AAC Block - 2" ते 9" - नग / CBM - केमिकल नाही',
    plaster_opt: '🏗️ ReadyMix Plaster - 40kg Bag',
    mortar_opt: '🧱 Block Mortar / Jointing Motor - 40kg Bag - Optional - अलग से',
    adhesive_opt: '🏠 Tile Adhesive - 20kg & 40kg Bag',
    order_items_col_separate: 'अलग से',
    order_location_optional_note: 'Location नसेल तरी Order जाईल (Optional) - हवी असलेली तारीख आवश्यक आहे - Safe https://wa.me/ द्वारे थेट कंपनीशी कनेक्ट!',
    
    wa_order_success_title: '🎉 ऑर्डर नोंदवली गेली आणि WhatsApp कनेक्ट झाले!',
    wa_order_success_desc: 'तुमची ऑर्डर E-Buildcon डिस्पॅच टीमला पाठवण्यासाठी WhatsApp उघडले आहे. जर उघडले नसेल तर खालील बटण दाबा.',
    order_summary_customer: 'दुकान/बिल्डर:',
    order_summary_supervisor: 'सुपरवायझर:',
    order_summary_material: 'ऑर्डर सामग्री:',
    order_summary_req_date: 'हवी असलेली तारीख:',
    order_summary_site: 'साईट:',
    order_wa_send_prefix: 'ला WhatsApp पाठवा (Send)',
    close_view_my_orders: 'बंद करा - My Orders बघा',
    
    myorders_title: '📋 माझे ऑर्डर्स - Browser बंद असेल तरी Save राहतील',
    myorders_subtitle: 'तुमच्या सर्व नोंदवलेल्या ऑर्डर्सची यादी',
    myorders_count_label: 'ऑर्डर्स नोंदवलेल्या',
    myorders_clear_all: 'सर्व क्लिअर करा',
    myorders_new_order_btn: '+ नवीन ऑर्डर',
    myorders_filter_status: 'सर्व स्थिती (All Status)',
    myorders_status_pending: 'Pending (प्रलंबित)',
    myorders_status_confirmed: 'Confirmed (निश्चित)',
    myorders_status_dispatched: 'Dispatched (गाडी निघाली)',
    myorders_status_delivered: 'Delivered (पोहोचले)',
    myorders_req_date_label: 'हवी असलेली तारीख:',
    myorders_site_label: 'साईटचा पत्ता:',
    myorders_del_loc_label: 'डिलिव्हरी लोकेशन:',
    myorders_view_maps: 'Google Maps वर लोकेशन पहा',
    myorders_items_breakdown: 'सामग्री तपशील:',
    myorders_resend_wa_btn: 'WhatsApp माहिती पुन्हा पाठवा',
    myorders_close_btn: 'बंद करा',
    myorders_no_result: 'कोणतीही ऑर्डर सापडली नाही. शोध निकष बदलून पहा.',
    no_orders_yet: 'अजून ऑर्डर नाही - Party Order मधून टाका - Location Optional आहे',
    search_orders_placeholder: 'बिल्डर नाव किंवा फोन नंबर शोधा...',
    
    company_title: '🏢 सर्व ऑर्डर्स - Company Panel - OTP Verified',
    company_login_title: '🏢 कंपनी Panel - OTP 1234',
    company_login_sub: 'फक्त Company Email - ebuildconenterprises@gmail.com - Personal Email नाही',
    comp_mode_demo: 'डेमो मोड (OTP 1234)',
    comp_mode_prod: 'सुरक्षित मोड (Production)',
    comp_demo_hint: 'डेमो ॲक्सेस कोड: 1234',
    comp_prod_hint: 'कंपनी व्यवस्थापक सुरक्षा कोड टाका:',
    comp_verify_secure: 'सुरक्षित लॉगिन (Verify)',
    comp_auth_system: 'सुरक्षित प्रमाणीकरण प्रणाली',
    comp_auth_demo_desc: 'डेमो मोड तपासणीसाठी आहे. पासवर्ड सुरक्षित sessionStorage मध्ये जतन केला जातो.',
    comp_auth_prod_desc: 'प्रॉडक्शन मोड मध्ये दर ५ मिनिटांनी सेशन एक्सपायर होते व रेट-लिमिटिंग लागू असते.',
    comp_verified_session: '✓ Verified Session',
    comp_logout: 'लॉगआउट',
    comp_site_addr: '📍 साईट पत्ता:',
    comp_del_loc: '🚚 डिलिव्हरी लोकेशन:',
    comp_del_date: '📅 हवी असलेली / Delivery तारीख:',
    comp_open_maps: 'Google Maps लिंक उघडा',
    otp_placeholder: '1234 टाका',
    verify_otp_btn: 'Verify OTP 1234',
    enable_noti_btn: '🔔 Enable Background Notification',
    no_company_orders: 'No orders yet - Party Order मधून येईल',
    btn_change_date: '📅 Delivery तारीख बदला - DD/MM/YYYY',
    btn_change_del: '🚚 Delivery Location बदला',
    btn_confirm_wa: 'Confirm - WhatsApp',
    btn_dispatch: 'Dispatch - गाडी निघाली',
    btn_delivered: '✅ Delivered',
    comp_auth_gate_title: '🏢 कंपनी विभाग - केवळ अधिकृत कर्मचाऱ्यांसाठी',
    comp_auth_gate_desc: 'हा विभाग केवळ E-Buildcon Enterprises च्या अधिकृत व्यवस्थापनासाठी आहे. इतर कोणत्याही वापरकर्त्याला येथे प्रवेश नाही.',
    comp_auth_allowed_ids_label: 'प्रवेशासाठी अधिकृत संपर्क (Authorized Contacts):',
    comp_auth_id_input_label: 'कंपनी फोन नंबर किंवा कंपनी ईमेल टाका:',
    comp_auth_id_placeholder: 'उदा. 9819927174 किंवा ebuildconenterprises@gmail.com',
    comp_auth_pin_label: 'कंपनी सुरक्षा पिन / OTP:',
    comp_auth_err_unauthorized: 'प्रवेश नाकारला! केवळ ९८१९९२७१७४ / ९३५९१६२२५३ / ९३५६७०९४८९ किंवा ebuildconenterprises@gmail.com हेच अधिकृत आहेत.',
    comp_auth_quick_select: 'झटपट अधिकृत खाते निवडा:',
    comp_auth_detected_badge: 'अधिकृत कंपनी कर्मचारी खाते आढळले!',
    comp_orders_all_title: 'सर्व ऑर्डर रेकॉर्ड्स आणि तपशील',
    comp_orders_all_sub: 'नोंदवलेल्या सर्व ऑर्डर्सचा संपूर्ण डेटा, साहित्य तपशील आणि थेट ग्राहक संवाद प्रणाली',
    comp_search_orders: 'ऑर्डर, ग्राहक, फोन किंवा साईट पत्ता शोधा...',
    comp_filter_all: 'सर्व ऑर्डर्स',
    comp_filter_pending: 'प्रलंबित (Pending)',
    comp_filter_confirmed: 'कन्फर्म (Confirmed)',
    comp_filter_dispatched: 'गाडी निघाली (Dispatched)',
    comp_filter_delivered: 'डिलिव्हर झाले (Delivered)',
    comp_stat_total_orders: 'एकूण नोंदवलेल्या ऑर्डर्स',
    comp_stat_total_cbm: 'एकूण मोजमाप (CBM)',
    comp_btn_reply_customer: '💬 ग्राहकाला उत्तर / संपर्क',
    comp_reply_modal_title: 'ग्राहकाशी संपर्क आणि ऑर्डर उत्तर (Reply to Customer)',
    comp_reply_call_party: '📞 ग्राहकाला थेट कॉल करा',
    comp_reply_call_sup: '👷 साईट सुपरवायझरला कॉल करा',
    comp_reply_templates_label: 'झटपट संदेश पर्याय (Quick Reply Templates):',
    comp_reply_custom_label: 'संदेश संपादित करा किंवा नवीन टाईप करा:',
    comp_reply_send_wa_party: '🟢 ग्राहकाला WhatsApp उत्तर पाठवा',
    comp_reply_send_wa_sup: '🔵 सुपरवायझरला WhatsApp उत्तर पाठवा',
    comp_reply_send_sms: '💬 ग्राहकाला SMS पाठवा',
    comp_reply_close: 'बंद करा',
    comp_order_items_heading: 'मागवलेली सामग्री (आयटम तपशील):',
    comp_driver_details_heading: 'डिसपॅच व ड्रायव्हर तपशील:',
    comp_party_supervisor_label: 'साईट सुपरवायझर:',
    challan_modal_title: '📄 अधिकृत डिलिव्हरी चलन (Delivery Challan)',
    challan_doc_heading: 'डिलिव्हरी चलन व साहित्य पावती (DELIVERY CHALLAN)',
    challan_doc_sub: 'ई-बिल्डकॉन एंटरप्रायझेस • थेट कारखाना डिस्पॅच • ISO 9001:2015',
    challan_number_label: 'चलन क्र.',
    challan_order_ref: 'ऑर्डर संदर्भ क्र.',
    challan_booking_date: 'बुकिंग तारीख',
    challan_consignee_heading: 'ग्राहकाचे नाव व साईट तपशील (Consignee Details)',
    challan_destination_heading: 'डिलिव्हरी ठिकाण व साईट (Delivery Destination)',
    challan_dispatch_heading: 'वाहन व ड्रायव्हर तपशील (Transport Details)',
    challan_items_heading: 'पुरवठा केलेली सामग्री (Item Breakdown)',
    challan_terms_heading: 'डिलिव्हरी अटी व शर्ती (Standard Terms):',
    challan_sign_dispatcher: 'अधिकृत स्वाक्षरी (फॅक्टरी डिस्पॅच)',
    challan_sign_driver: 'माल वाहक / ड्रायव्हरची स्वाक्षरी',
    challan_sign_receiver: 'ग्राहक / सुपरवायझर स्वाक्षरी व शिक्का',
    challan_btn_print: '🖨️ प्रिंट / PDF सेव्ह करा',
    challan_btn_share: '📱 WhatsApp वर चलन पाठवा',
    challan_btn_view: '📄 चलन / पावती पहा',
    comp_change_status_title: 'ऑर्डर स्थिती बदला:',
    
    cta_direct_badge: 'थेट कारखाना पुरवठा • त्वरित डिलिव्हरी',
    cta_headline: 'तुमच्या बांधकामासाठी त्वरित ऑर्डर नोंदवा',
    cta_description: 'दुकान किंवा बिल्डरचे नाव, साईट पत्ता आणि हवी असलेली तारीख निवडून त्वरित ऑर्डर द्या. थेट ३ नंबरवर WhatsApp सूचना!',
    cta_button: 'ऑर्डर फॉर्म उघडा',
    
    contact_title: '📞 अधिकृत संपर्क माहिती (Official Contact)',
    contact_subtitle: 'थेट कारखाना संपर्क, जलद चौकशी आणि ऑर्डर समन्वयासाठी',
    contact_direct_wa: 'थेट WhatsApp संवाद (Direct Chat)',
    contact_wa_sub: 'सुरक्षित HTTPS wa.me द्वारे थेट संदेश पाठवा',
    contact_view_maps: 'Google Maps वर दिशा पहा',
    contact_vasai_city: 'कामण, वसई (पूर्व) - ४०१२०२',
    call_or_wa: 'Call / WhatsApp - 3 Numbers',
    factory_addr: 'कारखाना / मुख्य कार्यालय',
    
    footer_desc: 'उच्च दर्जाचे AAC ब्लॉक्स (२" ते ९"), ReadyMix Plaster, Block Mortar आणि Tile Adhesive चे अधिकृत उत्पादक व वितरक.',
    footer_all_rights: 'सर्व हक्क सुरक्षित.',
    footer_vasai_address: 'कामण, वसई (पूर्व), जि. पालघर - ४०१२०२',
    footer_brochure_link: '📘 अधिकृत ब्रोशर (23 Photos)',
    footer_order_link: '📦 नवीन ऑर्डर टाका (New Order)',
    footer_myorders_link: '📋 माझे ऑर्डर्स (My Orders)',
    footer_company_link: '🏢 कंपनी पॅनल (Company Panel)',
    footer_quick_links_heading: 'जलद नेव्हिगेशन',
    footer_contacts_heading: 'अधिकृत संपर्क व धोरणे',
    
    lang_saved: 'भाषा बदलली',
    toast_order_placed: 'ऑर्डर यशस्वीपणे नोंदवली!',
    toast_order_deleted: 'ऑर्डर हटवली!',
    toast_orders_cleared: 'सर्व ऑर्डर्स क्लिअर केल्या!',
    toast_product_selected: 'उत्पादन निवडले! कृपया फॉर्म पूर्ण करा.',
    toast_block_applied: 'AAC Block ऑर्डर फॉर्म मध्ये निवडले!',
    toast_status_updated: 'ऑर्डर स्थिती अपडेट झाली',
    toast_date_updated: 'डिलिव्हरी तारीख अपडेट झाली',
    toast_location_updated: 'डिलिव्हरी लोकेशन अपडेट झाली',
    
    wa_send_main_btn: 'WhatsApp वर पाठवा',
    wa_send_alternate_label: 'किंवा पर्यायी नंबरवर पाठवा (Alternate Numbers):',
    order_summary_heading: 'ऑर्डर सारांश',
    wa_copy_btn: 'संपूर्ण मेसेज कॉपी करा (Copy WhatsApp Text)',
    wa_copy_success: 'ऑर्डर मेसेज कॉपी झाला! (Copied to Clipboard)',
    factory_dispatch_note: 'वसई फॅक्टरी थेट डिस्पॅच',
    date_picker_title: 'तारीख निवडा',
    date_picker_cancel: 'रद्द करा',
    date_picker_ok: 'निश्चित करा',
    date_picker_select_year: 'वर्ष निवडा',
    date_picker_select_month: 'महिना निवडा',
    comp_notify_party_title: 'तारीख बदलली - पार्टीला कळवा!',
    comp_old_date_label: 'जुनी तारीख',
    comp_new_date_label: 'नवीन तारीख',
    comp_wa_party_btn: 'पार्टीला WhatsApp पाठवा',
    comp_wa_sup_btn: 'सुपरवायझरला WhatsApp पाठवा',
    comp_sms_party_btn: 'पार्टीला SMS पाठवा',
    comp_close_btn: 'बंद करा',
    comp_save_btn: 'सेव्ह करा',
    comp_cancel_btn: 'रद्द करा'
  },
  en: {
    tab_brochure: '📘 Brochure',
    tab_order: '📦 Order',
    tab_myorders: '📋 My Orders',
    tab_company: '🏢 Company',
    
    tagline: 'Plot No.5/2, Younus Estate, Khandipada Road, Kaman, Vasai (E) - 401202 | ISO 9001:2015 Certified',
    badge_no_personal_email: '✓ No Personal Email (Company Email Only)',
    badge_no_price: '✓ No Prices Online (Info & Quote Only)',
    badge_safe_wa: '✓ Safe HTTPS https://wa.me/ - No Error',
    select_lang_label: 'Select Language:',
    
    // Auth & Sign In
    auth_login_title: 'Sign In to E-Buildcon',
    auth_login_subtitle: 'Sign in with your registered mobile number or shop name',
    auth_signup_title: 'New Builder / Customer Registration',
    auth_signup_subtitle: 'Register once to save your site details and access previous order history anytime',
    auth_tab_login: 'Sign In',
    auth_tab_signup: 'New Registration',
    auth_phone_label: 'Mobile Number *',
    auth_phone_placeholder: 'e.g. 9819927174',
    auth_name_label: 'Shop / Builder / Customer Name *',
    auth_name_placeholder: 'e.g. Ramesh Builders / Patil Traders',
    auth_pin_label: 'Security PIN / Password *',
    auth_pin_placeholder: 'Enter 4-digit PIN (e.g. 1234)',
    auth_remember_me: 'Remember me on this device',
    auth_login_btn: 'Sign In & Continue',
    auth_signup_btn: 'Register & Sign In',
    auth_demo_login_btn: '👷 Quick Demo Login (Ramesh Builders - PIN: 1234)',
    auth_no_account: "Don't have an account? Register Now",
    auth_has_account: 'Already have an account? Sign In',
    auth_logout_btn: 'Logout',
    auth_logout_confirm: 'Are you sure you want to log out?',
    auth_welcome_back: 'Welcome back,',
    auth_stored_info_note: '🔒 Your details and past orders are safely remembered on this device.',
    auth_err_phone_req: 'Please enter a valid 10-digit mobile number',
    auth_err_pin_req: 'Please enter your 4-digit security PIN',
    auth_err_name_req: 'Please enter your Shop or Builder Name',
    auth_err_invalid: 'Incorrect mobile number or security PIN. Please check and try again.',
    auth_profile_title: 'My Builder Profile',
    auth_default_site_title: 'My Default Site Details',
    auth_update_profile_btn: 'Save Profile Changes',
    auth_profile_updated: 'Profile updated successfully!',
    auth_confirm_pin_label: 'Confirm PIN *',
    auth_confirm_pin_placeholder: 'Re-enter your 4-digit PIN',
    auth_err_pin_mismatch: 'Security PINs do not match! Please verify.',
    auth_err_user_not_found: 'No account found with this phone number. Please click "New Registration" to register.',
    auth_err_incorrect_pin: 'Incorrect security PIN. Please re-enter or request PIN reset assistance.',
    auth_forgot_pin_help: 'Forgot PIN? Contact factory manager on WhatsApp',
    auth_terms_agreement: 'I register as an authorized contractor/builder for direct factory supplies.',
    auth_terms_required: 'Please agree to the registration terms checkbox to proceed.',
    
    hero_title: 'Trusted Supplier of Certified Construction Materials',
    hero_subtitle: 'ISO 9001:2015 Certified AAC Blocks (2" to 9"), ReadyMix Plaster, Block Mortar, and Tile Adhesive. Prompt delivery with 100% company-owned fleet.',
    hero_cta_order: '📦 Place New Order',
    hero_cta_products: '🏗️ View Our Products',
    hero_cta_brochure: '📘 View Brochure (23 Photos)',
    quick_wa_quote: 'Contact on WhatsApp',
    hero_badge_kaman: 'ISO 9001:2015 Certified • Kaman, Vasai (E) Direct Factory Supply',
    hero_feat_sizes: 'All 8 Sizes (2" to 9")',
    hero_feat_fleet: '100% Company-Owned Fleet',
    hero_feat_plaster: 'Crack-Free ReadyMix',
    hero_direct_inquiry: 'Direct Contact & Inquiries',
    hero_card_desc: 'Concrete products, readymix plaster, and tile adhesive supply',
    hero_official_email: 'Company Official Email:',
    hero_direct_phone: 'Direct Phone Contact:',
    
    why_choose_tag: 'Why Choose E-Buildcon?',
    why_choose_title: 'Our Strengths & Quality Assurance (Why Choose Us)',
    why_points: [
      {
        title: 'ISO 9001:2015 Certified Quality',
        desc: 'Rigorous quality inspections and international standard automated production.',
        badge: 'Certified'
      },
      {
        title: '100% Company-Owned Vehicle Fleet',
        desc: 'Fleet of 4 owned vehicle types from Tempo 1.5 Ton to 22 Ton Heavy Truck for on-time delivery.',
        badge: '4 Owned Vehicles'
      },
      {
        title: 'Direct Factory Dispatch from Kaman, Vasai',
        desc: 'Direct dispatch from Younus Estate, Khandipada Road, Kaman to site with zero middleman margin.',
        badge: 'Direct Dispatch'
      },
      {
        title: 'All Standard Sizes Available (2" to 9")',
        desc: 'Complete range of 2", 3", 4", 5", 6", 8", 9" AAC blocks with precise CBM calculations.',
        badge: 'Standard Sizes'
      },
      {
        title: 'Crack-Free ReadyMix Plaster & Mortar',
        desc: 'Superior adhesive strength, waterproof properties, and faster plastering vs conventional sand-cement.',
        badge: 'Crack-Free'
      },
      {
        title: 'Transparent Direct Communication & Safe System',
        desc: 'Instant WhatsApp order notification to company numbers, verified email, and secure workflows.',
        badge: 'Safe wa.me'
      }
    ],
    
    prod_title: '🏗️ Our Products - Info Only - No Price',
    prod_subtitle: 'No prices anywhere on the site - technical specifications, sizes, and coverage only',
    no_price_badge: '✓ No Price Anywhere - Info Only',
    view_details: 'View Details',
    add_to_order_action: 'Add to Order',
    coverage_label: 'Coverage / Measurement:',
    modal_packing_size: 'Packing / Size',
    modal_coverage: 'Coverage',
    modal_key_features: 'Key Features & Properties',
    modal_add_to_order: 'Add to Order Form',
    modal_close: 'Close',
    
    size_title: '📊 AAC Block Size Chart - 2" to 9" - Standard Sizes - No Price',
    size_subtitle: 'No prices anywhere - No Rs. - No ₹ - No Rate - Only Size and Pcs / CBM',
    calc_title: '📐 Interactive AAC Block CBM Calculator',
    calc_subtitle: 'Select block size and quantity to instantly calculate CBM and suggested vehicle',
    calc_accurate_badge: '✓ Instant Accurate Calculation',
    calc_label_size: 'Select Block Size (Inch)',
    calc_label_qty: 'Enter Quantity (Pieces)',
    calc_res_cbm: 'Total Estimated CBM:',
    calc_res_rec_vehicle: 'Recommended Vehicle:',
    calc_add_to_cart: 'Add this calculation to Order Form',
    calc_selected_size: 'Selected Size:',
    calc_pcs_unit: 'Pcs',
    calc_inch_unit: 'Inch',
    calc_action_select: 'Select for Order',
    calc_rec_vehicle_label: 'Recommended Vehicle:',
    calc_7_inch_badge: '',
    calc_action_col: 'Action',
    weight_col_note: 'No Weight - Pcs Only',
    pcs_per_cbm: 'Pcs / 1 CBM',
    
    vehicle_title: '🚚 Available Vehicles - All Owned - 4 Vehicles',
    vehicle_subtitle: 'All vehicles are 100% company-owned - capacities defined in CBM and tonnage',
    vehicle_owned_badge: '✓ 100% Company-Owned Fleet',
    vehicle_capacity_label: 'Capacity:',
    vehicle_fleet_footer: '✓ Fast direct factory arrival • Company fleet without third-party commission',
    
    brochure_header_title: '📄 Official Product Brochure (PDF & Gallery)',
    brochure_header_sub: '12 Pages • 23 Photos • Full brochure available directly in browser',
    brochure_tab_book: 'Page View',
    brochure_tab_gallery: 'All 23 Photos',
    brochure_download_btn: 'Download',
    brochure_prev_btn: 'Previous Page',
    brochure_next_btn: 'Next Page',
    brochure_page_label: 'Page',
    brochure_all_photos_note: '✓ All 23 authentic high-resolution images from the catalog are displayed below:',
    brochure_total_photos: 'Total 23 Photos',
    
    order_title: '📦 Place New Order - All Fixed - Notification Will Go!',
    order_subtitle: 'Location Optional - Required Date Required - https://wa.me/ - No whatsapp:// error!',
    order_sec_customer: 'Customer & Site Details',
    order_sec_delivery: 'Delivery Location & GPS Maps',
    shop_label: 'Shop / Builder Name * - On Top',
    shop_placeholder: 'Shop / Builder Name - e.g. Ramesh Builders / Patil Traders',
    sup_name_label: '👷 Site Supervisor Name *',
    sup_name_placeholder: 'Supervisor Name - e.g. Sunil',
    sup_phone_label: '📱 Supervisor Mobile Number *',
    sup_phone_placeholder: 'Supervisor Mobile - e.g. 9876543210',
    phone_label: 'Phone Number *',
    phone_placeholder: 'e.g. 7798820534',
    site_label: 'Site Address *',
    site_placeholder: 'e.g. Nalasopara West',
    del_loc_label: 'Delivery Location (Optional) - Order will still proceed without this',
    del_loc_placeholder: 'e.g. Nalasopara (Optional)',
    maps_link_label: 'Google Maps Link (Optional) - Can be shared via GPS button',
    maps_link_placeholder: 'https://maps.google.com/... (Auto populated on share)',
    loc_option_title: 'Choose Delivery Location Option:',
    loc_opt_manual_title: 'Option 1: Enter Address Manually',
    loc_opt_manual_desc: 'Type landmark, building or area name',
    loc_opt_gps_title: 'Option 2: Fetch via Google Maps / GPS',
    loc_opt_gps_desc: 'Auto-detects live place name & Google Maps link',
    loc_manual_tip: '💡 You can enter any landmark, site address, or road name. Adding a Google Maps link is optional.',
    loc_gps_detected_place: 'Detected Place Name:',
    loc_gps_refetch_btn: '🔄 Re-fetch / Refresh Location',
    loc_gps_status_idle: 'Click the button below to fetch live location & place name via GPS.',
    gps_fetching_place: '⏳ Detecting GPS & fetching place name... (Please wait)',
    gps_not_supported: '❌ Geolocation is not supported in this browser. Please use Chrome or Edge.',
    share_gps_btn: '📍 Share Current Location - Turn on GPS + Maps - Click Here',
    gps_fetching: '⏳ Fetching Location... Please wait 10 seconds...',
    gps_success: '✅ Location Detected! Auto-filled in Delivery Location.',
    gps_denied: '❌ Permission Denied - Allow Location in Browser Settings.',
    gps_off: '❌ GPS Off - Please turn on Mobile GPS and Internet.',
    gps_timeout: '❌ Timeout - Please go to open sky and retry.',
    order_view_on_maps: 'View on Google Maps',
    date_label: '📅 Required Date / When Do You Need Material? * Required *',
    date_placeholder: 'DD/MM/YYYY - e.g. 09/09/2026',
    order_date_note: 'Note: Date format must be DD/MM/YYYY (e.g. 09/09/2026).',
    
    item_add_title: 'Add Items - All Products - Block + Plaster + Mortar + Adhesive',
    add_item_btn: '➕ Add Item - Add Product - Total:',
    place_order_btn: '✅ Place Order - Send via WhatsApp',
    calc_info_block: '3" 800 pcs = 7.20 CBM - No Auto Chemical - Add Block Mortar Separately if Needed',
    calc_info_plaster: 'ReadyMix Plaster - Enter Bags - 40kg',
    calc_info_mortar: 'Block Mortar - Chemical - Add Separately if Needed - Optional',
    calc_info_adhesive: 'Tile Adhesive - Enter Bags - 20kg / 40kg',
    total_label: 'Total - CBM + Bags',
    no_item: 'No Items Yet - Select Product - Add - 3" 800 pcs = CBM - Chemical Separate',
    block_opt: '🧱 AAC Block - 2" to 9" - Pcs / CBM - No Chemical',
    plaster_opt: '🏗️ ReadyMix Plaster - 40kg Bag',
    mortar_opt: '🧱 Block Mortar / Jointing Motor - 40kg Bag - Optional - Separate',
    adhesive_opt: '🏠 Tile Adhesive - 20kg & 40kg Bag',
    order_items_col_separate: 'Separate',
    order_location_optional_note: 'Order proceeds even without Location (Optional) - Required Date is mandatory - Direct connection via safe https://wa.me/ !',
    
    wa_order_success_title: '🎉 Order Recorded & WhatsApp Connected!',
    wa_order_success_desc: 'WhatsApp has been launched to send this order directly to E-Buildcon dispatch. If not opened, click the button below.',
    order_summary_customer: 'Shop / Builder:',
    order_summary_supervisor: 'Supervisor:',
    order_summary_material: 'Order Items:',
    order_summary_req_date: 'Required Date:',
    order_summary_site: 'Site:',
    order_wa_send_prefix: 'Send WhatsApp to',
    close_view_my_orders: 'Close & View My Orders',
    
    myorders_title: '📋 My Orders - Saved Even If Browser Closed',
    myorders_subtitle: 'Complete list of all your placed orders',
    myorders_count_label: 'orders recorded',
    myorders_clear_all: 'Clear All',
    myorders_new_order_btn: '+ New Order',
    myorders_filter_status: 'All Statuses',
    myorders_status_pending: 'Pending',
    myorders_status_confirmed: 'Confirmed',
    myorders_status_dispatched: 'Dispatched (Vehicle En Route)',
    myorders_status_delivered: 'Delivered',
    myorders_req_date_label: 'Required Date:',
    myorders_site_label: 'Site Address:',
    myorders_del_loc_label: 'Delivery Location:',
    myorders_view_maps: 'View location on Google Maps',
    myorders_items_breakdown: 'Item Breakdown:',
    myorders_resend_wa_btn: 'Re-send WhatsApp Details',
    myorders_close_btn: 'Close',
    myorders_no_result: 'No orders found matching your search.',
    no_orders_yet: 'No orders yet - Place from Order tab - Location is Optional',
    search_orders_placeholder: 'Search by builder name or phone...',
    
    company_title: '🏢 All Orders - Company Panel - OTP Verified',
    company_login_title: '🏢 Company Panel - OTP 1234',
    company_login_sub: 'Company Email Only: ebuildconenterprises@gmail.com - No Personal Email',
    comp_mode_demo: 'Demo Mode (OTP 1234)',
    comp_mode_prod: 'Secure Mode (Production)',
    comp_demo_hint: 'Demo Access Code: 1234',
    comp_prod_hint: 'Enter company security code:',
    comp_verify_secure: 'Verify & Login',
    comp_auth_system: 'Secure Authentication System',
    comp_auth_demo_desc: 'Demo mode is for evaluation. The session token is stored securely in sessionStorage.',
    comp_auth_prod_desc: 'Production mode enforces 5-minute timeout and strict rate limiting.',
    comp_verified_session: '✓ Verified Session',
    comp_logout: 'Logout',
    comp_site_addr: '📍 Site Address:',
    comp_del_loc: '🚚 Delivery Location:',
    comp_del_date: '📅 Delivery / Required Date:',
    comp_open_maps: 'Open Google Maps Link',
    otp_placeholder: 'Enter 1234',
    verify_otp_btn: 'Verify OTP 1234',
    enable_noti_btn: '🔔 Enable Background Notification',
    no_company_orders: 'No orders yet - Orders will appear here upon submission',
    btn_change_date: '📅 Change Delivery Date - DD/MM/YYYY',
    btn_change_del: '🚚 Change Delivery Location',
    btn_confirm_wa: 'Confirm - WhatsApp',
    btn_dispatch: 'Dispatch - Vehicle En Route',
    btn_delivered: '✅ Delivered',
    comp_auth_gate_title: '🏢 Company Section - Authorized Staff Only',
    comp_auth_gate_desc: 'This section is strictly restricted to E-Buildcon Enterprises management. Regular users cannot access this area.',
    comp_auth_allowed_ids_label: 'Authorized Company Access Channels:',
    comp_auth_id_input_label: 'Enter Company Phone Number or Official Email:',
    comp_auth_id_placeholder: 'e.g. 9819927174 or ebuildconenterprises@gmail.com',
    comp_auth_pin_label: 'Company Security PIN / OTP:',
    comp_auth_err_unauthorized: 'Access Denied: Only company phone numbers (9819927174, 9359162253, 9356709489) or official email (ebuildconenterprises@gmail.com) are permitted.',
    comp_auth_quick_select: 'Quick Select Authorized Account:',
    comp_auth_detected_badge: 'Authorized Company Staff Account Detected!',
    comp_orders_all_title: 'All Order Records & Placed Data',
    comp_orders_all_sub: 'Master registry of all placed customer orders, material breakdown, and direct customer reply tools',
    comp_search_orders: 'Search orders by builder, phone, site, or supervisor...',
    comp_filter_all: 'All Orders',
    comp_filter_pending: 'Pending',
    comp_filter_confirmed: 'Confirmed',
    comp_filter_dispatched: 'Dispatched',
    comp_filter_delivered: 'Delivered',
    comp_stat_total_orders: 'Total Placed Orders',
    comp_stat_total_cbm: 'Total Material (CBM)',
    comp_btn_reply_customer: '💬 Contact / Reply User',
    comp_reply_modal_title: 'Reply to Customer Regarding Order',
    comp_reply_call_party: '📞 Call Customer Directly',
    comp_reply_call_sup: '👷 Call Site Supervisor',
    comp_reply_templates_label: 'Quick Reply Templates:',
    comp_reply_custom_label: 'Edit or Type Custom Response:',
    comp_reply_send_wa_party: '🟢 Send WhatsApp to Customer',
    comp_reply_send_wa_sup: '🔵 Send WhatsApp to Supervisor',
    comp_reply_send_sms: '💬 Send SMS to Customer',
    comp_reply_close: 'Close',
    comp_order_items_heading: 'Ordered Material Details:',
    comp_driver_details_heading: 'Dispatch & Driver Details:',
    comp_party_supervisor_label: 'Site Supervisor:',
    challan_modal_title: '📄 Official Delivery Challan',
    challan_doc_heading: 'MATERIAL DELIVERY CHALLAN & CONSIGNMENT NOTE',
    challan_doc_sub: 'E BUILDCON ENTERPRISES • Direct Factory Dispatch • ISO 9001:2015',
    challan_number_label: 'Challan No.',
    challan_order_ref: 'Order Ref No.',
    challan_booking_date: 'Booking Date',
    challan_consignee_heading: 'Consignee & Builder Details',
    challan_destination_heading: 'Delivery Destination & Site',
    challan_dispatch_heading: 'Vehicle & Transport Details',
    challan_items_heading: 'Supplied Construction Materials',
    challan_terms_heading: 'Delivery & Inspection Terms:',
    challan_sign_dispatcher: 'Authorized Signatory (Factory Dispatch)',
    challan_sign_driver: "Carrier / Driver's Signature",
    challan_sign_receiver: "Consignee / Site Supervisor's Signature & Stamp",
    challan_btn_print: '🖨️ Print / Save PDF Challan',
    challan_btn_share: '📱 Share Slip via WhatsApp',
    challan_btn_view: '📄 View Order Slip / Challan',
    comp_change_status_title: 'Update Order Status:',
    
    cta_direct_badge: 'Direct Factory Dispatch • Rapid Delivery',
    cta_headline: 'Book Your Construction Material Order Today',
    cta_description: 'Enter your shop or builder name, site address, and delivery date for instant dispatch. Immediate WhatsApp notification to 3 numbers!',
    cta_button: 'Open Order Form',
    
    contact_title: '📞 Official Contact & Inquiries',
    contact_subtitle: 'Direct factory contact, fast inquiry, and order coordination',
    contact_direct_wa: 'Direct WhatsApp Chat',
    contact_wa_sub: 'Send message directly via safe HTTPS wa.me',
    contact_view_maps: 'View Directions on Google Maps',
    contact_vasai_city: 'Kaman, Vasai (East) - 401202',
    call_or_wa: 'Call / WhatsApp - 3 Numbers',
    factory_addr: 'Factory / Head Office',
    
    footer_desc: 'Authorized manufacturer and distributor of high-quality AAC Blocks (2" to 9"), ReadyMix Plaster, Block Mortar, and Tile Adhesive.',
    footer_all_rights: 'All rights reserved.',
    footer_vasai_address: 'Kaman, Vasai (E), Dist. Palghar - 401202',
    footer_brochure_link: '📘 Official Brochure (23 Photos)',
    footer_order_link: '📦 Place New Order',
    footer_myorders_link: '📋 My Orders',
    footer_company_link: '🏢 Company Panel',
    footer_quick_links_heading: 'Quick Navigation',
    footer_contacts_heading: 'Official Contact & Policies',
    
    lang_saved: 'Language Changed',
    toast_order_placed: 'Order submitted successfully!',
    toast_order_deleted: 'Order deleted!',
    toast_orders_cleared: 'All orders cleared!',
    toast_product_selected: 'Product selected! Please complete the form.',
    toast_block_applied: 'AAC Block added to order form!',
    toast_status_updated: 'Order status updated',
    toast_date_updated: 'Delivery date updated',
    toast_location_updated: 'Delivery location updated',
    
    wa_send_main_btn: 'Send on WhatsApp',
    wa_send_alternate_label: 'Or send to alternate numbers:',
    order_summary_heading: 'Order Summary',
    wa_copy_btn: 'Copy WhatsApp Message Text',
    wa_copy_success: 'Order message copied to clipboard!',
    factory_dispatch_note: 'Vasai Factory Direct Dispatch',
    date_picker_title: 'Select date',
    date_picker_cancel: 'Cancel',
    date_picker_ok: 'OK',
    date_picker_select_year: 'Select Year',
    date_picker_select_month: 'Select Month',
    comp_notify_party_title: 'Date Changed - Notify Party!',
    comp_old_date_label: 'Old Date',
    comp_new_date_label: 'New Date',
    comp_wa_party_btn: 'WhatsApp Party',
    comp_wa_sup_btn: 'WhatsApp Supervisor',
    comp_sms_party_btn: 'SMS to Party',
    comp_close_btn: 'Close',
    comp_save_btn: 'Save',
    comp_cancel_btn: 'Cancel'
  },
  hi: {
    tab_brochure: '📘 ब्रोशर',
    tab_order: '📦 ऑर्डर',
    tab_myorders: '📋 मेरे ऑर्डर',
    tab_company: '🏢 कंपनी',
    
    tagline: 'Plot No.5/2, Younus Estate, Khandipada Road, Kaman, Vasai (E) - 401202 | ISO 9001:2015 Certified',
    badge_no_personal_email: '✓ कोई पर्सनल Email नहीं (केवल कंपनी Email)',
    badge_no_price: '✓ कोई कीमत नहीं (सिर्फ जानकारी व कोटेशन)',
    badge_safe_wa: '✓ सुरक्षित HTTPS https://wa.me/ - No Error',
    select_lang_label: 'भाषा चुनें:',
    
    // Auth & Sign In
    auth_login_title: 'E-Buildcon में साइन इन करें',
    auth_login_subtitle: 'अपने पंजीकृत मोबाइल नंबर या दुकान के नाम से लॉगिन करें',
    auth_signup_title: 'नया बिल्डर / ग्राहक पंजीकरण',
    auth_signup_subtitle: 'एक बार पंजीकरण करें और अपने साइट विवरण व पिछले सभी ऑर्डर्स हमेशा सुरक्षित रखें',
    auth_tab_login: 'साइन इन (लॉगिन)',
    auth_tab_signup: 'नया पंजीकरण',
    auth_phone_label: 'मोबाइल नंबर *',
    auth_phone_placeholder: 'उदा. 9819927174',
    auth_name_label: 'दुकान / बिल्डर / पार्टी का नाम *',
    auth_name_placeholder: 'उदा. रमेश बिल्डर्स / पाटिल ट्रेडर्स',
    auth_pin_label: 'सुरक्षा पिन / पासवर्ड *',
    auth_pin_placeholder: '4 अंकों का पिन दर्ज करें (उदा. 1234)',
    auth_remember_me: 'इस डिवाइस पर मुझे लॉग इन रखें',
    auth_login_btn: 'साइन इन करें और आगे बढ़ें',
    auth_signup_btn: 'पंजीकरण करें और साइन इन हों',
    auth_demo_login_btn: '👷 त्वरित डेमो लॉगिन (रमेश बिल्डर्स - पिन: 1234)',
    auth_no_account: 'खाता नहीं है? अभी नया पंजीकरण करें',
    auth_has_account: 'पहले से खाता है? साइन इन करें',
    auth_logout_btn: 'लॉगआउट',
    auth_logout_confirm: 'क्या आप वाकई लॉगआउट करना चाहते हैं?',
    auth_welcome_back: 'वापसी पर स्वागत है,',
    auth_stored_info_note: '🔒 आपके विवरण और पिछले सभी ऑर्डर्स इस डिवाइस पर सुरक्षित सहेजे जाते हैं।',
    auth_err_phone_req: 'कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें',
    auth_err_pin_req: 'कृपया अपना 4 अंकों का सुरक्षा पिन दर्ज करें',
    auth_err_name_req: 'कृपया दुकान या बिल्डर का नाम दर्ज करें',
    auth_err_invalid: 'गलत मोबाइल नंबर या सुरक्षा पिन। कृपया जांच कर पुनः प्रयास करें।',
    auth_profile_title: 'मेरा बिल्डर प्रोफ़ाइल',
    auth_default_site_title: 'मेरे डिफ़ॉल्ट साइट विवरण',
    auth_update_profile_btn: 'प्रोफ़ाइल सहेजें',
    auth_profile_updated: 'प्रोफ़ाइल सफलतापूर्वक अपडेट हो गया!',
    auth_confirm_pin_label: 'पिन की पुष्टि करें *',
    auth_confirm_pin_placeholder: '4 अंकों का पिन पुनः दर्ज करें',
    auth_err_pin_mismatch: 'सुरक्षा पिन मेल नहीं खाते! कृपया जांचें।',
    auth_err_user_not_found: 'इस मोबाइल नंबर पर कोई खाता नहीं मिला। कृपया "नया पंजीकरण" टैब से रजिस्टर करें।',
    auth_err_incorrect_pin: 'गलत सुरक्षा पिन! कृपया सही पिन दर्ज करें या सहायता प्राप्त करें।',
    auth_forgot_pin_help: 'पिन भूल गए? सीधे कारखाना प्रबंधक से WhatsApp पर संपर्क करें',
    auth_terms_agreement: 'मैं सीधा कारखाना सप्लाय के लिए अधिकृत ग्राहक/बिल्डर के रूप में पंजीकरण कर रहा हूँ।',
    auth_terms_required: 'पंजीकरण पूरा करने के लिए कृपया नियम व शर्तें चेकबॉक्स चुनें।',
    
    hero_title: 'गुणवत्तापूर्ण निर्माण सामग्री के विश्वसनीय आपूर्तिकर्ता',
    hero_subtitle: 'ISO 9001:2015 प्रमाणित AAC ब्लॉक्स (2" से 9"), ReadyMix Plaster, Block Mortar और Tile Adhesive। 100% अपनी गाड़ियों द्वारा त्वरित डिलीवरी।',
    hero_cta_order: '📦 नया ऑर्डर डालें',
    hero_cta_products: '🏗️ हमारे प्रोडक्ट्स देखें',
    hero_cta_brochure: '📘 ब्रोशर देखें (23 फोटो)',
    quick_wa_quote: 'WhatsApp पर संपर्क करें',
    hero_badge_kaman: 'ISO 9001:2015 प्रमाणित • कामण, वसई (पूर्व) सीधा कारखाना सप्लाय',
    hero_feat_sizes: 'सभी 8 Sizes (2" से 9")',
    hero_feat_fleet: '100% अपनी गाड़ियां',
    hero_feat_plaster: 'क्रैक-फ्री ReadyMix',
    hero_direct_inquiry: 'सीधा संपर्क व पूछताछ',
    hero_card_desc: 'कंक्रीट उत्पाद, रेडीमिक्स प्लास्टर और टाइल एडहेसिव सप्लाय',
    hero_official_email: 'कंपनी आधिकारिक Email:',
    hero_direct_phone: 'सीधा फोन संपर्क:',
    
    why_choose_tag: 'ई-बिल्डकॉन क्यों चुनें?',
    why_choose_title: 'हमारी ताकत और गुणवत्ता का भरोसा (Why Choose Us)',
    why_points: [
      {
        title: 'ISO 9001:2015 प्रमाणित गुणवत्ता',
        desc: 'कठोर गुणवत्ता निरीक्षण और अंतर्राष्ट्रीय मानकों के अनुसार उत्पादन प्रक्रिया।',
        badge: 'Certified'
      },
      {
        title: '100% अपनी गाड़ियों का बेड़ा (Own Fleet)',
        desc: 'टेम्पो 1.5 टन से 22 टन हेवी ट्रक तक 4 प्रकार की अपनी गाड़ियां। समय पर सुरक्षित डिलीवरी।',
        badge: '4 Owned Vehicles'
      },
      {
        title: 'कामण, वसई सीधा कारखाना सप्लाय',
        desc: 'यूनुस एस्टेट, खंडीपाड़ा रोड, कामण से सीधे साइट पर माल रवाना। कोई बिचौलिया नहीं।',
        badge: 'Direct Dispatch'
      },
      {
        title: 'सभी मानक Sizes (2" से 9")',
        desc: '2", 3", 4", 5", 6", 8", 9" AAC ब्लॉक्स की पूरी रेंज और सटीक CBM माप।',
        badge: 'मानक Sizes'
      },
      {
        title: 'क्रैक-फ्री रेडीमिक्स प्लास्टर व मॉर्टर',
        desc: 'उच्च सामर्थ्य, वाटरप्रूफ गुण और पारंपरिक सीमेंट-रेत से तेज व मजबूत प्लास्टर।',
        badge: 'Crack-Free'
      },
      {
        title: 'पारदर्शी सीधा संपर्क व सुरक्षित व्यवस्था',
        desc: 'सीधे WhatsApp पर ऑर्डर सूचना, अधिकृत कंपनी ईमेल और सुरक्षित प्रक्रिया।',
        badge: 'Safe wa.me'
      }
    ],
    
    prod_title: '🏗️ हमारे प्रोडक्ट्स - सिर्फ जानकारी - कोई कीमत नहीं',
    prod_subtitle: 'साइट पर कोई कीमत नहीं - केवल तकनीकी जानकारी, साइज और कवरेज विवरण',
    no_price_badge: '✓ No Price Anywhere - सिर्फ जानकारी',
    view_details: 'विवरण देखें',
    add_to_order_action: 'ऑर्डर में जोड़ें',
    coverage_label: 'कवरेज / माप:',
    modal_packing_size: 'पैकिंग / आकार',
    modal_coverage: 'कवरेज (Coverage)',
    modal_key_features: 'प्रमुख विशेषताएं व गुण',
    modal_add_to_order: 'ऑर्डर फॉर्म में जोड़ें',
    modal_close: 'बंद करें',
    
    size_title: '📊 AAC Block Size Chart - 2" से 9" - मानक Sizes - कोई कीमत नहीं',
    size_subtitle: 'कोई कीमत नहीं - कोई Rs. नहीं - कोई ₹ नहीं - केवल साइज और नग / CBM',
    calc_title: '📐 इंटरैक्टिव AAC Block CBM कैलकुलेटर',
    calc_subtitle: 'ब्लॉक साइज और मात्रा दर्ज कर तुरंत CBM और अनुशंसित गाड़ी देखें',
    calc_accurate_badge: '✓ तुरंत सटीक गणना',
    calc_label_size: 'ब्लॉक साइज चुनें (इंच)',
    calc_label_qty: 'मात्रा (नग) दर्ज करें',
    calc_res_cbm: 'कुल अनुमानित CBM:',
    calc_res_rec_vehicle: 'अनुशंसित वाहन:',
    calc_add_to_cart: 'इस गणना को ऑर्डर फॉर्म में जोड़ें',
    calc_selected_size: 'चुना गया साइज:',
    calc_pcs_unit: 'नग',
    calc_inch_unit: 'इंच',
    calc_action_select: 'ऑर्डर के लिए चुनें',
    calc_rec_vehicle_label: 'अनुशंसित गाड़ी:',
    calc_7_inch_badge: '',
    calc_action_col: 'कार्रवाई',
    weight_col_note: 'कोई वजन नहीं - सिर्फ नग',
    pcs_per_cbm: 'नग / 1 CBM',
    
    vehicle_title: '🚚 उपलब्ध गाड़ियां - सभी हमारी - 4 गाड़ियां',
    vehicle_subtitle: 'सभी गाड़ियां 100% हमारी अपनी हैं - क्षमता CBM और टन में',
    vehicle_owned_badge: '✓ 100% अपनी गाड़ियां',
    vehicle_capacity_label: 'क्षमता:',
    vehicle_fleet_footer: '✓ सीधे कारखाने से त्वरित पहुंच • बिना बिचौलियों के अपना लॉजिस्टिक्स नेटवर्क',
    
    brochure_header_title: '📄 आधिकारिक उत्पाद विवरणिका (Brochure PDF व Gallery)',
    brochure_header_sub: '12 पृष्ठ • 23 फोटो • ब्राउज़र में पूरा ब्रोशर उपलब्ध',
    brochure_tab_book: 'पृष्ठानुसार (Page View)',
    brochure_tab_gallery: 'सभी 23 फोटो (All 23)',
    brochure_download_btn: 'डाउनलोड',
    brochure_prev_btn: 'पिछला पृष्ठ',
    brochure_next_btn: 'अगला पृष्ठ',
    brochure_page_label: 'पृष्ठ',
    brochure_all_photos_note: '✓ कैटलॉग के सभी 23 उच्च-रिज़ॉल्यूशन चित्र नीचे दिए गए हैं:',
    brochure_total_photos: 'कुल 23 फोटो',
    
    order_title: '📦 नया ऑर्डर डालें - सब Fix - Notification जाएगा!',
    order_subtitle: 'Location Optional - आवश्यक तारीख Required - https://wa.me/ - कोई Error नहीं!',
    order_sec_customer: 'ग्राहक व साइट विवरण (Customer & Site Details)',
    order_sec_delivery: 'डिलीवरी लोकेशन व GPS नक़्शा (Delivery Location & GPS)',
    shop_label: 'दुकान / बिल्डर का नाम * - सबसे ऊपर',
    shop_placeholder: 'दुकान / बिल्डर का नाम - उदा. रमेश बिल्डर्स / पाटिल ट्रेडर्स',
    sup_name_label: '👷 साइट सुपरवाइजर का नाम *',
    sup_name_placeholder: 'सुपरवाइजर नाम - उदा. सुनील',
    sup_phone_label: '📱 सुपरवाइजर मोबाइल नंबर *',
    sup_phone_placeholder: 'सुपरवाइजर मोबाइल - उदा. 9876543210',
    phone_label: 'फोन नंबर *',
    phone_placeholder: 'उदा. 7798820534',
    site_label: 'साइट का पता *',
    site_placeholder: 'उदा. नालासोपारा वेस्ट',
    del_loc_label: 'Delivery Location (Optional) - इसके बिना भी ऑर्डर स्वीकार होगा',
    del_loc_placeholder: 'उदा. Nalasopara (Optional)',
    maps_link_label: 'Google Maps Link (Optional) - GPS बटन से शेयर करें',
    maps_link_placeholder: 'https://maps.google.com/... (शेयर करने पर अपने आप आएगा)',
    loc_option_title: 'डिलीवरी लोकेशन का विकल्प चुनें:',
    loc_opt_manual_title: 'विकल्प १: पता मैन्युअल दर्ज करें',
    loc_opt_manual_desc: 'साइट का स्थान, लैंडमार्क या क्षेत्र लिखें',
    loc_opt_gps_title: 'विकल्प २: Google Maps / GPS से प्राप्त करें',
    loc_opt_gps_desc: 'लाइव स्थान का नाम और Google Maps लिंक अपने आप मिलेगा',
    loc_manual_tip: '💡 आप कोई भी लैंडमार्क, साइट का पता या सड़क का नाम लिख सकते हैं। Google Maps लिंक देना वैकल्पिक है।',
    loc_gps_detected_place: 'प्राप्त स्थान का नाम:',
    loc_gps_refetch_btn: '🔄 स्थान पुनः प्राप्त करें (Refresh)',
    loc_gps_status_idle: 'GPS द्वारा लाइव स्थान और जगह का नाम प्राप्त करने के लिए नीचे दिया गया बटन दबाएं।',
    gps_fetching_place: '⏳ GPS खोज रहा है और जगह का नाम प्राप्त हो रहा है... (कृपया प्रतीक्षा करें)',
    gps_not_supported: '❌ इस ब्राउज़र में Geolocation समर्थित नहीं है। कृपया Chrome या Edge का उपयोग करें।',
    share_gps_btn: '📍 Share Current Location - चालू करें - GPS + Maps - क्लिक करें',
    gps_fetching: '⏳ लोकेशन प्राप्त हो रही है... 10 सेकंड प्रतीक्षा करें...',
    gps_success: '✅ लोकेशन मिल गई! Delivery Location में Auto Fill हो गया।',
    gps_denied: '❌ Permission Denied - ब्राउज़र सेटिंग्स में Location Allow करें।',
    gps_off: '❌ GPS Off - मोबाइल में GPS और इंटरनेट चालू करें।',
    gps_timeout: '❌ Timeout - कृपया खुले आसमान में जाएं और पुनः प्रयास करें।',
    order_view_on_maps: 'Google Maps पर देखें',
    date_label: '📅 चाहिए तारीख / माल कब चाहिए? * Required *',
    date_placeholder: 'DD/MM/YYYY - उदा. 09/09/2026',
    order_date_note: 'नोट: तारीख DD/MM/YYYY प्रारूप में रखें (उदा. 09/09/2026)।',
    
    item_add_title: 'Item Add करें - सभी Products - Block + Plaster + Mortar + Adhesive',
    add_item_btn: '➕ Add Item - Product Add करें - Total:',
    place_order_btn: '✅ ऑर्डर भेजें - सीधे WhatsApp पर भेजें',
    calc_info_block: '3" 800 नग = 7.20 CBM - केमिकल Auto नहीं - चाहिए तो Block Mortar अलग से Add करें',
    calc_info_plaster: 'ReadyMix Plaster - Bag डालें - 40kg',
    calc_info_mortar: 'Block Mortar - केमिकल - चाहिए तो अलग से Add करें - Optional',
    calc_info_adhesive: 'Tile Adhesive - Bag डालें - 20kg / 40kg',
    total_label: 'Total - CBM + Bags',
    no_item: 'अभी कोई Item नहीं - Product चुनें - Add करें - 3" 800 नग = CBM - केमिकल अलग से',
    block_opt: '🧱 AAC Block - 2" से 9" - नग / CBM - केमिकल नहीं',
    plaster_opt: '🏗️ ReadyMix Plaster - 40kg Bag',
    mortar_opt: '🧱 Block Mortar / Jointing Motor - 40kg Bag - Optional - अलग से',
    adhesive_opt: '🏠 Tile Adhesive - 20kg & 40kg Bag',
    order_items_col_separate: 'अलग से',
    order_location_optional_note: 'लोकेशन न होने पर भी ऑर्डर स्वीकार होगा (Optional) - आवश्यक तारीख अनिवार्य है - सुरक्षित https://wa.me/ द्वारा सीधा संपर्क!',
    
    wa_order_success_title: '🎉 ऑर्डर दर्ज हुई और WhatsApp कनेक्ट हुआ!',
    wa_order_success_desc: 'आपकी ऑर्डर E-Buildcon डिस्पैच टीम को भेजने के लिए WhatsApp खुल गया है। यदि न खुले तो नीचे दिया बटन दबाएं।',
    order_summary_customer: 'दुकान / बिल्डर:',
    order_summary_supervisor: 'सुपरवाइजर:',
    order_summary_material: 'ऑर्डर सामग्री:',
    order_summary_req_date: 'चाहिए तारीख:',
    order_summary_site: 'साइट:',
    order_wa_send_prefix: 'को WhatsApp भेजें (Send)',
    close_view_my_orders: 'बंद करें - My Orders देखें',
    
    myorders_title: '📋 मेरे ऑर्डर्स - Browser बंद होने पर भी Save रहेगा',
    myorders_subtitle: 'आपके द्वारा किए गए सभी ऑर्डर्स की सूची',
    myorders_count_label: 'ऑर्डर्स दर्ज',
    myorders_clear_all: 'सभी हटाएं',
    myorders_new_order_btn: '+ नया ऑर्डर',
    myorders_filter_status: 'सभी स्थितियां (All Status)',
    myorders_status_pending: 'Pending (लंबित)',
    myorders_status_confirmed: 'Confirmed (स्वीकृत)',
    myorders_status_dispatched: 'Dispatched (गाड़ी रवाना)',
    myorders_status_delivered: 'Delivered (वितरित)',
    myorders_req_date_label: 'चाहिए तारीख:',
    myorders_site_label: 'साइट का पता:',
    myorders_del_loc_label: 'डिलीवरी लोकेशन:',
    myorders_view_maps: 'Google Maps पर लोकेशन देखें',
    myorders_items_breakdown: 'सामग्री विवरण:',
    myorders_resend_wa_btn: 'WhatsApp विवरण पुनः भेजें',
    myorders_close_btn: 'बंद करें',
    myorders_no_result: 'कोई मेल खाने वाला ऑर्डर नहीं मिला। अन्य खोज शब्द आज़माएं।',
    no_orders_yet: 'अभी कोई ऑर्डर नहीं है - Order टैब से दर्ज करें - लोकेशन वैकल्पिक है',
    search_orders_placeholder: 'बिल्डर नाम या फोन नंबर से खोजें...',
    
    company_title: '🏢 सभी ऑर्डर्स - Company Panel - OTP Verified',
    company_login_title: '🏢 कंपनी Panel - OTP 1234',
    company_login_sub: 'सिर्फ कंपनी Email: ebuildconenterprises@gmail.com - कोई पर्सनल Email नहीं',
    comp_mode_demo: 'डेमो मोड (OTP 1234)',
    comp_mode_prod: 'सुरक्षित मोड (Production)',
    comp_demo_hint: 'डेमो एक्सेस कोड: 1234',
    comp_prod_hint: 'कंपनी सुरक्षा कोड दर्ज करें:',
    comp_verify_secure: 'सुरक्षित लॉगिन (Verify)',
    comp_auth_system: 'सुरक्षित प्रमाणीकरण प्रणाली',
    comp_auth_demo_desc: 'डेमो मोड मूल्यांकन के लिए है। सत्र सुरक्षित रूप से sessionStorage में संग्रहीत होता है।',
    comp_auth_prod_desc: 'प्रोडक्शन मोड में 5 मिनट का टाइमआउट और सख्त दर-सीमा लागू होती है।',
    comp_verified_session: '✓ Verified Session',
    comp_logout: 'लॉगआउट',
    comp_site_addr: '📍 साइट पता:',
    comp_del_loc: '🚚 डिलीवरी लोकेशन:',
    comp_del_date: '📅 Delivery तारीख:',
    comp_open_maps: 'Google Maps लिंक खोलें',
    otp_placeholder: '1234 दर्ज करें',
    verify_otp_btn: 'Verify OTP 1234',
    enable_noti_btn: '🔔 Enable Background Notification',
    no_company_orders: 'कोई ऑर्डर नहीं मिला - नया ऑर्डर दर्ज होने पर यहां दिखेगा',
    btn_change_date: '📅 Delivery तारीख बदलें - DD/MM/YYYY',
    btn_change_del: '🚚 Delivery Location बदलें',
    btn_confirm_wa: 'Confirm - WhatsApp',
    btn_dispatch: 'Dispatch - गाड़ी निकल गई',
    btn_delivered: '✅ Delivered',
    comp_auth_gate_title: '🏢 कंपनी अनुभाग - केवल अधिकृत कर्मचारियों के लिए',
    comp_auth_gate_desc: 'यह अनुभाग केवल E-Buildcon Enterprises के अधिकृत प्रबंधन के लिए आरक्षित है। अन्य कोई भी उपयोगकर्ता इसे एक्सेस नहीं कर सकता।',
    comp_auth_allowed_ids_label: 'प्रवेश के लिए अधिकृत संपर्क (Authorized Contacts):',
    comp_auth_id_input_label: 'कंपनी फोन नंबर या कंपनी ईमेल दर्ज करें:',
    comp_auth_id_placeholder: 'उदा. 9819927174 या ebuildconenterprises@gmail.com',
    comp_auth_pin_label: 'कंपनी सुरक्षा पिन / OTP:',
    comp_auth_err_unauthorized: 'प्रवेश अस्वीकृत! केवल 9819927174 / 9359162253 / 9356709489 या ebuildconenterprises@gmail.com ही अधिकृत हैं।',
    comp_auth_quick_select: 'त्वरित अधिकृत खाता चुनें:',
    comp_auth_detected_badge: 'अधिकृत कंपनी कर्मचारी खाता पहचाना गया!',
    comp_orders_all_title: 'सभी ऑर्डर रिकॉर्ड्स और विवरण',
    comp_orders_all_sub: 'दर्ज सभी ऑर्डर्स का विस्तृत डेटा, सामग्री विवरण और सीधा ग्राहक संवाद प्रणाली',
    comp_search_orders: 'ऑर्डर, ग्राहक, फोन या साइट पता खोजें...',
    comp_filter_all: 'सभी ऑर्डर्स',
    comp_filter_pending: 'लंबित (Pending)',
    comp_filter_confirmed: 'कन्फर्म (Confirmed)',
    comp_filter_dispatched: 'गाड़ी रवाना (Dispatched)',
    comp_filter_delivered: 'डिलीवर हो गया (Delivered)',
    comp_stat_total_orders: 'कुल दर्ज ऑर्डर्स',
    comp_stat_total_cbm: 'कुल माप (CBM)',
    comp_btn_reply_customer: '💬 ग्राहक को उत्तर / संपर्क',
    comp_reply_modal_title: 'ग्राहक से संपर्क और ऑर्डर संबंधी उत्तर',
    comp_reply_call_party: '📞 ग्राहक को सीधा कॉल करें',
    comp_reply_call_sup: '👷 साइट सुपरवाइजर को कॉल करें',
    comp_reply_templates_label: 'त्वरित संदेश विकल्प (Quick Reply Templates):',
    comp_reply_custom_label: 'संदेश संपादित करें या नया टाइप करें:',
    comp_reply_send_wa_party: '🟢 ग्राहक को WhatsApp उत्तर भेजें',
    comp_reply_send_wa_sup: '🔵 सुपरवाइजर को WhatsApp उत्तर भेजें',
    comp_reply_send_sms: '💬 ग्राहक को SMS भेजें',
    comp_reply_close: 'बंद करें',
    comp_order_items_heading: 'ऑर्डर की गई सामग्री (आइटम विवरण):',
    comp_driver_details_heading: 'डिस्पैच व ड्राइवर विवरण:',
    comp_party_supervisor_label: 'साइट सुपरवाइजर:',
    challan_modal_title: '📄 आधिकारिक डिलीवरी चालान (Delivery Challan)',
    challan_doc_heading: 'सामग्री डिलीवरी चालान व रसीद (DELIVERY CHALLAN)',
    challan_doc_sub: 'ई-बिल्डकॉन एंटरप्राइजेज • सीधा कारखाना डिस्पैच • ISO 9001:2015',
    challan_number_label: 'चालान क्र.',
    challan_order_ref: 'ऑर्डर संदर्भ क्र.',
    challan_booking_date: 'बुकिंग तारीख',
    challan_consignee_heading: 'ग्राहक व साइट विवरण (Consignee Details)',
    challan_destination_heading: 'डिलीवरी स्थान व साइट (Delivery Destination)',
    challan_dispatch_heading: 'वाहन व ड्राइवर विवरण (Transport Details)',
    challan_items_heading: 'सप्लाई की गई सामग्री (Item Breakdown)',
    challan_terms_heading: 'डिलीवरी नियम व शर्तें (Standard Terms):',
    challan_sign_dispatcher: 'अधिकृत हस्ताक्षर (कारखाना डिस्पैच)',
    challan_sign_driver: 'माल वाहक / ड्राइवर के हस्ताक्षर',
    challan_sign_receiver: 'ग्राहक / सुपरवाइजर हस्ताक्षर व मुहर',
    challan_btn_print: '🖨️ प्रिंट / PDF सेव करें',
    challan_btn_share: '📱 WhatsApp पर चालान भेजें',
    challan_btn_view: '📄 चालान / रसीद देखें',
    comp_change_status_title: 'ऑर्डर स्थिति बदलें:',
    
    cta_direct_badge: 'सीधा कारखाना सप्लाय • त्वरित डिलीवरी',
    cta_headline: 'अपने निर्माण के लिए तुरंत ऑर्डर दर्ज करें',
    cta_description: 'दुकान या बिल्डर का नाम, साइट पता और आवश्यक तारीख चुनकर तुरंत ऑर्डर करें। सीधे 3 नंबरों पर WhatsApp सूचना!',
    cta_button: 'ऑर्डर फॉर्म खोलें',
    
    contact_title: '📞 अधिकृत संपर्क विवरण (Official Contact)',
    contact_subtitle: 'सीधा कारखाना संपर्क, त्वरित पूछताछ और ऑर्डर समन्वय',
    contact_direct_wa: 'सीधा WhatsApp संवाद (Direct Chat)',
    contact_wa_sub: 'सुरक्षित HTTPS wa.me से तुरंत संदेश भेजें',
    contact_view_maps: 'Google Maps पर दिशा देखें',
    contact_vasai_city: 'कामण, वसई (पूर्व) - 401202',
    call_or_wa: 'Call / WhatsApp - 3 Numbers',
    factory_addr: 'कारखाना / मुख्य कार्यालय',
    
    footer_desc: 'उच्च गुणवत्ता वाले AAC ब्लॉक्स (2" से 9"), ReadyMix Plaster, Block Mortar और Tile Adhesive के अधिकृत निर्माता एवं वितरक।',
    footer_all_rights: 'सर्वाधिकार सुरक्षित।',
    footer_vasai_address: 'कामण, वसई (पूर्व), जिला पालघर - 401202',
    footer_brochure_link: '📘 आधिकारिक ब्रोशर (23 Photos)',
    footer_order_link: '📦 नया ऑर्डर डालें (New Order)',
    footer_myorders_link: '📋 मेरे ऑर्डर्स (My Orders)',
    footer_company_link: '🏢 कंपनी पैनल (Company Panel)',
    footer_quick_links_heading: 'त्वरित नेविगेशन',
    footer_contacts_heading: 'आधिकारिक संपर्क व नीतियां',
    
    lang_saved: 'भाषा बदली गई',
    toast_order_placed: 'ऑर्डर सफलतापूर्वक दर्ज हो गया!',
    toast_order_deleted: 'ऑर्डर हटा दिया गया!',
    toast_orders_cleared: 'सभी ऑर्डर्स साफ़ कर दिए गए!',
    toast_product_selected: 'उत्पाद चुना गया! कृपया फॉर्म पूरा करें।',
    toast_block_applied: 'AAC Block ऑर्डर फॉर्म में चुना गया!',
    toast_status_updated: 'ऑर्डर स्थिति अपडेट की गई',
    toast_date_updated: 'डिलीवरी तारीख अपडेट की गई',
    toast_location_updated: 'डिलीवरी लोकेशन अपडेट की गई',
    
    wa_send_main_btn: 'WhatsApp पर भेजें',
    wa_send_alternate_label: 'या वैकल्पिक नंबर पर भेजें:',
    order_summary_heading: 'ऑर्डर सारांश',
    wa_copy_btn: 'व्हाट्सएप मेसेज कॉपी करें',
    wa_copy_success: 'ऑर्डर मेसेज कॉपी हो गया!',
    factory_dispatch_note: 'वसई फ़ैक्टरी सीधा डिस्पैच',
    date_picker_title: 'तारीख चुनें',
    date_picker_cancel: 'रद्द करें',
    date_picker_ok: 'ठीक है',
    date_picker_select_year: 'वर्ष चुनें',
    date_picker_select_month: 'महीना चुनें',
    comp_notify_party_title: 'तारीख बदली - पार्टी को सूचित करें!',
    comp_old_date_label: 'पुरानी तारीख',
    comp_new_date_label: 'नई तारीख',
    comp_wa_party_btn: 'पार्टी को WhatsApp भेजें',
    comp_wa_sup_btn: 'सुपरवाइजर को WhatsApp भेजें',
    comp_sms_party_btn: 'पार्टी को SMS भेजें',
    comp_close_btn: 'बंद करें',
    comp_save_btn: 'सेव करें',
    comp_cancel_btn: 'रद्द करें'
  }
};
