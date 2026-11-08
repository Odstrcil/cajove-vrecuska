// Zoznam citátov. Každý týždeň sa na titulnej stránke ukáže ďalší v poradí.
// Nový citát pridáte tak, že ho pripíšete na koniec zoznamu.
// autor: meno autora, "príslovie", alebo prázdne "" ak autor nie je.
window.CITATY = [
  { text: "Šálka čaju je malá prestávka, ktorú si človek dopraje uprostred dňa.", autor: "Claude" },
  { text: "Každé vrecúško raz putovalo z ďalekej záhrady až do niečej šálky.", autor: "Claude" },
  { text: "Čaj sa nedá vypiť v zhone – a práve preto je dobrý.", autor: "Claude" },
  { text: "Najlepší čaj je ten, ktorý pijeme s niekým, koho máme radi.", autor: "Claude" },
  { text: "Kým sa čaj lúhuje, je čas zastaviť sa.", autor: "Claude" },
  { text: "Aj obyčajný papierik od čaju môže niesť kúsok sveta.", autor: "Claude" },
  { text: "Pretože som poznal trýzeň smädu, vykopal by som studňu, z ktorej sa môžu napiť iní.", autor: "Ernest Thompson Seton" },
  { text: "Šálka čaju nemôže byť nikdy dosť veľká a kniha nikdy dosť dlhá, aby mi stačili.", autor: "C. S. Lewis" },
  { text: "Kým je čaj, je nádej.", autor: "Arthur Wing Pinero" },
  { text: "Vďaka Bohu za čaj! Čo by si svet bez čaju počal? Som rád, že som sa nenarodil pred čajom.", autor: "Sydney Smith" },
  { text: "Čaj začal ako liek a vyrástol v nápoj.", autor: "Okakura Kakuzó" },
  { text: "Čaj je na to, aby zabavil zaháľajúcich a uvoľnil tých, čo sa učia.", autor: "Samuel Johnson" },
  { text: "Medzitým si dajme dúšok čaju.", autor: "Okakura Kakuzó" },
  { text: "Mám čaj taký rád, že by som mohol napísať celé pojednanie o jeho cnostiach.", autor: "James Boswell" },
  { text: "Čaj sa pre nás stal viac než len spôsobom pitia – je náboženstvom umenia žiť.", autor: "Okakura Kakuzó" },
  { text: "Čaj je jedným z pilierov civilizácie v tejto krajine.", autor: "George Orwell" },
  { text: "Umenie žiť spočíva v neustálom prispôsobovaní sa svojmu okoliu.", autor: "Okakura Kakuzó" }
];

// Krátko o autoroch. Na stránke citátov sa ukážu len tí, ktorých citát v zozname je.
window.AUTORI = {
  "Claude": "Umelá inteligencia, spolutvorca tejto stránky. Pomáha so stavbou webu a občas napíše aj citát.",
  "Ernest Thompson Seton": "Spisovateľ, maliar a prírodovedec (1860 – 1946). Narodil sa v Anglicku, žil v Kanade a v Amerike. Písal príbehy o zvieratách a stál pri začiatkoch skautingu v Amerike. Citát o studni je venovanie na začiatku jeho knihy Dvaja divosi (1903). Preložili sme ho sami z angličtiny.",
  "C. S. Lewis": "Britský spisovateľ narodený v Belfaste (1898 – 1963), autor rozprávkových Letopisov Narnie. Výrok o čaji a knihách zaznamenal jeho priateľ Walter Hooper. Preložili sme ho sami z angličtiny.",
  "Arthur Wing Pinero": "Anglický divadelný autor (1855 – 1934). Veta pochádza z jeho veselohry Sweet Lavender (Sladká levanduľa) z roku 1888. Preložili sme ju sami z angličtiny.",
  "Sydney Smith": "Anglický kňaz a spisovateľ (1771 – 1845), známy svojím vtipom. Preložili sme ho sami z angličtiny.",
  "Okakura Kakuzó": "Japonský znalec umenia (1862 – 1913). V roku 1906 napísal po anglicky slávnu Knihu o čaji (The Book of Tea), z ktorej sú všetky jeho citáty. Preložili sme ich sami z angličtiny.",
  "Samuel Johnson": "Anglický spisovateľ (1709 – 1784), autor slávneho slovníka angličtiny a veľký milovník čaju. Citát je z jeho článku o čaji z roku 1757. Preložili sme ho sami z angličtiny.",
  "James Boswell": "Škótsky spisovateľ (1740 – 1795), priateľ a životopisec Samuela Johnsona. Preložili sme ho sami z angličtiny.",
  "George Orwell": "Anglický spisovateľ (1903 – 1950), autor kníh Zvieracia farma a 1984. Citát je z jeho článku Dobrá šálka čaju (1946), v ktorom dáva jedenásť rád, ako čaj pripraviť. Preložili sme ho sami z angličtiny."
};
