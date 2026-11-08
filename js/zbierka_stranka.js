// Stránky Moja zbierka: zoznam firiem (moja_zbierka.html) a vrecúška jednej firmy
// (moja_zbierka_firma.html?firma=<id>). Údaje sú v js/zbierka.js.
(function () {
  // Skupiny písmen v abecede nad zoznamom firiem.
  var SKUPINY = [["A", "D"], ["E", "J"], ["K", "N"], ["O", "S"], ["T", "Z"]];

  function el(tag, trieda, text) {
    var e = document.createElement(tag);
    if (trieda) e.className = trieda;
    if (text) e.textContent = text;
    return e;
  }

  // 1 vrecúško, 2–4 vrecúška, 5 a viac vrecúšok.
  function vrecusok(n) {
    if (n === 1) return "1 vrecúško";
    if (n >= 2 && n <= 4) return n + " vrecúška";
    return n + " vrecúšok";
  }

  function firmy() {
    return (window.ZBIERKA || []).slice().sort(function (a, b) {
      return a.nazov.localeCompare(b.nazov, "sk");
    });
  }

  function cesta(firma, cislo, strana) {
    return "obrazky/zbierka/" + firma.id + "/" + cislo + "_" + strana + ".jpg";
  }

  function odkazNaFirmu(firma, cislo) {
    return "moja_zbierka_firma.html?firma=" + encodeURIComponent(firma.id) + (cislo ? "#v" + cislo : "");
  }

  // Prvé písmeno bez mäkčeňov a dĺžňov (Č → C), aby sedelo so skupinami.
  function zaciatocne(nazov) {
    return nazov.charAt(0).normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
  }

  // ---- Zoznam firiem ----
  function zoznamFirmiem() {
    var zoznam = document.getElementById("zoznam-firiem");
    if (!zoznam) return;
    var vsetky = firmy();
    var spolu = 0;
    var prvaVSkupine = {};

    vsetky.forEach(function (f) {
      spolu += f.vrecuska.length;
      var li = el("li", "firma");
      var pismeno = zaciatocne(f.nazov);
      SKUPINY.forEach(function (s, i) {
        if (pismeno >= s[0] && pismeno <= s[1] && !prvaVSkupine[i]) { prvaVSkupine[i] = true; li.id = "skupina-" + i; }
      });
      var a = el("a");
      a.href = odkazNaFirmu(f);
      var prve = f.vrecuska[0];
      if (prve) {
        var img = el("img");
        img.src = cesta(f, prve.cislo, "p_male");
        img.alt = "";
        img.width = 300; img.height = 350;
        img.loading = "lazy";
        a.appendChild(img);
      }
      var text = el("span", "firma-text");
      text.appendChild(el("span", "firma-nazov", f.nazov));
      text.appendChild(el("span", "firma-pocet", vrecusok(f.vrecuska.length)));
      a.appendChild(text);
      li.appendChild(a);
      zoznam.appendChild(li);
    });

    var pocet = document.getElementById("pocet-zbierky");
    if (pocet) pocet.textContent = "Zatiaľ naskenovaných: " + vrecusok(spolu) + " z " +
      (vsetky.length === 1 ? "1 firmy" : vsetky.length + " firiem") + ". Ďalšie pribúdajú.";

    var abeceda = document.getElementById("abeceda");
    if (abeceda) {
      SKUPINY.forEach(function (s, i) {
        var text = s[0] + "–" + s[1];
        if (prvaVSkupine[i]) {
          var a = el("a", null, text);
          a.href = "#skupina-" + i;
          abeceda.appendChild(a);
        } else {
          abeceda.appendChild(el("span", "prazdna", text));
        }
      });
    }

    pripravHladanie(vsetky);
  }

  // ---- Hľadanie čaju podľa názvu, prekladu, rastliny alebo firmy ----
  function pripravHladanie(vsetky) {
    var pole = document.getElementById("hladat");
    var vysledky = document.getElementById("vysledky");
    if (!pole || !vysledky) return;

    function bezDiakritiky(t) {
      return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    }

    pole.addEventListener("input", function () {
      var hladane = bezDiakritiky(pole.value.trim());
      vysledky.textContent = "";
      if (hladane.length < 2) return;
      var najdene = 0;
      vsetky.forEach(function (f) {
        f.vrecuska.forEach(function (v) {
          var kde = bezDiakritiky([f.nazov, v.nazov, v.preklad, (v.rastliny || []).join(" ")].join(" "));
          if (kde.indexOf(hladane) === -1) return;
          najdene++;
          var li = el("li");
          var a = el("a", null, f.nazov + " " + v.cislo + " – " + v.nazov);
          a.href = odkazNaFirmu(f, v.cislo);
          li.appendChild(a);
          if (v.preklad) li.appendChild(el("span", "vysledok-preklad", " (" + v.preklad + ")"));
          vysledky.appendChild(li);
        });
      });
      if (!najdene) vysledky.appendChild(el("li", "nic", "Taký čaj v zbierke zatiaľ nemám."));
    });
  }

  // ---- Vrecúška jednej firmy ----
  function stranaFirmy() {
    var box = document.getElementById("firma");
    if (!box) return;
    var id = new URLSearchParams(location.search).get("firma");
    var f = (window.ZBIERKA || []).filter(function (x) { return x.id === id; })[0];
    if (!f) {
      box.appendChild(el("h1", null, "Firma sa nenašla"));
      var p = el("p");
      var spat = el("a", null, "Späť na zoznam firiem");
      spat.href = "moja_zbierka.html";
      p.appendChild(spat);
      box.appendChild(p);
      return;
    }
    document.title = f.nazov + " – Moja zbierka – Svet čajových vrecúšok";
    box.appendChild(el("h1", null, f.nazov));
    box.appendChild(el("p", "uvod", vrecusok(f.vrecuska.length) + " v zbierke. Kliknutím na vrecúško uvidíte prednú aj zadnú stranu."));
    if (f.o_firme) box.appendChild(el("p", "o-firme", f.o_firme));
    if (f.odkaz) {
      var p2 = el("p", "o-firme");
      var a2 = el("a", null, f.odkaz.text);
      a2.href = f.odkaz.subor;
      p2.appendChild(a2);
      box.appendChild(p2);
    }

    var mriezka = el("ul", "vrecuska");
    f.vrecuska.forEach(function (v) {
      var li = el("li");
      var tlacidlo = el("button", "vrecusko");
      tlacidlo.type = "button";
      var img = el("img");
      img.src = cesta(f, v.cislo, "p_male");
      img.alt = "";
      img.width = 300; img.height = 350;
      img.loading = "lazy";
      tlacidlo.appendChild(img);
      tlacidlo.appendChild(el("span", "vrecusko-cislo", v.cislo));
      tlacidlo.appendChild(el("span", "vrecusko-nazov", v.nazov));
      tlacidlo.addEventListener("click", function () { ukaz(f, v); });
      li.appendChild(tlacidlo);
      mriezka.appendChild(li);
    });
    box.appendChild(mriezka);

    // Odkaz z iných stránok môže otvoriť priamo jedno vrecúško: ...?firma=lipton#v002
    var m = location.hash.match(/^#v(\d{3})$/);
    if (m) {
      var v = f.vrecuska.filter(function (x) { return x.cislo === m[1]; })[0];
      if (v) ukaz(f, v);
    }
  }

  // Zväčšené vrecúško v okne nad stránkou.
  function ukaz(f, v) {
    var okno = document.getElementById("okno-vrecuska");
    var obsah = document.getElementById("okno-obsah");
    var nadpis = f.nazov + " " + v.cislo + " – " + v.nazov;
    obsah.textContent = "";
    obsah.appendChild(el("h2", null, nadpis));
    okno.setAttribute("aria-label", nadpis);
    if (v.preklad) obsah.appendChild(el("p", "okno-preklad", v.preklad));

    var strany = el("div", "okno-strany");
    [["p", "predná strana"], ["z", "zadná strana"]].forEach(function (s) {
      var fig = el("figure");
      var a = el("a");
      a.href = cesta(f, v.cislo, s[0]);
      var img = el("img");
      img.src = cesta(f, v.cislo, s[0]);
      img.alt = "Vrecúško " + f.nazov + " " + v.nazov + ", " + s[1];
      a.appendChild(img);
      fig.appendChild(a);
      fig.appendChild(el("figcaption", null, s[1].charAt(0).toUpperCase() + s[1].slice(1)));
      strany.appendChild(fig);
    });
    obsah.appendChild(strany);

    var dl = el("dl", "okno-udaje");
    function riadok(nazov, hodnota) {
      if (!hodnota) return;
      dl.appendChild(el("dt", null, nazov));
      var dd = el("dd");
      if (typeof hodnota === "string") dd.textContent = hodnota; else dd.appendChild(hodnota);
      dl.appendChild(dd);
    }
    riadok("Na obale", v.na_obale);
    riadok("Príprava", v.priprava);
    if (v.rastliny && v.rastliny.length) {
      var r = document.createDocumentFragment();
      var stranky = window.RASTLINY_STRANKY || {};
      v.rastliny.forEach(function (meno, i) {
        if (i) r.appendChild(document.createTextNode(", "));
        if (stranky[meno]) {
          var a = el("a", null, meno);
          a.href = stranky[meno];
          r.appendChild(a);
        } else {
          r.appendChild(document.createTextNode(meno));
        }
      });
      riadok("Rastliny", r);
    }
    riadok("Poznámka", v.poznamka);
    obsah.appendChild(dl);

    // Dole: listovanie na susedné vrecúško tej istej firmy a veľké tlačidlo Zavrieť.
    var poradie = f.vrecuska.indexOf(v);
    var spodok = el("div", "okno-spodok");
    function tlacidlo(text, trieda, akcia) {
      var b = el("button", trieda, text);
      b.type = "button";
      b.addEventListener("click", akcia);
      spodok.appendChild(b);
    }
    if (poradie > 0) tlacidlo("‹ Predošlé", "okno-krok", function () { ukaz(f, f.vrecuska[poradie - 1]); });
    else spodok.appendChild(el("span"));
    tlacidlo("Zavrieť", "okno-zavriet-dole", function () { okno.close(); });
    if (poradie < f.vrecuska.length - 1) tlacidlo("Ďalšie ›", "okno-krok", function () { ukaz(f, f.vrecuska[poradie + 1]); });
    else spodok.appendChild(el("span"));
    obsah.appendChild(spodok);
    okno.scrollTop = 0;

    zmenAdresu("#v" + v.cislo);
    if (okno.open) return;
    if (okno.showModal) okno.showModal(); else okno.setAttribute("open", "");
  }

  function pripravOkno() {
    var okno = document.getElementById("okno-vrecuska");
    if (!okno) return;
    document.getElementById("okno-zavriet").addEventListener("click", function () { okno.close(); });
    // Klik mimo obsahu okna ho zavrie.
    okno.addEventListener("click", function (e) { if (e.target === okno) okno.close(); });
    okno.addEventListener("close", function () { zmenAdresu(location.pathname + location.search); });
  }

  // Adresa v prehliadači ukazuje otvorené vrecúško (dá sa skopírovať a poslať).
  // Pri otvorení stránky priamo zo súboru to niektoré prehliadače nedovolia – vtedy sa nič nestane.
  function zmenAdresu(adresa) {
    try { history.replaceState(null, "", adresa); } catch (e) { /* stránka otvorená zo súboru */ }
  }

  document.addEventListener("DOMContentLoaded", function () {
    pripravOkno();
    zoznamFirmiem();
    stranaFirmy();
  });
})();
