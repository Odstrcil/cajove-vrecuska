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
  { datum: "12. 11. 2026", text: "Slané pery a dvojsté vrecúško", odkaz: "zivot_zberatela_roznava.html" },
  { datum: "9. 11. 2026", text: "Krabička, ktorá vás rozcvičí", odkaz: "krabicky_pukka_yogi.html" },
  { datum: "9. 11. 2026", text: "Teekanne a ďalšie Pickwicky v zbierke", odkaz: "moja_zbierka_firma.html?firma=teekanne" },
  { datum: "8. 11. 2026", text: "Nórsky čaj z Česka", odkaz: "krabicky_kolonihagen.html" },
  { datum: "3. 11. 2026", text: "Od 137 k 200", odkaz: "zivot_zberatela_od_137_k_200.html" },
  { datum: "30. 10. 2026", text: "Preteky plachetníc o prvý čaj", odkaz: "svet_caju_klipre.html" },
  // Na titulke je prvých 5; ďalších 5 sa ukáže po kliknutí na tlačidlo. Zvyšok sa neukazuje.
  { datum: "7. 11. 2026", text: "Ďalších 51 vrecúšok v zbierke", odkaz: "moja_zbierka.html" },
  { datum: "6. 11. 2026", text: "54 vrecúšok zo 16 nových firiem", odkaz: "moja_zbierka.html" },
  { datum: "5. 11. 2026", text: "25 nových vrecúšok v zbierke", odkaz: "moja_zbierka.html" },
  { datum: "5. 11. 2026", text: "Thomas Lipton a jeho čaj", odkaz: "svet_caju_lipton.html" },
  { datum: "4. 11. 2026", text: "Vanilka je orchidea", odkaz: "svet_caju_vanilka_vonava.html" },
  { datum: "3. 11. 2026", text: "Hry s prázdnymi obalmi", odkaz: "cajove_drobnosti_hry.html" },
  { datum: "3. 11. 2026", text: "Izba, v ktorej sa dá klikať", odkaz: "cajove_drobnosti.html" },
  { datum: "2. 11. 2026", text: "Prečo mätu piepornú v lese takmer nestretnete", odkaz: "svet_caju_mata_pieporna.html" },
  { datum: "2. 11. 2026", text: "Šípka z čaju", odkaz: "svet_caju_ruza_sipova.html" }
];
