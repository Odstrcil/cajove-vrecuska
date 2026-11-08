// Čajový kalendár. Poradie v zozname nevadí, stránka si ho zoradí sama.
// rok: ak nie je známy alebo nejde o výročie, nechať null.
// priblizne: true, ak presný deň nie je známy.
// vlastny: true pri našich vlastných vymyslených sviatkoch (dostanú hviezdičku).
// druh: aký je to deň – jedno zo slov v zozname KALENDAR_DRUHY nižšie.
// odkaz: stránka, kde je o tom dni viac (ak taká je), napr. "moja_zbierka_firma.html?firma=lipton".
// odkaz_text: čo sa napíše na odkaz.
window.KALENDAR = [
  {
    den: 10, mesiac: 5, rok: 1848,
    nazov: "Narodil sa Thomas Lipton",
    popis: "V škótskom Glasgowe sa narodil obchodník Thomas Lipton. Jeho meno dodnes nesie jedna z najznámejších čajových značiek na svete.",
    priblizne: false, vlastny: false, druh: "osobnost",
    odkaz: "svet_caju_lipton.html#thomas", odkaz_text: "Príbeh Thomasa Liptona"
  },
  {
    den: 21, mesiac: 5, rok: null,
    nazov: "Medzinárodný deň čaju",
    popis: "Deň čaju vyhlásila Organizácia Spojených národov. Prvýkrát sa oslavoval v roku 2020.",
    priblizne: false, vlastny: false, druh: "sviatok"
  },
  {
    den: 2, mesiac: 10, rok: 1931,
    nazov: "Zomrel Thomas Lipton",
    popis: "Zakladateľ čajovej značky Lipton zomrel v Londýne. Pochovaný je v rodnom Glasgowe. Celý život túžil vyhrať slávne preteky jácht – päťkrát to skúsil a päťkrát prehral, no vždy s úsmevom.",
    priblizne: false, vlastny: false, druh: "osobnost",
    odkaz: "svet_caju_lipton.html#thomas", odkaz_text: "Príbeh Thomasa Liptona"
  },
  {
    den: 15, mesiac: 12, rok: null,
    nazov: "Deň čaju v krajinách, kde čaj rastie",
    popis: "Od roku 2005 si ho pripomínajú najmä krajiny, kde sa čaj pestuje, napríklad India, Srí Lanka či Nepál.",
    priblizne: false, vlastny: false, druh: "sviatok"
  },
  {
    den: 16, mesiac: 12, rok: 1773,
    nazov: "Bostonské pitie čaju",
    popis: "Americkí osadníci na protest proti britským daniam vysypali do bostonského prístavu stovky truhlíc čaju. Udalosť patrí k začiatkom americkej revolúcie.",
    priblizne: false, vlastny: false, druh: "historia"
  }
  // Náš sviatok – stránka prvý raz vyšla na internete 8. 11. 2026
  ,{
    den: 8, mesiac: 11, rok: 2026,
    nazov: "Narodeniny Sveta čajových vrecúšok",
    popis: "V tento deň sa táto stránka prvý raz ukázala na internete. Všetko najlepšie – a dajme si na to šálku čaju!",
    priblizne: false, vlastny: true, druh: "vlastny"
  }
];

// Druhy dní: značka, ktorá sa ukáže pred názvom, a jej vysvetlenie v legende.
window.KALENDAR_DRUHY = {
  historia: { znacka: "📜", nazov: "historická udalosť" },
  osobnost: { znacka: "👤", nazov: "osobnosť" },
  sviatok:  { znacka: "🍵", nazov: "čajový sviatok" },
  firma:    { znacka: "🏭", nazov: "firma a značka" },
  rastlina: { znacka: "🌿", nazov: "rastlina a zber" },
  predmet:  { znacka: "🫖", nazov: "predmet a vynález" },
  vlastny:  { znacka: "⭐", nazov: "náš vlastný sviatok" }
};
