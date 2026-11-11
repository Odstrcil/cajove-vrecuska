// Spoločné správanie všetkých stránok: menu, hrnčeky, citát týždňa, kalendár, novinky.
(function () {
  var MESIACE = ["januára", "februára", "marca", "apríla", "mája", "júna",
                 "júla", "augusta", "septembra", "októbra", "novembra", "decembra"];
  var DEN_MS = 24 * 60 * 60 * 1000;

  function dnesUTC() {
    var d = new Date();
    return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function el(tag, trieda, text) {
    var e = document.createElement(tag);
    if (trieda) e.className = trieda;
    if (text) e.textContent = text;
    return e;
  }

  // Slovenské tvary: 1 deň, 2–4 dni, 5 a viac dní.
  function dni(n) {
    if (n === 1) return "1 deň";
    if (n >= 2 && n <= 4) return n + " dni";
    return n + " dní";
  }

  function datumUdalosti(u) {
    var t = u.den + ". " + MESIACE[u.mesiac - 1];
    if (u.rok) t += " " + u.rok;
    if (u.priblizne) t = "približne " + t;
    return t;
  }

  // ---- Hlavné časti: hrnčeky a menu ----
  function sekcia(id) {
    var s = window.SEKCIE || [];
    for (var i = 0; i < s.length; i++) if (s[i].id === id) return s[i];
    return null;
  }

  function pripravHrnceky() {
    var hrnceky = document.querySelectorAll(".hrncek[data-sekcia]");
    for (var i = 0; i < hrnceky.length; i++) {
      var s = sekcia(hrnceky[i].getAttribute("data-sekcia"));
      if (!s || !s.hotove) {
        hrnceky[i].removeAttribute("href");
        hrnceky[i].classList.add("nepripravene");
      }
    }
  }

  function pripravMenu() {
    var menu = document.getElementById("menu");
    if (!menu) return;
    var polozky = [{ nazov: "Domov", subor: "index.html" }];
    (window.SEKCIE || []).forEach(function (s) { if (s.hotove) polozky.push(s); });
    var aktualna = location.pathname.split("/").pop() || "index.html";
    polozky.forEach(function (p) {
      var a = el("a", null, p.nazov);
      a.href = p.subor;
      // Článok "svet_caju_klipre.html" patrí do časti "svet_caju".
      if (p.subor === aktualna || (p.id && aktualna.indexOf(p.id + "_") === 0)) a.setAttribute("aria-current", "page");
      menu.appendChild(a);
    });
  }

  // ---- Citát týždňa ----
  // Počíta týždne od pondelka 5. 1. 2026, takže sa citát mení každý pondelok.
  function indexTyzdna(pocet) {
    var tyzden = Math.floor((dnesUTC() - Date.UTC(2026, 0, 5)) / (7 * DEN_MS));
    return ((tyzden % pocet) + pocet) % pocet;
  }

  function vyplnCitat(cielovy, c) {
    cielovy.appendChild(el("p", "citat-text", "„" + c.text + "“"));
    if (c.autor) cielovy.appendChild(el("p", "citat-autor", "— " + c.autor));
  }

  function citatTyzdna() {
    var box = document.getElementById("citat-tyzdna");
    var c = window.CITATY || [];
    if (!box || !c.length) return;
    vyplnCitat(box, c[indexTyzdna(c.length)]);
  }

  function zoznamCitatov() {
    var zoznam = document.getElementById("zoznam-citatov");
    var c = window.CITATY || [];
    if (!zoznam || !c.length) return;
    var aktualny = indexTyzdna(c.length);
    c.forEach(function (citat, i) {
      var li = el("li", i === aktualny ? "citat aktualny" : "citat");
      if (i === aktualny) li.appendChild(el("span", "stitok", "Citát tohto týždňa"));
      vyplnCitat(li, citat);
      zoznam.appendChild(li);
    });
    oAutoroch(c);
  }

  // Krátke predstavenie autorov, ktorí majú v zozname aspoň jeden citát.
  function oAutoroch(citaty) {
    var box = document.getElementById("o-autoroch");
    var autori = window.AUTORI || {};
    if (!box) return;
    var mena = [];
    citaty.forEach(function (c) {
      if (c.autor && autori[c.autor] && mena.indexOf(c.autor) === -1) mena.push(c.autor);
    });
    if (!mena.length) return;
    box.appendChild(el("h2", null, "O autoroch"));
    var dl = el("dl", "autori");
    mena.forEach(function (m) {
      dl.appendChild(el("dt", null, m));
      dl.appendChild(el("dd", null, autori[m]));
    });
    box.appendChild(dl);
  }

  // ---- Čajový kalendár ----
  // Koľko dní zostáva do najbližšieho výskytu udalosti (0 = dnes).
  function dniDo(u) {
    var dnes = dnesUTC();
    var rok = new Date(dnes).getUTCFullYear();
    var kedy = Date.UTC(rok, u.mesiac - 1, u.den);
    if (kedy < dnes) kedy = Date.UTC(rok + 1, u.mesiac - 1, u.den);
    return Math.round((kedy - dnes) / DEN_MS);
  }

  function najblizsia() {
    var k = window.KALENDAR || [];
    var naj = null, najDni = Infinity;
    k.forEach(function (u) {
      var d = dniDo(u);
      if (d < najDni) { naj = u; najDni = d; }
    });
    return naj ? { udalost: naj, dni: najDni } : null;
  }

  // Druh dňa (osobnosť, sviatok…). Vlastný sviatok má vždy hviezdičku.
  function druhUdalosti(u) {
    var druhy = window.KALENDAR_DRUHY || {};
    return druhy[u.vlastny ? "vlastny" : u.druh] || null;
  }

  function vyplnUdalost(cielovy, u, kedy) {
    if (kedy) cielovy.appendChild(el("p", "udalost-kedy", kedy));
    cielovy.appendChild(el("p", "udalost-datum", datumUdalosti(u)));
    var nazov = el("p", "udalost-nazov");
    var druh = druhUdalosti(u);
    if (druh) {
      var znacka = el("span", "udalost-znacka", druh.znacka);
      znacka.title = druh.nazov;
      znacka.setAttribute("aria-label", druh.nazov + ":");
      nazov.appendChild(znacka);
      nazov.appendChild(document.createTextNode(" "));
    }
    nazov.appendChild(document.createTextNode(u.nazov));
    cielovy.appendChild(nazov);
    if (u.vlastny) cielovy.appendChild(el("p", "udalost-vlastny", "Náš vlastný čajový sviatok"));
  }

  // Legenda značiek nad celým kalendárom.
  function legendaKalendara() {
    var box = document.getElementById("legenda-kalendara");
    var druhy = window.KALENDAR_DRUHY;
    if (!box || !druhy) return;
    Object.keys(druhy).forEach(function (k) {
      box.appendChild(el("span", "legenda-polozka", druhy[k].znacka + " " + druhy[k].nazov));
    });
  }

  function kalendarNaTitulke() {
    var box = document.getElementById("kalendar-udalost");
    var n = najblizsia();
    if (!box || !n) return;
    var kedy = n.dni === 0 ? "Dnes" : (n.dni === 1 ? "Zajtra" : "O " + dni(n.dni));
    vyplnUdalost(box, n.udalost, kedy);
  }

  function zoznamKalendara() {
    var zoznam = document.getElementById("zoznam-kalendara");
    var k = (window.KALENDAR || []).slice();
    if (!zoznam || !k.length) return;
    var n = najblizsia();
    k.sort(function (a, b) { return a.mesiac - b.mesiac || a.den - b.den; });
    var mesiac = 0;
    k.forEach(function (u) {
      if (u.mesiac !== mesiac) {
        mesiac = u.mesiac;
        var nazovMesiaca = ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl",
                            "August", "September", "Október", "November", "December"][mesiac - 1];
        zoznam.appendChild(el("li", "mesiac", nazovMesiaca));
      }
      var li = el("li", n && n.udalost === u ? "udalost najblizsia" : "udalost");
      if (n && n.udalost === u) li.appendChild(el("span", "stitok", n.dni === 0 ? "Dnes" : "Najbližšie"));
      vyplnUdalost(li, u);
      if (u.popis) li.appendChild(el("p", "udalost-popis", u.popis));
      if (u.odkaz) {
        var p = el("p", "udalost-odkaz");
        var a = el("a", null, (u.odkaz_text || "Viac") + " →");
        a.href = u.odkaz;
        p.appendChild(a);
        li.appendChild(p);
      }
      zoznam.appendChild(li);
    });
  }

  // ---- Čo je nové ----
  function novinky() {
    var zoznam = document.getElementById("novinky");
    if (!zoznam) return;
    var n = (window.NOVINKY || []).slice(0, 10);
    if (!n.length) {
      zoznam.appendChild(el("li", "novinka-prazdna",
        "Stránka sa práve zakladá. Prvé novinky pribudnú spolu s prvými firmami zo zbierky."));
      return;
    }
    n.forEach(function (x, i) {
      var li = el("li", i < 5 ? "novinka" : "novinka navyse");
      li.appendChild(el("span", "novinka-datum", x.datum));
      var a = el("a", null, x.text);
      a.href = x.odkaz;
      li.appendChild(a);
      zoznam.appendChild(li);
    });
    if (n.length > 5) {
      var tlacidlo = el("button", "vrecka-viac", "Ďalšie novinky");
      tlacidlo.type = "button";
      tlacidlo.setAttribute("aria-expanded", "false");
      tlacidlo.addEventListener("click", function () {
        var otvorene = zoznam.classList.toggle("otvorene");
        tlacidlo.textContent = otvorene ? "Ukázať menej" : "Ďalšie novinky";
        tlacidlo.setAttribute("aria-expanded", otvorene ? "true" : "false");
      });
      zoznam.parentNode.appendChild(tlacidlo);
    }
  }

  // ---- Prezeranie obrázkov v článku ----
  // Klik na obrázok ho zväčší v okne nad stránkou. V okne sa dá listovať
  // na ďalší a predošlý obrázok tej istej stránky a veľkým tlačidlom okno zavrieť.
  function prezeracObrazkov() {
    var hlavna = document.querySelector("main");
    if (!hlavna) return;
    var odkazy = [].filter.call(hlavna.querySelectorAll("a[href]"), function (a) {
      return a.querySelector("img") && /\.(jpe?g|png|webp)$/i.test(a.getAttribute("href"));
    });
    if (!odkazy.length) return;

    var okno = el("dialog", "prezerac");
    okno.setAttribute("aria-label", "Zväčšený obrázok");
    var obr = el("img");
    var popis = el("p", "prezerac-popis");
    var pocitadlo = el("p", "prezerac-pocet");
    var spat = el("button", "prezerac-sipka prezerac-spat", "‹");
    var dalej = el("button", "prezerac-sipka prezerac-dalej", "›");
    var zavriet = el("button", "prezerac-zavriet", "Zavrieť");
    spat.type = dalej.type = zavriet.type = "button";
    spat.setAttribute("aria-label", "Predošlý obrázok");
    dalej.setAttribute("aria-label", "Ďalší obrázok");
    var obsah = el("div", "prezerac-obsah");
    obsah.appendChild(obr);
    obsah.appendChild(popis);
    var spodok = el("div", "prezerac-spodok");
    spodok.appendChild(pocitadlo);
    spodok.appendChild(zavriet);
    okno.appendChild(obsah);
    okno.appendChild(spat);
    okno.appendChild(dalej);
    okno.appendChild(spodok);
    document.body.appendChild(okno);

    var aktualny = 0;
    function ukaz(i) {
      aktualny = (i + odkazy.length) % odkazy.length;
      var a = odkazy[aktualny];
      var maly = a.querySelector("img");
      obr.src = a.getAttribute("href");
      obr.alt = maly.alt;
      var fig = a.closest("figure");
      var cap = fig && fig.querySelector("figcaption");
      popis.textContent = cap ? cap.textContent : maly.alt;
      pocitadlo.textContent = odkazy.length > 1 ? (aktualny + 1) + " / " + odkazy.length : "";
      spat.hidden = dalej.hidden = odkazy.length < 2;
    }

    odkazy.forEach(function (a, i) {
      a.addEventListener("click", function (e) {
        if (!okno.showModal) return; // starý prehliadač: obrázok sa otvorí obyčajne
        e.preventDefault();
        ukaz(i);
        okno.showModal();
      });
    });
    spat.addEventListener("click", function () { ukaz(aktualny - 1); });
    dalej.addEventListener("click", function () { ukaz(aktualny + 1); });
    zavriet.addEventListener("click", function () { okno.close(); });
    // Klik na tmavé pozadie okno zavrie.
    okno.addEventListener("click", function (e) { if (e.target === okno) okno.close(); });
    okno.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") ukaz(aktualny - 1);
      if (e.key === "ArrowRight") ukaz(aktualny + 1);
    });
    // Na mobile sa dá listovať aj potiahnutím prstom.
    var zaciatokX = null;
    okno.addEventListener("touchstart", function (e) { zaciatokX = e.touches[0].clientX; }, { passive: true });
    okno.addEventListener("touchend", function (e) {
      if (zaciatokX === null) return;
      var posun = e.changedTouches[0].clientX - zaciatokX;
      if (Math.abs(posun) > 50) ukaz(aktualny + (posun < 0 ? 1 : -1));
      zaciatokX = null;
    });
  }

  // ---- Vrecúška s danou rastlinou (v článkoch o rastlinách) ----
  // Zoznam sa robí sám z js/zbierka.js: stačí, aby malo vrecúško rastlinu
  // zapísanú v "rastliny". Od 10 vrecúšok (želanie Uja Luba) sa najprv ukáže
  // len prvých 5, ostatné až po kliknutí na tlačidlo.
  var ZBALIT_OD = 10, UKAZAT_NAJPRV = 5;

  function vreckaSRastlinou(rastlina) {
    var vysledok = [];
    (window.ZBIERKA || []).slice().sort(function (a, b) {
      return a.nazov.localeCompare(b.nazov, "sk");
    }).forEach(function (f) {
      f.vrecuska.forEach(function (v) {
        if ((v.rastliny || []).indexOf(rastlina) !== -1) vysledok.push({ firma: f, vrecko: v });
      });
    });
    return vysledok;
  }

  function vreckaPriRastline() {
    var boxy = document.querySelectorAll(".vrecka-rastliny[data-rastlina]");
    for (var i = 0; i < boxy.length; i++) vyplnVreckaPriRastline(boxy[i]);
  }

  function vyplnVreckaPriRastline(box) {
    var zoznam = vreckaSRastlinou(box.getAttribute("data-rastlina"));
    if (!zoznam.length) return;
    var pocet = zoznam.length;
    box.appendChild(el("p", "vrecka-pocet", "Naskenované vrecúška: " +
      (pocet === 1 ? "1 vrecúško" : (pocet <= 4 ? pocet + " vrecúška" : pocet + " vrecúšok"))));

    var ul = el("ul", "vrecka-zoznam");
    // Väčší obrázok, ktorý sa na počítači ukáže pri ukázaní myšou na riadok.
    var nahlad = el("img", "vrecka-nahlad");
    nahlad.alt = "";
    nahlad.hidden = true;
    var mys = window.matchMedia && window.matchMedia("(hover: hover)").matches;

    zoznam.forEach(function (x, i) {
      var f = x.firma, v = x.vrecko;
      var li = el("li");
      if (pocet >= ZBALIT_OD && i >= UKAZAT_NAJPRV) li.className = "navyse";
      var a = el("a");
      a.href = "moja_zbierka_firma.html?firma=" + f.id + "#v" + v.cislo;
      var obr = el("img");
      obr.src = "obrazky/zbierka/" + f.id + "/" + v.cislo + "_p_male.jpg";
      obr.alt = "";
      obr.loading = "lazy";
      a.appendChild(obr);
      var text = el("span", "vrecka-text");
      text.appendChild(el("strong", null, f.nazov + " " + v.cislo));
      text.appendChild(document.createTextNode(" – " + v.nazov));
      a.appendChild(text);
      li.appendChild(a);
      if (mys) {
        li.addEventListener("mouseenter", function () {
          nahlad.src = obr.src;
          nahlad.style.top = li.offsetTop + "px";
          nahlad.hidden = false;
        });
        li.addEventListener("mouseleave", function () { nahlad.hidden = true; });
      }
      ul.appendChild(li);
    });

    var obal = el("div", "vrecka-obal");
    obal.appendChild(ul);
    if (mys) obal.appendChild(nahlad);
    box.appendChild(obal);

    var skryte = ul.querySelectorAll("li.navyse");
    if (skryte.length) {
      var tlacidlo = el("button", "vrecka-viac", "Ukázať všetky (" + pocet + ")");
      tlacidlo.type = "button";
      tlacidlo.setAttribute("aria-expanded", "false");
      tlacidlo.addEventListener("click", function () {
        var otvorene = ul.classList.toggle("otvorene");
        tlacidlo.textContent = otvorene ? "Ukázať menej" : "Ukázať všetky (" + pocet + ")";
        tlacidlo.setAttribute("aria-expanded", otvorene ? "true" : "false");
      });
      box.appendChild(tlacidlo);
    }
    box.appendChild(el("p", "male", "Kliknutím na vrecúško ho uvidíte v mojej zbierke aj so zadnou stranou. Zoznam sa dopĺňa sám, ako pribúdajú naskenované obaly."));
  }

  document.addEventListener("DOMContentLoaded", function () {
    vreckaPriRastline();
    prezeracObrazkov();
    pripravMenu();
    pripravHrnceky();
    citatTyzdna();
    zoznamCitatov();
    kalendarNaTitulke();
    legendaKalendara();
    zoznamKalendara();
    novinky();
  });
})();
