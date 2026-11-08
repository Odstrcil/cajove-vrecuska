// Hlavné časti stránky. Keď má časť skutočný obsah, zmeníme hotove na true.
// Až potom sa jej hrnček dá kliknúť a objaví sa v menu.
window.SEKCIE = [
  { id: "moja_zbierka",      nazov: "Moja zbierka",      subor: "moja_zbierka.html",      hotove: true },
  { id: "zivot_zberatela",   nazov: "Život zberateľa",   subor: "zivot_zberatela.html",   hotove: true },
  { id: "svet_caju",         nazov: "Svet čaju",         subor: "svet_caju.html",         hotove: true },
  { id: "cajove_drobnosti",  nazov: "Čajové drobnosti",  subor: "cajove_drobnosti.html",  hotove: true }
];

// Čo je nové. Na titulnej stránke sa ukážu prvé tri zo zoznamu – nová novinka sa
// pripíše navrch. Novinky sú upútavky: majú návštevníka zlákať, nie len oznámiť.
// odkaz: stránka, na ktorú novinka vedie.
window.NOVINKY = [
  { datum: "7. 11. 2026", text: "Ďalších 51 vrecúšok: 19 Popradských, 23 Pickwickov a staré Elixíry s písmenom P v ovále", odkaz: "moja_zbierka.html" },
  { datum: "3. 11. 2026", text: "Na výstavke ich bolo 137 a do dvesto chýbali tri. Príbeh o jednej pani učiteľke a o tom, ako vznikla táto stránka", odkaz: "zivot_zberatela_od_137_k_200.html" },
  { datum: "30. 10. 2026", text: "Kedysi nevyhrával najlepší čaj, ale ten, ktorý prvý doplával do Londýna – preteky plachetníc o čaj z novej úrody", odkaz: "svet_caju_klipre.html" },
  // Ďalšie upútavky – teraz sa neukazujú, poslúžia, keď bude zoznam všetkých noviniek.
  { datum: "8. 11. 2026", text: "Krabička z nórskeho obchodu, všetko po nórsky – a na spodku drobným písmom: vyrobené v Česku", odkaz: "krabicky_kolonihagen.html" },
  { datum: "6. 11. 2026", text: "Do zbierky pribudlo 54 vrecúšok zo 16 nových firiem – aj detská básnička o šiestich minútach a čaj, ktorý sa mal vypiť do roku 2016", odkaz: "moja_zbierka.html" },
  { datum: "5. 11. 2026", text: "Do zbierky pribudlo 25 vrecúšok – aj obrie americké a bylinkový čaj s čiernym korením ako do guláša", odkaz: "moja_zbierka.html" },
  { datum: "5. 11. 2026", text: "Chlapec z chudobnej štvrte, ktorý dal meno čaju Lipton – a päťkrát s úsmevom prehral najslávnejšie preteky jácht", odkaz: "svet_caju_lipton.html" },
  { datum: "4. 11. 2026", text: "Vanilka nie je kôra, ale orchidea – a pestovať ju naučil svet dvanásťročný chlapec", odkaz: "svet_caju_vanilka_vonava.html" },
  { datum: "3. 11. 2026", text: "Na upršané dni a do postele: hry s prázdnymi obalmi od čaju, bez internetu", odkaz: "cajove_drobnosti_hry.html" },
  { datum: "3. 11. 2026", text: "Oddychová izba, v ktorej sa dá klikať na predmety – za obrazom je citát, za kalendárom čajové sviatky", odkaz: "cajove_drobnosti.html" },
  { datum: "2. 11. 2026", text: "Prečo mätu piepornú v lese takmer nestretnete", odkaz: "svet_caju_mata_pieporna.html" },
  { datum: "2. 11. 2026", text: "Šípka z čaju a chĺpky za golierom – zaujímavosti o ruži šípovej", odkaz: "svet_caju_ruza_sipova.html" }
];
