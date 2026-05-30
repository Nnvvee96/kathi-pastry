/* ============================================================
   Katie's Pastry — app logic
   products · cart · DE/EN · mobile nav · forms · reveal
   ============================================================ */
(function () {
  'use strict';

  var EUR = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
  var tintHex = {
    berry: '#F6E2E8', caramel: '#F7E9D2', pist: '#EAEFDD', sand: '#EAD9BF'
  };

  // Stock placeholder photos (Unsplash). Users can drag-drop their own onto
  // any tile to replace these — the drop persists.
  var SFX = '?auto=format&fit=crop&w=800&q=72';
  var U = 'https://images.unsplash.com/photo-';
  var IMG = {
    cheesecake:  U + '1524351199678-941a58a3df50' + SFX,
    fruchtmousse:U + '1488477181946-6428a0291777' + SFX,
    cassis:      U + '1565958011703-44f9829ba187' + SFX,
    brownie:     U + '1606313564200-e75d5e30476c' + SFX,
    cinnamon:    U + '1509365465985-25d11c17e812' + SFX,
    macarons:    U + '1558326567-98ae2405596b' + SFX,
    cookie:      U + '1499636136210-6f4ee915583e' + SFX,
    popcorn:     U + '1578849278619-e73505e9610f' + SFX,
    ganzetorte:  U + '1535254973040-607b474cb50d' + SFX,
    kaffee:      U + '1559056199-641a0ac8b55e' + SFX,
    cupcake:     U + '1612203985729-70726954388c' + SFX,
    cakepop:     U + '1564355808539-22fda35bed7e' + SFX
  };

  // Seasonal "fresh this week" ticker items (early-summer rotation)
  var FRESH = {
    de: ['Erdbeer-Cheesecake', 'Rhabarber-Streusel', 'Cassis-Torte', 'Pistazien-Macarons', 'Cold Brew', 'Zitronentarte', 'Holunder-Limonade', 'Cinnamon Buns'],
    en: ['Strawberry Cheesecake', 'Rhubarb Streusel', 'Cassis Cake', 'Pistachio Macarons', 'Cold Brew', 'Lemon Tart', 'Elderflower Lemonade', 'Cinnamon Buns']
  };

  /* ---------- PRODUCTS ---------- */
  var PRODUCTS = [
    { id: 'cheesecake', cat: 'stuecke', price: 4.20, tint: 'caramel', tag: 'fav',
      de: { n: 'American Cheesecake', d: 'Der Publikumsliebling — cremig und „süß, aber nicht zu süß".', u: 'pro Stück' },
      en: { n: 'American Cheesecake', d: 'The crowd favourite — creamy and "sweet, but not too sweet".', u: 'per slice' } },
    { id: 'fruchtmousse', cat: 'stuecke', price: 4.50, tint: 'berry',
      de: { n: 'Fruchtmousse-Torte', d: 'Leichte Mousse auf fluffigem Boden, mit frischen Früchten.', u: 'pro Stück' },
      en: { n: 'Fruit Mousse Cake', d: 'Light mousse on a fluffy base, topped with fresh fruit.', u: 'per slice' } },
    { id: 'cassis', cat: 'stuecke', price: 4.50, tint: 'berry',
      de: { n: 'Cassis-Torte', d: 'Schwarze Johannisbeere trifft zarte Sahne.', u: 'pro Stück' },
      en: { n: 'Cassis Cake', d: 'Blackcurrant meets delicate cream.', u: 'per slice' } },
    { id: 'brownie', cat: 'kleingebaeck', price: 3.20, tint: 'caramel', tag: 'veg',
      de: { n: 'Schoko-Brownie', d: 'Saftig, dicht, ehrlich amerikanisch. Auch vegan möglich.', u: 'pro Stück' },
      en: { n: 'Chocolate Brownie', d: 'Moist, dense, honestly American. Vegan option available.', u: 'each' } },
    { id: 'cinnamon', cat: 'kleingebaeck', price: 3.80, tint: 'caramel', tag: 'new',
      de: { n: 'Cinnamon Bun', d: 'Warme Zimtschnecke nach Familienrezept.', u: 'pro Stück' },
      en: { n: 'Cinnamon Bun', d: 'Warm cinnamon roll from a family recipe.', u: 'each' } },
    { id: 'macarons', cat: 'macarons', price: 9.90, tint: 'pist',
      de: { n: 'Macarons · 6er-Box', d: 'Sechs Sorten in zarten Farben — handgefertigt.', u: '6 Stück' },
      en: { n: 'Macarons · box of 6', d: 'Six flavours in soft hues — handmade.', u: '6 pieces' } },
    { id: 'cakepop', cat: 'kleingebaeck', price: 2.50, tint: 'berry',
      de: { n: 'Cake Pop', d: 'Kleiner Happen am Stiel, große Freude.', u: 'pro Stück' },
      en: { n: 'Cake Pop', d: 'A little bite on a stick, a lot of joy.', u: 'each' } },
    { id: 'cookie', cat: 'kleingebaeck', price: 2.80, tint: 'caramel',
      de: { n: 'Triple-Choc Cookie', d: 'Knusprig außen, weich im Kern.', u: 'pro Stück' },
      en: { n: 'Triple-Choc Cookie', d: 'Crisp outside, soft at the centre.', u: 'each' } },
    { id: 'popcorn', cat: 'kleingebaeck', price: 4.50, tint: 'caramel',
      de: { n: 'Karamell-Popcorn', d: 'Hausgemacht, frisch karamellisiert.', u: 'pro Tüte' },
      en: { n: 'Caramel Popcorn', d: 'Homemade, freshly caramelised.', u: 'per bag' } },
    { id: 'ganzetorte', cat: 'torten', price: 38.00, tint: 'sand',
      de: { n: 'Cheesecake — ganze Torte', d: 'Ca. 12 Stücke. Ideal zum Vorbestellen.', u: 'ganze Torte' },
      en: { n: 'Cheesecake — whole cake', d: 'About 12 slices. Perfect to pre-order.', u: 'whole cake' } },
    { id: 'kaffee', cat: 'kaffee', price: 9.50, tint: 'sand',
      de: { n: 'Kaffee — Hausröstung', d: 'Eigens für uns geröstet. 250 g, Bohne oder gemahlen.', u: '250 g' },
      en: { n: 'Coffee — house roast', d: 'Roasted just for us. 250 g, beans or ground.', u: '250 g' } },
    { id: 'cupcake', cat: 'kleingebaeck', price: 3.20, tint: 'berry',
      de: { n: 'Cupcake', d: 'Mit Buttercreme-Haube, wechselnde Sorten.', u: 'pro Stück' },
      en: { n: 'Cupcake', d: 'Crowned with buttercream, rotating flavours.', u: 'each' } }
  ];

  /* ---------- I18N ---------- */
  var I18N = {
    de: {
      hours_wuls: 'Mo–So 12–18 Uhr', hours_deich: 'Mi–So 12–17 Uhr',
      nav_sortiment: 'Sortiment', nav_shop: 'Online bestellen', nav_torten: 'Motivtorten',
      nav_about: 'Über uns', nav_cafes: 'Cafés', nav_kontakt: 'Kontakt',
      hero_eyebrow: 'Konditorei & Café · Bremerhaven',
      hero_h1a: 'Süß,', hero_h1b: 'aber nicht zu süß.',
      hero_lede: 'Echtes Handwerk, echter Geschmack. Handgemachte Torten, Macarons und amerikanische Klassiker — täglich frisch aus unserer Backstube in Wulsdorf.',
      cta_order: 'Online bestellen', cta_visit: 'Café besuchen',
      hero_m_since: 'Seit', hero_m_cafes: 'Zwei Cafés', hero_m_deich: '+ Am Deich',
      hero_m_made: 'Hausgemacht', hero_m_made_v: 'Eigene Backstube & Röstung',
      band_1: 'Amerikanischer Gedanke, deutsche Machart', band_2: 'American Cheesecake',
      band_3: 'Macarons', band_4: 'Naked Cakes', band_5: 'Kaffee aus eigener Röstung',
      band_1b: 'Amerikanischer Gedanke, deutsche Machart', band_2b: 'American Cheesecake',
      band_3b: 'Macarons', band_4b: 'Naked Cakes', band_5b: 'Kaffee aus eigener Röstung',
      usp1_h: 'Täglich frisch gebacken', usp1_p: 'Nach traditionellem Konditorhandwerk — mit besten Zutaten, in unserer eigenen Backstube.',
      usp2_h: 'Eigene Kaffeerösung', usp2_p: 'Speziell für uns geröstet. Im Café genießen oder abgepackt mit nach Hause nehmen.',
      usp3_h: 'Torten für jeden Anlass', usp3_p: 'Hochzeit, Taufe, Geburtstag — individuell dekoriert und gerne mehrstöckig.',
      sort_eyebrow: 'Unser Sortiment', sort_h: 'Von der Konditorei bis zur amerikanischen Backstube',
      sort_p: 'Deutsche Konditortradition trifft amerikanische Klassiker. Ein Streifzug durch das, was bei uns in der Vitrine liegt.',
      cat_stuecke: 'Tortenstücke', cat_stuecke_c: 'Cheesecake · Fruchtmousse · Cassis',
      cat_macarons: 'Macarons', cat_macarons_c: 'Handgefertigt, in zarten Farben',
      cat_klein: 'Kleingebäck', cat_klein_c: 'Brownies · Cookies · Cinnamon Buns',
      cat_torten: 'Motivtorten', cat_torten_c: 'Hochzeit · Taufe · Geburtstag',
      shop_eyebrow: 'Online bestellen', shop_h: 'Vorbestellen & abholen',
      shop_p: 'Leg dir deine Lieblinge in den Warenkorb und hol sie frisch in Wulsdorf oder am Deich ab.',
      chip_alle: 'Alles', chip_stuecke: 'Tortenstücke', chip_torten: 'Ganze Torten',
      chip_macarons: 'Macarons', chip_klein: 'Kleingebäck', chip_kaffee: 'Kaffee',
      shop_demonote: 'Demo-Shop — kein echter Bezahlvorgang',
      sig_eyebrow: 'Publikumsliebling', sig_h: 'Der American Cheesecake',
      sig_p: 'Cremig, dicht, mit der perfekten Balance — genau das „süß, aber nicht zu süß", für das man immer wiederkommt. Daneben locken Fruchtmousse-Torte, Cassis und der Schokoholic-Eisbecher.',
      sig_l1b: 'Frisch aus der Vitrine', sig_l1p: 'Stückweise im Café oder zum Mitnehmen.',
      sig_l2b: 'Ganze Torten vorbestellbar', sig_l2p: 'Für die Kaffeetafel oder den nächsten Besuch.',
      sig_cta: 'Jetzt probieren',
      trio_eyebrow: 'Hausgemacht & beliebt', trio_h: 'Drei, die man probiert haben muss',
      trio1_h: 'Fruchtmousse-Torte', trio1_p: 'Leichte Mousse auf fluffigem Boden, mit frischen Früchten und Blüten dekoriert.',
      trio2_h: 'Cinnamon Buns', trio2_p: 'Warme Zimtschnecken, Brownies, Cookies und Cake Pops — die amerikanische Ecke.',
      trio3_h: 'Macarons', trio3_p: 'Sechs Sorten in zarten Farben — die feine französische Seite des Hauses.',
      wed_eyebrow: 'Motiv- & Hochzeitstorten', wed_h: 'Ein Highlight für Ihre Feier',
      wed_p: 'Von der mehrstöckigen Hochzeitstorte bis zur individuellen Motivtorte. Katies Lieblinge sind „Naked Cakes" — mit sichtbaren Böden, frischen Früchten und bunten Blüten.',
      wed_l1b: 'Individuell gestaltet', wed_l1p: 'Hochzeit, Taufe, Geburtstag oder Firmenfeier.',
      wed_l2b: 'Frühzeitig anfragen', wed_l2p: 'Gerade von Frühjahr bis September sind die Wochenenden begehrt.',
      wed_cta: 'Torte anfragen',
      about_eyebrow: 'Über uns', about_h: 'Von Delaware an die Weser',
      about_p1: 'In den USA träumte Katie von einer Ausbildung als Konditorin. 2016 zog es sie nach Bremerhaven — der Liebe wegen. Heute verbindet sie hier amerikanische Klassiker mit deutschem Konditorhandwerk.',
      about_quote: '„Er macht das Geschäftliche, ich mache das Leckere."',
      about_quote_name: '— Katie Mühlbacher, Gründerin',
      about_p2: '2019 eröffnete das erste Café in Wulsdorf, 2023 kam das zweite direkt am Deich dazu. Gebacken wird bis heute alles selbst — mit viel Liebe zum Detail.',
      st1_y: 'USA · Delaware', st1_h: 'Ein Traum vom Backen', st1_p: 'Im über 6 000 km entfernten Delaware träumt Katie von einer Ausbildung als Konditorin.',
      st2_y: '2016', st2_h: 'Zurück nach Bremerhaven', st2_p: 'Der Liebe wegen kehrt sie zurück — hier hat sie ihren Mann Tobias kennengelernt.',
      st3_y: 'Die Backstube', st3_h: 'Aus einer Scheune wird die Backstube', st3_p: 'Gemeinsam bauen die beiden eine kleine, aber professionelle Backstube auf.',
      st4_y: 'Mai 2019', st4_h: 'Café Wulsdorf öffnet', st4_p: 'Sonnendurchflutet und mit viel Liebe zum Detail — der erste eigene Laden.',
      st5_y: 'April 2023', st5_h: 'Zweites Café Am Deich', st5_p: 'Direkt am Aufgang zum Lohmanndeich kommt der zweite, ebenso beliebte Standort dazu.',
      st6_y: 'Heute', st6_h: 'Zwei Cafés, alles handgemacht', st6_p: 'Amerikanischer Gedanke, deutsche Machart — süß, aber nicht zu süß.',
      cafes_eyebrow: 'Unsere zwei Cafés', cafes_h: 'Komm vorbei auf einen Kaffee',
      cafe1_h: 'Konditorei & Café Wulsdorf', cafe1_addr: 'Eingang Heinrich-Kappelmann-Straße',
      cafe1_hours: 'Montag – Sonntag · 12–18 Uhr',
      cafe2_h: 'Café Am Deich', cafe2_addr: 'Direkt am Aufgang zum Lohmanndeich',
      cafe2_hours: 'Mittwoch – Sonntag · 12–17 Uhr', cafe_route: 'Route anzeigen',
      kontakt_eyebrow: 'Kontakt', kontakt_h: 'Wir freuen uns auf Ihre Nachricht',
      kontakt_p: 'Ob Bestellung, Motivtorte oder eine liebe Rückmeldung — schreiben Sie uns. Für alle Anfragen nutzen Sie bitte das Formular.',
      kontakt_phone: 'Telefon', kontakt_visit: 'Besuchen',
      f_name: 'Name', f_email: 'E-Mail', f_subject: 'Betreff',
      f_s1: 'Allgemeine Anfrage', f_s2: 'Motiv- / Hochzeitstorte', f_s3: 'Online-Bestellung', f_s4: 'Feedback',
      f_msg: 'Nachricht', f_send: 'Nachricht senden',
      f_note: 'Demo-Formular — es wird keine echte Nachricht versendet.',
      f_ok: 'Danke! Wir melden uns so schnell wie möglich.',
      foot_tag: 'Konditorei & Café in Bremerhaven. Echtes Handwerk, echter Geschmack — seit 2016.',
      foot_explore: 'Entdecken', foot_visit: 'Besuchen', foot_contact: 'Kontakt', foot_form: 'Kontaktformular',
      foot_impressum: 'Impressum', foot_datenschutz: 'Datenschutz', foot_agb: 'AGB',
      cart_h: 'Dein Warenkorb',
      fresh_label: 'Diese Woche frisch',
      cfg_eyebrow: 'Torte konfigurieren', cfg_h: 'Stell dir deine Torte zusammen',
      cfg_p: 'In wenigen Klicks zur unverbindlichen Anfrage — wir melden uns mit dem genauen Angebot.',
      cfg_g_occasion: 'Anlass', cfg_g_portions: 'Größe', cfg_g_tiers: 'Etagen', cfg_g_flavor: 'Geschmack', cfg_g_extras: 'Extras', cfg_g_date: 'Wunschdatum',
      cfg_summary_h: 'Deine Torte', cfg_price_label: 'Richtwert', cfg_send: 'Anfrage senden',
      cfg_note: 'Unverbindlicher Richtwert. Der Endpreis hängt von Dekor und Aufwand ab.',
      // dynamic
      add: 'In den Warenkorb', added: 'Hinzugefügt', cart_empty: 'Dein Warenkorb ist noch leer.',
      cart_empty_cta: 'Stöbere im Sortiment und leg etwas Süßes hinein.',
      pickup_label: 'Abholort wählen', remove: 'Entfernen', total: 'Summe',
      checkout: 'Zur Kasse', cart_disc: 'Demo — kein echter Bezahlvorgang. Bestellungen bitte im Café oder telefonisch bestätigen.',
      done_h: 'Bestellung notiert!', done_p: 'Das war eine Demo-Bestellung. Im echten Betrieb würden wir deine Abholung in {pick} bestätigen.',
      done_cta: 'Weiter stöbern'
    },
    en: {
      hours_wuls: 'Mon–Sun 12–6 pm', hours_deich: 'Wed–Sun 12–5 pm',
      nav_sortiment: 'Menu', nav_shop: 'Order online', nav_torten: 'Custom cakes',
      nav_about: 'About', nav_cafes: 'Cafés', nav_kontakt: 'Contact',
      hero_eyebrow: 'Pâtisserie & Café · Bremerhaven',
      hero_h1a: 'Sweet,', hero_h1b: 'but not too sweet.',
      hero_lede: 'Real craft, real flavour. Handmade cakes, macarons and American classics — baked fresh every day in our Wulsdorf bakery.',
      cta_order: 'Order online', cta_visit: 'Visit the café',
      hero_m_since: 'Since', hero_m_cafes: 'Two cafés', hero_m_deich: '+ Am Deich',
      hero_m_made: 'Homemade', hero_m_made_v: 'Own bakery & coffee roast',
      band_1: 'An American idea, made the German way', band_2: 'American Cheesecake',
      band_3: 'Macarons', band_4: 'Naked Cakes', band_5: 'House-roasted coffee',
      band_1b: 'An American idea, made the German way', band_2b: 'American Cheesecake',
      band_3b: 'Macarons', band_4b: 'Naked Cakes', band_5b: 'House-roasted coffee',
      usp1_h: 'Baked fresh daily', usp1_p: 'Traditional pastry craft with the best ingredients — in our own bakery.',
      usp2_h: 'Our own coffee roast', usp2_p: 'Roasted just for us. Enjoy it in the café or take a bag home.',
      usp3_h: 'Cakes for any occasion', usp3_p: 'Weddings, christenings, birthdays — individually decorated and happily tiered.',
      sort_eyebrow: 'Our menu', sort_h: 'From the pâtisserie to the American bakery',
      sort_p: 'German pastry tradition meets American classics. A little tour of what sits in our display case.',
      cat_stuecke: 'Cake slices', cat_stuecke_c: 'Cheesecake · Fruit mousse · Cassis',
      cat_macarons: 'Macarons', cat_macarons_c: 'Handmade, in soft hues',
      cat_klein: 'Small bakes', cat_klein_c: 'Brownies · Cookies · Cinnamon Buns',
      cat_torten: 'Custom cakes', cat_torten_c: 'Wedding · Christening · Birthday',
      shop_eyebrow: 'Order online', shop_h: 'Pre-order & pick up',
      shop_p: 'Add your favourites to the basket and pick them up fresh in Wulsdorf or Am Deich.',
      chip_alle: 'All', chip_stuecke: 'Slices', chip_torten: 'Whole cakes',
      chip_macarons: 'Macarons', chip_klein: 'Small bakes', chip_kaffee: 'Coffee',
      shop_demonote: 'Demo shop — no real checkout',
      sig_eyebrow: 'Crowd favourite', sig_h: 'The American Cheesecake',
      sig_p: 'Creamy, dense, perfectly balanced — exactly the "sweet, but not too sweet" you keep coming back for. Alongside: fruit mousse cake, cassis and the Schokoholic sundae.',
      sig_l1b: 'Fresh from the case', sig_l1p: 'By the slice, in the café or to go.',
      sig_l2b: 'Whole cakes to pre-order', sig_l2p: 'For the coffee table or your next visit.',
      sig_cta: 'Try it now',
      trio_eyebrow: 'Homemade & loved', trio_h: 'Three you simply have to try',
      trio1_h: 'Fruit Mousse Cake', trio1_p: 'Light mousse on a fluffy base, decorated with fresh fruit and flowers.',
      trio2_h: 'Cinnamon Buns', trio2_p: 'Warm cinnamon rolls, brownies, cookies and cake pops — the American corner.',
      trio3_h: 'Macarons', trio3_p: 'Six flavours in soft hues — the fine French side of the house.',
      wed_eyebrow: 'Custom & wedding cakes', wed_h: 'A highlight for your celebration',
      wed_p: 'From the tiered wedding cake to a one-off custom design. Katie loves "naked cakes" — visible layers, fresh fruit and colourful blossoms.',
      wed_l1b: 'Individually designed', wed_l1p: 'Weddings, christenings, birthdays or company events.',
      wed_l2b: 'Ask early', wed_l2p: 'From spring to September the weekends fill up fast.',
      wed_cta: 'Request a cake',
      about_eyebrow: 'About us', about_h: 'From Delaware to the Weser',
      about_p1: 'Back in the US, Katie dreamed of training as a pastry chef. In 2016 she moved to Bremerhaven — for love. Today she blends American classics with German pastry craft.',
      about_quote: '"He runs the business, I make the delicious part."',
      about_quote_name: '— Katie Mühlbacher, founder',
      about_p2: 'The first café opened in Wulsdorf in 2019, the second right by the dike in 2023. Everything is still baked in-house — with great attention to detail.',
      st1_y: 'USA · Delaware', st1_h: 'A dream of baking', st1_p: 'Over 6,000 km away in Delaware, Katie dreams of training as a pastry chef.',
      st2_y: '2016', st2_h: 'Back to Bremerhaven', st2_p: 'She returns for love — this is where she met her husband Tobias.',
      st3_y: 'The bakery', st3_h: 'A barn becomes the bakery', st3_p: 'Together the two build a small but professional bakery.',
      st4_y: 'May 2019', st4_h: 'Café Wulsdorf opens', st4_p: 'Sun-filled and full of detail — their first café of their own.',
      st5_y: 'April 2023', st5_h: 'Second café Am Deich', st5_p: 'Right by the steps to the Lohmann dike, an equally loved second café joins.',
      st6_y: 'Today', st6_h: 'Two cafés, all handmade', st6_p: 'An American idea, German craft — sweet, but not too sweet.',
      cafes_eyebrow: 'Our two cafés', cafes_h: 'Drop by for a coffee',
      cafe1_h: 'Pâtisserie & Café Wulsdorf', cafe1_addr: 'Entrance on Heinrich-Kappelmann-Straße',
      cafe1_hours: 'Monday – Sunday · 12–6 pm',
      cafe2_h: 'Café Am Deich', cafe2_addr: 'Right by the steps up to the Lohmann dike',
      cafe2_hours: 'Wednesday – Sunday · 12–5 pm', cafe_route: 'Get directions',
      kontakt_eyebrow: 'Contact', kontakt_h: 'We look forward to hearing from you',
      kontakt_p: 'An order, a custom cake or a kind word — write to us. For all enquiries please use the form.',
      kontakt_phone: 'Phone', kontakt_visit: 'Visit',
      f_name: 'Name', f_email: 'Email', f_subject: 'Subject',
      f_s1: 'General enquiry', f_s2: 'Custom / wedding cake', f_s3: 'Online order', f_s4: 'Feedback',
      f_msg: 'Message', f_send: 'Send message',
      f_note: 'Demo form — no real message is sent.',
      f_ok: 'Thank you! We will get back to you as soon as possible.',
      foot_tag: 'Pâtisserie & café in Bremerhaven. Real craft, real flavour — since 2016.',
      foot_explore: 'Explore', foot_visit: 'Visit', foot_contact: 'Contact', foot_form: 'Contact form',
      foot_impressum: 'Imprint', foot_datenschutz: 'Privacy', foot_agb: 'Terms',
      cart_h: 'Your basket',
      fresh_label: 'Fresh this week',
      cfg_eyebrow: 'Build your cake', cfg_h: 'Design your own cake',
      cfg_p: 'A few clicks to a no-obligation request — we will reply with an exact quote.',
      cfg_g_occasion: 'Occasion', cfg_g_portions: 'Size', cfg_g_tiers: 'Tiers', cfg_g_flavor: 'Flavour', cfg_g_extras: 'Extras', cfg_g_date: 'Preferred date',
      cfg_summary_h: 'Your cake', cfg_price_label: 'Estimate', cfg_send: 'Send request',
      cfg_note: 'Non-binding estimate. Final price depends on decoration and effort.',
      add: 'Add to basket', added: 'Added', cart_empty: 'Your basket is still empty.',
      cart_empty_cta: 'Browse the menu and pop something sweet in here.',
      pickup_label: 'Choose pickup', remove: 'Remove', total: 'Total',
      checkout: 'Checkout', cart_disc: 'Demo — no real checkout. Please confirm orders in the café or by phone.',
      done_h: 'Order noted!', done_p: 'That was a demo order. In real life we would confirm your pickup at {pick}.',
      done_cta: 'Keep browsing'
    }
  };

  var lang = localStorage.getItem('kp_lang') || 'de';
  function t(key) { return (I18N[lang] && I18N[lang][key]) || (I18N.de[key]) || key; }

  /* ---------- STATE ---------- */
  var cart = {};
  try { cart = JSON.parse(localStorage.getItem('kp_cart') || '{}') || {}; } catch (e) { cart = {}; }
  var pickup = localStorage.getItem('kp_pickup') || 'wuls';
  var filter = 'alle';
  var checkoutDone = false;

  function saveCart() { localStorage.setItem('kp_cart', JSON.stringify(cart)); }
  function prod(id) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i]; return null; }
  function cartCount() { var n = 0; for (var k in cart) n += cart[k]; return n; }
  function cartTotal() { var s = 0; for (var k in cart) { var p = prod(k); if (p) s += p.price * cart[k]; } return s; }

  function lucideRefresh() { if (window.lucide && window.lucide.createIcons) window.lucide.createIcons(); }

  /* ---------- RENDER PRODUCTS ---------- */
  var grid = document.getElementById('productGrid');
  function renderProducts() {
    grid.innerHTML = '';
    PRODUCTS.forEach(function (p) {
      var info = p[lang] || p.de;
      var show = (filter === 'alle' || p.cat === filter);
      var art = document.createElement('article');
      art.className = 'product' + (show ? '' : ' hidden');
      art.setAttribute('data-cat', p.cat);
      var tagHtml = '';
      if (p.tag === 'fav') tagHtml = '<span class="p-tag fav">' + (lang === 'de' ? 'Liebling' : 'Favourite') + '</span>';
      else if (p.tag === 'veg') tagHtml = '<span class="p-tag veg">' + (lang === 'de' ? 'vegan mögl.' : 'vegan opt.') + '</span>';
      else if (p.tag === 'new') tagHtml = '<span class="p-tag new">' + (lang === 'de' ? 'Neu' : 'New') + '</span>';
      var added = !!cart[p.id];
      art.innerHTML =
        '<div class="p-img">' +
          '<image-slot id="prod-' + p.id + '" class="tint-' + p.tint + '" ' + (IMG[p.id] ? 'src="' + IMG[p.id] + '" ' : '') + 'placeholder="' + info.n + '"></image-slot>' +
          tagHtml +
        '</div>' +
        '<div class="p-body">' +
          '<h3 class="p-name">' + info.n + '</h3>' +
          '<p class="p-desc">' + info.d + '</p>' +
          '<div class="p-foot">' +
            '<span class="p-price">' + EUR.format(p.price) + ' <small>' + info.u + '</small></span>' +
            '<button class="add-btn' + (added ? ' added' : '') + '" data-add="' + p.id + '">' +
              '<i data-lucide="' + (added ? 'check' : 'plus') + '"></i><span>' + (added ? t('added') : t('add')) + '</span>' +
            '</button>' +
          '</div>' +
        '</div>';
      grid.appendChild(art);
    });
    lucideRefresh();
  }

  /* ---------- FRESH TICKER ---------- */
  var freshTrack = document.getElementById('freshTrack');
  function renderFresh() {
    if (!freshTrack) return;
    var list = FRESH[lang] || FRESH.de;
    var one = list.map(function (x) { return '<span class="fresh-item">' + x + '</span>'; }).join('');
    freshTrack.innerHTML = one + one; // duplicate for a seamless loop
  }

  /* ---------- LIVE OPEN STATUS (both locations) ---------- */
  var statusEl = document.getElementById('openStatus');
  function fmtHour(h, de) {
    if (de) return h + ' Uhr';
    var pm = h >= 12, hr = (h % 12) || 12;
    return hr + (pm ? ' pm' : ' am');
  }
  function isOpen(days, openH, closeH) {
    var now = new Date(), d = now.getDay(), h = now.getHours() + now.getMinutes() / 60;
    return days.indexOf(d) >= 0 && h >= openH && h < closeH;
  }
  function computeStatus() {
    if (!statusEl) return;
    var de = lang === 'de';
    var locs = [
      { name: 'Wulsdorf', open: isOpen([0, 1, 2, 3, 4, 5, 6], 12, 18), close: 18 },
      { name: 'Am Deich', open: isOpen([0, 3, 4, 5, 6], 12, 17), close: 17 }
    ];
    statusEl.className = 'open-status';
    statusEl.innerHTML = locs.map(function (l) {
      var state = l.open
        ? (de ? 'bis ' + l.close + ' Uhr' : 'until ' + fmtHour(l.close, false))
        : (de ? 'geschlossen' : 'closed');
      return '<span class="loc-stat' + (l.open ? '' : ' closed') + '">' +
        '<span class="s-dot"></span><b>' + l.name + '</b>' +
        '<span class="ls-detail"> ' + state + '</span></span>';
    }).join('');
  }

  /* ---------- TOAST ---------- */
  var toastEl = document.getElementById('toast');
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.querySelector('.toast-msg').textContent = msg;
    toastEl.classList.add('show');
    lucideRefresh();
    clearTimeout(toastEl._h);
    toastEl._h = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  /* ---------- CAKE CONFIGURATOR ---------- */
  var CFG = {
    occasion: [
      { id: 'geburtstag', de: 'Geburtstag', en: 'Birthday', mult: 1.0 },
      { id: 'hochzeit', de: 'Hochzeit', en: 'Wedding', mult: 1.18 },
      { id: 'taufe', de: 'Taufe', en: 'Christening', mult: 1.0 },
      { id: 'firma', de: 'Firmenfeier', en: 'Company event', mult: 1.06 }
    ],
    portions: [
      { id: 'p8', de: '8 Portionen', en: '8 servings', val: 8 },
      { id: 'p12', de: '12 Portionen', en: '12 servings', val: 12 },
      { id: 'p20', de: '20 Portionen', en: '20 servings', val: 20 },
      { id: 'p30', de: '30 Portionen', en: '30 servings', val: 30 }
    ],
    tiers: [
      { id: 't1', de: '1 Etage', en: '1 tier', mult: 1.0 },
      { id: 't2', de: '2 Etagen', en: '2 tiers', mult: 1.18 },
      { id: 't3', de: '3 Etagen', en: '3 tiers', mult: 1.34 }
    ],
    flavor: [
      { id: 'schoko', de: 'Schokolade', en: 'Chocolate', add: 0 },
      { id: 'fruchtmousse', de: 'Fruchtmousse', en: 'Fruit mousse', add: 0 },
      { id: 'cassis', de: 'Cassis', en: 'Cassis', add: 0 },
      { id: 'vanille', de: 'Vanille-Beere', en: 'Vanilla-berry', add: 0 },
      { id: 'naked', de: 'Naked Cake', en: 'Naked cake', add: 0.6 }
    ],
    extras: [
      { id: 'blueten', de: 'Frische Blüten', en: 'Fresh flowers', add: 12 },
      { id: 'schriftzug', de: 'Schriftzug', en: 'Lettering', add: 8 },
      { id: 'gold', de: 'Goldakzente', en: 'Gold accents', add: 15 }
    ]
  };
  var CFG_GROUPS = ['occasion', 'portions', 'tiers', 'flavor', 'extras'];
  var PER_PORTION = 3.5;
  var cfgState = { occasion: 'geburtstag', portions: 'p12', tiers: 't1', flavor: 'schoko', extras: [] };
  var cfgForm = document.getElementById('cfgForm');
  var cfgRecap = document.getElementById('cfgRecap');
  var cfgPriceEl = document.getElementById('cfgPrice');
  var cfgDateEl = document.getElementById('cfgDate');
  var cakeViz = document.getElementById('cakeViz');
  var FLAVOR_COLORS = { schoko: '#5e3c28', fruchtmousse: '#e09bb0', cassis: '#7e3b66', vanille: '#e9d4a9', naked: '#e4c79b' };
  var TIER_COUNT = { t1: 1, t2: 2, t3: 3 };
  var lastPrice = null;

  function updateCake() {
    if (!cakeViz) return;
    cakeViz.setAttribute('data-flavor', cfgState.flavor);
    var n = TIER_COUNT[cfgState.tiers] || 1;
    var tiers = cakeViz.querySelectorAll('.tier');
    for (var i = 0; i < tiers.length; i++) tiers[i].classList.toggle('hide', i >= n);
    cakeViz.classList.toggle('has-flowers', cfgState.extras.indexOf('blueten') >= 0);
    cakeViz.classList.toggle('has-gold', cfgState.extras.indexOf('gold') >= 0);
    cakeViz.classList.toggle('has-plaque', cfgState.extras.indexOf('schriftzug') >= 0);
    var por = cfgOpt('portions', cfgState.portions);
    var s = por ? (por.val >= 30 ? 1.12 : por.val >= 20 ? 1.06 : por.val >= 12 ? 1.0 : 0.9) : 1;
    cakeViz.style.setProperty('--cake-scale', s);
  }

  function setPrice(target) {
    if (!cfgPriceEl) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var from = (lastPrice == null || reduce) ? target : lastPrice;
    lastPrice = target;
    if (reduce) { cfgPriceEl.textContent = 'ca. ' + EUR.format(target); return; }
    var start = performance.now(), dur = 480;
    (function step(now) {
      var p = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - p, 3);
      cfgPriceEl.textContent = 'ca. ' + EUR.format(Math.round(from + (target - from) * e));
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }

  function cfgOpt(g, id) { for (var i = 0; i < CFG[g].length; i++) if (CFG[g][i].id === id) return CFG[g][i]; return null; }
  function cfgLabel(o) { return o ? (o[lang] || o.de) : ''; }

  function renderConfig() {
    if (!cfgForm) return;
    cfgForm.innerHTML = CFG_GROUPS.map(function (g) {
      var multi = (g === 'extras');
      var chips = CFG[g].map(function (o) {
        var on = multi ? cfgState.extras.indexOf(o.id) >= 0 : cfgState[g] === o.id;
        var dot = (g === 'flavor') ? '<span class="fl-dot" style="background:' + FLAVOR_COLORS[o.id] + '"></span>' : '';
        return '<button type="button" class="cfg-chip' + (g === 'flavor' ? ' has-dot' : '') + '" data-g="' + g + '" data-id="' + o.id + '" aria-pressed="' + on + '">' + dot + cfgLabel(o) + '</button>';
      }).join('');
      return '<div class="cfg-group"><span class="cfg-label">' + t('cfg_g_' + g) + '</span><div class="cfg-chips">' + chips + '</div></div>';
    }).join('');
    updateCfgSummary();
  }

  function calcCfgPrice() {
    var occ = cfgOpt('occasion', cfgState.occasion), por = cfgOpt('portions', cfgState.portions),
        ti = cfgOpt('tiers', cfgState.tiers), fl = cfgOpt('flavor', cfgState.flavor);
    var base = (PER_PORTION + fl.add) * por.val * ti.mult * occ.mult;
    var ex = cfgState.extras.reduce(function (s, id) { var o = cfgOpt('extras', id); return s + (o ? o.add : 0); }, 0);
    return Math.round(base + ex);
  }

  function updateCfgSummary() {
    if (!cfgRecap) return;
    var rows = [
      [t('cfg_g_occasion'), cfgLabel(cfgOpt('occasion', cfgState.occasion))],
      [t('cfg_g_portions'), cfgLabel(cfgOpt('portions', cfgState.portions))],
      [t('cfg_g_tiers'), cfgLabel(cfgOpt('tiers', cfgState.tiers))],
      [t('cfg_g_flavor'), cfgLabel(cfgOpt('flavor', cfgState.flavor))]
    ];
    var ex = cfgState.extras.map(function (id) { return cfgLabel(cfgOpt('extras', id)); });
    rows.push([t('cfg_g_extras'), ex.length ? ex.join(', ') : '—']);
    cfgRecap.innerHTML = rows.map(function (r) { return '<li><span>' + r[0] + '</span><b>' + r[1] + '</b></li>'; }).join('');
    setPrice(calcCfgPrice());
    updateCake();
  }

  if (cfgForm) {
    cfgForm.addEventListener('click', function (e) {
      var c = e.target.closest('.cfg-chip'); if (!c) return;
      var g = c.getAttribute('data-g'), id = c.getAttribute('data-id');
      if (g === 'extras') {
        var i = cfgState.extras.indexOf(id);
        if (i >= 0) cfgState.extras.splice(i, 1); else cfgState.extras.push(id);
      } else { cfgState[g] = id; }
      renderConfig();
    });
    if (cfgDateEl) cfgDateEl.addEventListener('change', updateCfgSummary);
    var cfgSend = document.getElementById('cfgSend');
    if (cfgSend) cfgSend.addEventListener('click', function () {
      var de = lang === 'de';
      var lines = [
        (de ? 'Anfrage Motivtorte' : 'Custom cake request') + ':',
        '• ' + t('cfg_g_occasion') + ': ' + cfgLabel(cfgOpt('occasion', cfgState.occasion)),
        '• ' + t('cfg_g_portions') + ': ' + cfgLabel(cfgOpt('portions', cfgState.portions)),
        '• ' + t('cfg_g_tiers') + ': ' + cfgLabel(cfgOpt('tiers', cfgState.tiers)),
        '• ' + t('cfg_g_flavor') + ': ' + cfgLabel(cfgOpt('flavor', cfgState.flavor)),
        '• ' + t('cfg_g_extras') + ': ' + (cfgState.extras.length ? cfgState.extras.map(function (id) { return cfgLabel(cfgOpt('extras', id)); }).join(', ') : (de ? 'keine' : 'none'))
      ];
      if (cfgDateEl && cfgDateEl.value) lines.push('• ' + t('cfg_g_date') + ': ' + cfgDateEl.value);
      lines.push('• ' + t('cfg_price_label') + ': ca. ' + EUR.format(calcCfgPrice()));
      lines.push('');
      lines.push(de ? 'Bitte um ein genaues Angebot.' : 'Please send a detailed quote.');
      var subj = document.getElementById('cf-subject'); if (subj) subj.selectedIndex = 1;
      var msgEl = document.getElementById('cf-msg'); if (msgEl) msgEl.value = lines.join('\n');
      var k = document.getElementById('kontakt'); if (k) k.scrollIntoView({ behavior: 'smooth' });
      setTimeout(function () { var n = document.getElementById('cf-name'); if (n) n.focus(); }, 550);
      showToast(de ? 'In die Anfrage übernommen' : 'Added to your request');
    });
  }

  /* ---------- CART ---------- */
  var cartCountEl = document.getElementById('cartCount');
  var cartBody = document.getElementById('cartBody');
  var cartFoot = document.getElementById('cartFoot');
  var cartEl = document.getElementById('cart');

  function updateCount() {
    var n = cartCount();
    cartCountEl.textContent = n;
    cartCountEl.classList.toggle('show', n > 0);
  }

  function renderCart() {
    var keys = Object.keys(cart);
    if (checkoutDone) return;
    if (keys.length === 0) {
      cartBody.innerHTML =
        '<div class="cart-empty"><i data-lucide="shopping-bag"></i>' +
        '<p style="font-weight:600;color:var(--ink)">' + t('cart_empty') + '</p>' +
        '<p>' + t('cart_empty_cta') + '</p></div>';
      cartFoot.innerHTML = '';
      lucideRefresh();
      return;
    }
    var html = '';
    keys.forEach(function (id) {
      var p = prod(id); if (!p) return;
      var info = p[lang] || p.de;
      var q = cart[id];
      html +=
        '<div class="cart-item" data-id="' + id + '">' +
          '<div class="ci-img" style="' + (IMG[id] ? 'background-image:url(' + IMG[id] + ');background-size:cover;background-position:center' : 'background:' + (tintHex[p.tint] || '#EAD9BF')) + '"></div>' +
          '<div>' +
            '<div class="ci-name">' + info.n + '</div>' +
            '<div class="ci-meta">' + EUR.format(p.price) + ' · ' + info.u + '</div>' +
            '<div class="qty">' +
              '<button data-dec="' + id + '" aria-label="−"><i data-lucide="minus"></i></button>' +
              '<span>' + q + '</span>' +
              '<button data-inc="' + id + '" aria-label="+"><i data-lucide="plus"></i></button>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<div class="ci-price">' + EUR.format(p.price * q) + '</div>' +
            '<button class="ci-remove" data-rem="' + id + '">' + t('remove') + '</button>' +
          '</div>' +
        '</div>';
    });
    cartBody.innerHTML = html;

    cartFoot.innerHTML =
      '<div class="pickup">' +
        '<div class="pk-label">' + t('pickup_label') + '</div>' +
        '<div class="pk-opts">' +
          '<button class="pk-opt" data-pickup="wuls" aria-pressed="' + (pickup === 'wuls') + '"><b>Wulsdorf</b><small>' + t('hours_wuls') + '</small></button>' +
          '<button class="pk-opt" data-pickup="deich" aria-pressed="' + (pickup === 'deich') + '"><b>Am Deich</b><small>' + t('hours_deich') + '</small></button>' +
        '</div>' +
      '</div>' +
      '<div class="cart-total"><span class="ct-k">' + t('total') + '</span><span class="ct-v">' + EUR.format(cartTotal()) + '</span></div>' +
      '<button class="btn btn-block" id="checkout">' + t('checkout') + ' <i data-lucide="arrow-right"></i></button>' +
      '<p class="cart-disc">' + t('cart_disc') + '</p>';
    lucideRefresh();
  }

  function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    checkoutDone = false;
    saveCart(); updateCount(); renderCart();
    var p = prod(id); if (p) showToast((p[lang] || p.de).n + ' · ' + t('added'));
    // reflect on grid button
    var btn = grid.querySelector('[data-add="' + id + '"]');
    if (btn) {
      btn.classList.add('added');
      btn.innerHTML = '<i data-lucide="check"></i><span>' + t('added') + '</span>';
      lucideRefresh();
    }
  }
  function changeQty(id, delta) {
    cart[id] = (cart[id] || 0) + delta;
    if (cart[id] <= 0) { delete cart[id]; }
    saveCart(); updateCount(); renderCart();
    if (!cart[id]) refreshAddBtn(id);
  }
  function removeItem(id) { delete cart[id]; saveCart(); updateCount(); renderCart(); refreshAddBtn(id); }
  function refreshAddBtn(id) {
    var btn = grid.querySelector('[data-add="' + id + '"]');
    if (btn) { btn.classList.remove('added'); btn.innerHTML = '<i data-lucide="plus"></i><span>' + t('add') + '</span>'; lucideRefresh(); }
  }

  function openCart() { cartEl.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeCart() { cartEl.classList.remove('open'); document.body.style.overflow = ''; }

  function doCheckout() {
    checkoutDone = true;
    var pickName = pickup === 'wuls' ? 'Wulsdorf' : 'Am Deich';
    cartBody.innerHTML =
      '<div class="checkout-done"><div class="cd-ic"><i data-lucide="party-popper"></i></div>' +
      '<h3>' + t('done_h') + '</h3>' +
      '<p>' + t('done_p').replace('{pick}', pickName) + '</p></div>';
    cartFoot.innerHTML =
      '<button class="btn btn-block" id="keepShopping">' + t('done_cta') + '</button>';
    cart = {}; saveCart(); updateCount(); lucideRefresh();
    // reset add buttons
    PRODUCTS.forEach(function (p) { refreshAddBtn(p.id); });
  }

  /* ---------- EVENT DELEGATION ---------- */
  grid.addEventListener('click', function (e) {
    var b = e.target.closest('[data-add]');
    if (b) addToCart(b.getAttribute('data-add'));
  });

  cartEl.addEventListener('click', function (e) {
    var el;
    if ((el = e.target.closest('[data-inc]'))) changeQty(el.getAttribute('data-inc'), 1);
    else if ((el = e.target.closest('[data-dec]'))) changeQty(el.getAttribute('data-dec'), -1);
    else if ((el = e.target.closest('[data-rem]'))) removeItem(el.getAttribute('data-rem'));
    else if ((el = e.target.closest('[data-pickup]'))) {
      pickup = el.getAttribute('data-pickup'); localStorage.setItem('kp_pickup', pickup); renderCart();
    }
    else if (e.target.closest('#checkout')) doCheckout();
    else if (e.target.closest('#keepShopping')) { checkoutDone = false; closeCart(); renderCart(); }
    else if (e.target.closest('[data-close-cart]')) closeCart();
  });
  document.getElementById('openCart').addEventListener('click', function () { openCart(); renderCart(); });

  /* ---------- FILTER CHIPS (animated) ---------- */
  var chips = document.getElementById('chips');
  function applyFilter(f) {
    filter = f;
    chips.querySelectorAll('.chip').forEach(function (x) {
      x.setAttribute('aria-pressed', x.getAttribute('data-filter') === f ? 'true' : 'false');
    });
    var shown = 0;
    grid.querySelectorAll('.product').forEach(function (a) {
      var match = (f === 'alle' || a.getAttribute('data-cat') === f);
      if (match) {
        clearTimeout(a._ht);
        var wasHidden = a.classList.contains('hidden');
        a.classList.remove('hidden');
        if (wasHidden) { a.classList.add('p-out'); void a.offsetWidth; }
        a.style.transitionDelay = (shown * 35) + 'ms';
        a.classList.remove('p-out');
        shown++;
      } else {
        a.style.transitionDelay = '0ms';
        a.classList.add('p-out');
        clearTimeout(a._ht);
        a._ht = setTimeout(function () { a.classList.add('hidden'); }, 360);
      }
    });
  }
  chips.addEventListener('click', function (e) {
    var c = e.target.closest('[data-filter]'); if (!c) return;
    applyFilter(c.getAttribute('data-filter'));
  });
  // category tiles jump to shop & set filter
  document.querySelectorAll('.cat[data-cat]').forEach(function (tile) {
    tile.addEventListener('click', function () {
      var cat = tile.getAttribute('data-cat');
      var chip = chips.querySelector('[data-filter="' + cat + '"]');
      if (chip) chip.click();
    });
  });

  /* ---------- LANGUAGE ---------- */
  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      var v = t(k);
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    renderProducts();
    renderFresh();
    computeStatus();
    renderConfig();
    if (cartEl.classList.contains('open')) renderCart();
    lucideRefresh();
  }
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.getAttribute('data-lang'); localStorage.setItem('kp_lang', lang); applyLang();
    });
  });

  /* ---------- MOBILE NAV ---------- */
  var mobileNav = document.getElementById('mobileNav');
  document.getElementById('openMenu').addEventListener('click', function () { mobileNav.classList.add('open'); document.body.style.overflow = 'hidden'; });
  mobileNav.addEventListener('click', function (e) {
    if (e.target.closest('[data-close-menu]')) { mobileNav.classList.remove('open'); document.body.style.overflow = ''; }
  });

  /* ---------- CONTACT FORM ---------- */
  var form = document.getElementById('contactForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    document.getElementById('formOk').classList.add('show');
    form.reset();
    setTimeout(function () { document.getElementById('formOk').classList.remove('show'); }, 6000);
  });

  /* ---------- ESC closes overlays ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      cartEl.classList.remove('open'); mobileNav.classList.remove('open'); document.body.style.overflow = '';
    }
  });

  /* ---------- REVEAL ON SCROLL (with hard failsafe) ---------- */
  function revealAll() {
    document.querySelectorAll('.reveal:not(.in)').forEach(function (el) { el.classList.add('in'); });
  }
  (function setupReveal() {
    var nodes = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { return; } // leave visible
    document.documentElement.classList.add('reveal-ready');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -10% 0px' });
    nodes.forEach(function (el) { io.observe(el); });
    // Immediate pass: anything already within the viewport reveals at once,
    // so above-the-fold content is never stuck invisible.
    requestAnimationFrame(function () {
      var vh = window.innerHeight || 800;
      nodes.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.95 && r.bottom > 0) el.classList.add('in');
      });
    });
    // Hard failsafe: if the observer never fires (capture contexts, odd
    // viewports), force everything visible after a beat.
    setTimeout(revealAll, 1200);
  })();

  /* ---------- INIT ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
  renderProducts();
  renderFresh();
  computeStatus();
  renderConfig();
  setInterval(computeStatus, 60000);
  updateCount();
  if (lang !== 'de') applyLang();
  lucideRefresh();
})();
