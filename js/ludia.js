// Ľudia na našej stránke – zoznam pre cajove_drobnosti_ludia.html
// m = meno ako sa ukáže (priezvisko prvé), k = podľa čoho sa radí, t = skupina,
// p = true, ak o človeku na stránke píšeme viac (zelený riadok), r = rok na zoradenie podľa času
// (približný, null = nevieme), v = krátka veta (začína tým, kto to je), o = odkazy [text, adresa].
// Odkazy do čajového kalendára sem schválne nedávame (rozhodnutie 27. 11. 2026).
(function () {
  var G = ["Granátové jablko", "svet_caju_granatove_jablko.html"],
      I = ["Ibištek sudánsky", "svet_caju_ibistek_sudansky.html"],
      R = ["Ruža šípová", "svet_caju_ruza_sipova.html"],
      M = ["Mäta pieporná", "svet_caju_mata_pieporna.html"],
      V = ["Vanilka voňavá", "svet_caju_vanilka_vonava.html"],
      C = ["Cukor v šálke čaju", "svet_caju_cukor.html"],
      N = ["Kto je pán v medailóne?", "svet_caju_nelson.html"],
      L = ["Thomas Lipton a jeho čaj", "svet_caju_lipton.html"],
      S = ["Neznáma pani a vrecúško v konvičke", "zivot_zberatela_spisska.html"],
      K = ["Knihy o čaji", "cajove_drobnosti_knihy.html"],
      KO = ["Nórsky čaj z Česka", "krabicky_kolonihagen.html"],
      CI = ["Citáty o čaji", "citaty.html"];
  function F(id, nazov) { return ["Vrecúška " + nazov, "moja_zbierka_firma.html?firma=" + id]; }

  window.LUDIA_SKUPINY = {
    ludia: "Skutoční ľudia",
    autori: "Autori kníh a kresieb",
    postavy: "Postavy z mýtov, Biblie a rozprávok",
    caj: "Mená na vrecúškach"
  };

  window.LUDIA = [
    // ---- Skutoční ľudia ----
    { t: "ludia", m: "Homér", k: "Homer", r: -750, v: "starogrécky básnik; po ňom nesú meno Homérske hymny", o: [G] },
    { t: "ludia", m: "Ovídius", k: "Ovidius", r: -43, v: "rímsky básnik (43 pred Kr. – asi 17 po Kr.)", o: [G] },
    { t: "ludia", m: "Dioskoridés", k: "Dioskorides", r: 50, v: "grécky lekár z 1. storočia, opísal liečivé rastliny", o: [I] },
    { t: "ludia", m: "Plínius Starší", k: "Plinius", r: 23, v: "rímsky učenec (23 – 79), napísal veľké dielo o prírode", o: [R] },
    { t: "ludia", m: "Matúš, svätý", k: "Matus", r: 30, v: "apoštol a evanjelista; v jeho evanjeliu sa spomína mäta", o: [M] },
    { t: "ludia", m: "Hildegarda z Bingenu, svätá", k: "Hildegarda", r: 1098, v: "nemecká abatiša a znalkyňa bylín (1098 – 1179)", o: [I] },
    { t: "ludia", m: "Po Ťü-i", k: "Po Tu-i", r: 772, v: "čínsky básnik (772 – 846), autor básne o ibišteku", o: [I] },
    { t: "ludia", m: "Meng Čchang", k: "Meng Cchang", r: 930, v: "čínsky panovník z 10. storočia, dal vysadiť ibišteky na hradby", o: [I] },
    { t: "ludia", m: "Linné, Carl", k: "Linne", r: 1707, v: "švédsky prírodovedec (1707 – 1778), dal rastlinám latinské mená", o: [G] },
    { t: "ludia", m: "Ray, John", k: "Ray", r: 1627, v: "anglický prírodovedec (1627 – 1705), prvý opísal mätu piepornú", o: [M] },
    { t: "ludia", m: "Mičurin, Ivan", k: "Micurin", r: 1855, v: "ruský šľachtiteľ ovocia (1855 – 1935)", o: [V] },
    { t: "ludia", m: "Blanárik, Peter", k: "Blanarik", r: null, v: "slovenský vedec, učil pestovať rastliny v skúmavke", o: [V] },
    { t: "ludia", m: "Rudolf II.", k: "Rudolf", r: 1552, v: "cisár (1552 – 1612), sídlil v Prahe a miloval drahé kamene", o: [G] },
    { t: "ludia", m: "Mária Terézia", k: "Maria Terezia", r: 1717, v: "panovníčka (1717 – 1780), zakázala vyvážať surové české granáty", o: [G] },
    { t: "ludia", m: "Izabela Kastílska", k: "Izabela", r: 1451, v: "španielska kráľovná (1451 – 1504), dala granátové jablko do erbu", o: [G] },
    { t: "ludia", m: "Ferdinand Aragónsky", k: "Ferdinand", r: 1452, v: "španielsky kráľ (1452 – 1516), manžel kráľovnej Izabely", o: [G] },
    { t: "ludia", m: "Alžbeta II.", k: "Alzbeta", r: 1926, v: "britská kráľovná (1926 – 2022); Twinings bol jej dvorným dodávateľom", o: [F("twinings", "Twinings")] },
    { t: "ludia", m: "Ján z Boha, svätý", k: "Jan z Boha", r: 1495, v: "portugalský svätec (1495 – 1550), zakladateľ milosrdných bratov", o: [G] },
    { t: "ludia", m: "Boodt, Anselmus Boëtius de", k: "Boodt", r: 1550, v: "flámsky lekár cisára Rudolfa II. a znalec drahokamov (asi 1550 – 1632)", o: [G] },
    { t: "ludia", m: "Nelson, Horatio", k: "Nelson Horatio", p: true, r: 1758, v: "britský admirál (1758 – 1805)", o: [N] },
    { t: "ludia", m: "Nelson a Moate", k: "Nelson a Moate", p: true, r: 1880, v: "obchodníci s čajom z mesta Christchurch na Novom Zélande (19. storočie)", o: [N] },
    { t: "ludia", m: "Hanway, Jonas", k: "Hanway", r: 1712, v: "londýnsky obchodník a cestovateľ (1712 – 1786)", o: [C] },
    { t: "ludia", m: "Twining, Richard", k: "Twining", r: 1749, v: "londýnsky obchodník s čajom (1749 – 1824)", o: [C] },
    { t: "ludia", m: "Rad, Jakub Kryštof", k: "Rad", p: true, r: 1799, v: "riaditeľ cukrovaru v Dačiciach (1799 – 1871), vynálezca kocky cukru", o: [C] },
    { t: "ludia", m: "Albius, Edmond", k: "Albius", p: true, r: 1829, v: "chlapec z ostrova Réunion (1829 – 1880), naučil svet opeľovať vanilku", o: [V] },
    { t: "ludia", m: "Lipton, Thomas", k: "Lipton", p: true, r: 1848, v: "škótsky obchodník s čajom (1848 – 1931)", o: [L, F("lipton", "Lipton")] },
    { t: "ludia", m: "Meinl, Julius", k: "Meinl", r: 1862, v: "viedenský obchodník, jeho firma je z roku 1862", o: [F("julius_meinl", "Julius Meinl"), S] },
    { t: "ludia", m: "Eilles, Joseph", k: "Eilles", r: 1873, v: "mníchovský obchodník, podľa firmy založil značku Eilles v roku 1873", o: [F("eilles", "Eilles")] },
    { t: "ludia", m: "Meßmer, Eduard", k: "Messmer", r: 1852, v: "nemecký obchodník, v roku 1852 otvoril v Baden-Badene obchod s čajom", o: [F("messmer", "Meßmer")] },
    { t: "ludia", m: "Harney, John", k: "Harney", r: 1970, v: "americký majster miešania čajov, v roku 1970 založil Harney & Sons", o: [F("harney_and_sons", "Harney & Sons")] },
    { t: "ludia", m: "Fredsted, Valdemar", k: "Fredsted", r: null, v: "zakladateľ dánskeho čajového domu Fredsted", o: [F("fredsted", "Fredsted")] },
    { t: "ludia", m: "Okakura Kakuzó", k: "Okakura", r: 1863, v: "japonský znalec umenia (1863 – 1913), autor Knihy o čaji", o: [CI, K] },
    { t: "ludia", m: "Johnson, Samuel", k: "Johnson", r: 1709, v: "anglický spisovateľ (1709 – 1784), autor slovníka angličtiny", o: [CI] },
    { t: "ludia", m: "Boswell, James", k: "Boswell", r: 1740, v: "škótsky spisovateľ (1740 – 1795), životopisec Samuela Johnsona", o: [CI] },
    { t: "ludia", m: "Smith, Sydney", k: "Smith", r: 1771, v: "anglický kňaz a spisovateľ (1771 – 1845), známy svojím vtipom", o: [CI] },
    { t: "ludia", m: "Orwell, George", k: "Orwell", r: 1903, v: "anglický spisovateľ (1903 – 1950), autor kníh Zvieracia farma a 1984", o: [CI] },
    { t: "ludia", m: "Lewis, C. S.", k: "Lewis", r: 1898, v: "britský spisovateľ (1898 – 1963), autor Letopisov Narnie", o: [CI] },
    { t: "ludia", m: "Hooper, Walter", k: "Hooper", r: 1931, v: "americký spisovateľ (1931 – 2020), tajomník a priateľ C. S. Lewisa", o: [CI] },
    { t: "ludia", m: "Pinero, Arthur Wing", k: "Pinero", r: 1855, v: "anglický divadelný autor (1855 – 1934)", o: [CI] },
    { t: "ludia", m: "Seton, Ernest Thompson", k: "Seton", r: 1860, v: "spisovateľ, maliar a prírodovedec (1860 – 1946)", o: [CI] },

    // ---- Autori kníh a kresieb ----
    { t: "autori", m: "Roussin, Antoine", k: "Roussin", r: 1819, v: "litograf z ostrova Réunion (1819 – 1894), nakreslil Edmonda", o: [V] },
    { t: "autori", m: "Thomé, Otto Wilhelm", k: "Thome", r: 1840, v: "nemecký botanik a kresliar rastlín (1840 – 1925)", o: [R] },
    { t: "autori", m: "Köhler, Hermann Adolph", k: "Kohler", r: 1834, v: "nemecký lekár a chemik (1834 – 1879), podľa neho sa volá kniha kresieb liečivých rastlín", o: [M, V] },
    { t: "autori", m: "Čtvrtek, Václav", k: "Ctvrtek", r: 1911, v: "český spisovateľ rozprávok (1911 – 1976), vymyslel Kremienka a Vochomúrku", o: [F("veltatea", "VeltaTea")] },
    { t: "autori", m: "Smetana, Zdeněk", k: "Smetana", r: 1925, v: "český ilustrátor (1925 – 2016), nakreslil Kremienka a Vochomúrku", o: [F("veltatea", "VeltaTea")] },
    { t: "autori", m: "Mozoláková, Diana", k: "Mozolakova", r: null, v: "autorka knihy Liečivá sila divokých byliniek", o: [K] },
    { t: "autori", m: "Dugasová, Aurélia", k: "Dugasova", r: null, v: "spoluautorka atlasu Babkine bylinky", o: [K] },
    { t: "autori", m: "Dugas, Dionýz", k: "Dugas", r: null, v: "spoluautor atlasu Babkine bylinky", o: [K] },
    { t: "autori", m: "Chaudhuri, K. N.", k: "Chaudhuri", r: null, v: "historik, písal o obchode Východoindickej spoločnosti", o: [C] },
    { t: "autori", m: "Richardson, D.", k: "Richardson", r: null, v: "historik, písal o cukre a obchode v 18. storočí", o: [C] },
    { t: "autori", m: "Hutková", k: "Hutkova", r: null, v: "historička, písala o predaji čaju v Británii", o: [C] },

    // ---- Postavy z mýtov, Biblie a rozprávok ----
    { t: "postavy", m: "Hádes", k: "Hades", v: "grécky boh podsvetia", o: [G, M] },
    { t: "postavy", m: "Perzefona", k: "Perzefona", p: true, v: "grécka bohyňa, dcéra Deméter; zjedla zrnká granátového jablka", o: [G, M] },
    { t: "postavy", m: "Deméter", k: "Demeter", v: "grécka bohyňa úrody, matka Perzefony", o: [G] },
    { t: "postavy", m: "Minthé", k: "Minthe", p: true, v: "nymfa z gréckej povesti, premenená na mätu", o: [M] },
    { t: "postavy", m: "Adam", k: "Adam", v: "biblická postava, prvý človek", o: [G] },
    { t: "postavy", m: "Eva", k: "Eva", v: "biblická postava, prvá žena", o: [G] },
    { t: "postavy", m: "Xanat, princezná", k: "Xanat", p: true, v: "postava z legendy Totonakov o vanilke", o: [V] },
    { t: "postavy", m: "Krakonoš", k: "Krakonos", v: "vládca Krkonôš z českých povestí", o: [F("krakonosovo", "Krakonošovo čarobejlí")] },
    { t: "postavy", m: "Kremienok", k: "Kremienok", v: "rozprávková postavička Václava Čtvrtka", o: [F("veltatea", "VeltaTea")] },
    { t: "postavy", m: "Vochomúrka", k: "Vochomurka", v: "rozprávková postavička Václava Čtvrtka", o: [F("veltatea", "VeltaTea")] },

    // ---- Mená na vrecúškach ----
    { t: "caj", m: "Earl Grey", k: "Earl Grey", v: "meno čaju podľa britského premiéra Charlesa Greya, grófa Greya (1764 – 1845)", o: [F("twinings", "Twinings"), F("sonnentor", "Sonnentor"), F("pickwick", "Pickwick"), F("teekanne", "Teekanne")] },
    { t: "caj", m: "Mary Grey", k: "Mary Grey", v: "meno čaju Sonnentor, ovocná obdoba čaju Earl Grey", o: [F("sonnentor", "Sonnentor")] },
    { t: "caj", m: "Lord Nelson", k: "Lord Nelson", p: true, v: "meno značky čaju obchodov Lidl", o: [N, F("lord_nelson", "Lord Nelson"), KO] },
    { t: "caj", m: "Sir Winston", k: "Sir Winston", v: "meno značky čaju; na logu je pán v cylindri", o: [F("sir_winston", "Sir Winston Tea")] },
    { t: "caj", m: "Pickwick", k: "Pickwick", v: "meno značky čaju podľa pána Pickwicka z románu Charlesa Dickensa", o: [F("pickwick", "Pickwick")] }
  ];
})();
