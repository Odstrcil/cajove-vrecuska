/* Kniha návštev.
   Odkazy idú do formulára Google a v tabuľke ich vidí len autor zbierky.
   Na stránke sa zobrazí iba to, čo schváli (hárok „Verejne“). */
(function () {
  var FORMULAR = "https://docs.google.com/forms/d/e/1FAIpQLSdN4fpv9Q5aGZFUjwwJgWdXEWaDHRwxHN5OnwvsdAn0u1_gJg/formResponse";
  var POLE_MENO = "entry.1383813360";
  var POLE_ODKAZ = "entry.1698040726";
  var SCHVALENE = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-w-67OTHKCrNMQS-m7B8ARZpQwzNis0yk45opDypuaexxqhE5Sm8A94LF3MChbBooxdk7IIlSYgm0/pub?gid=1026637691&single=true&output=csv";

  function citajCsv(text) {
    var riadky = [], riadok = [], pole = "", vUvodzovkach = false;
    for (var i = 0; i < text.length; i++) {
      var z = text[i];
      if (vUvodzovkach) {
        if (z === '"' && text[i + 1] === '"') { pole += '"'; i++; }
        else if (z === '"') { vUvodzovkach = false; }
        else { pole += z; }
      } else if (z === '"') { vUvodzovkach = true; }
      else if (z === ",") { riadok.push(pole); pole = ""; }
      else if (z === "\n") { riadok.push(pole); riadky.push(riadok); riadok = []; pole = ""; }
      else if (z !== "\r") { pole += z; }
    }
    if (pole !== "" || riadok.length) { riadok.push(pole); riadky.push(riadok); }
    return riadky;
  }

  /* Z času v tabuľke nechá len dátum. Tabuľka ho môže poslať aj ako číslo. */
  function datum(cas) {
    var t = (cas || "").trim();
    var m = t.match(/^(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})/);
    if (m) { return Number(m[1]) + ". " + Number(m[2]) + ". " + m[3]; }
    if (/^\d+([.,]\d+)?$/.test(t)) {
      var d = new Date(Date.UTC(1899, 11, 30) + parseFloat(t.replace(",", ".")) * 86400000);
      return d.getUTCDate() + ". " + (d.getUTCMonth() + 1) + ". " + d.getUTCFullYear();
    }
    return "";
  }

  function vypis(riadky, ciel) {
    ciel.textContent = "";
    var odkazy = riadky.filter(function (r) { return r[2] && r[2].trim(); });
    if (!odkazy.length) {
      var prazdne = document.createElement("p");
      prazdne.className = "male";
      prazdne.textContent = "Zatiaľ tu nie je žiadny odkaz. Váš môže byť prvý.";
      ciel.appendChild(prazdne);
      return;
    }
    var zoznam = document.createElement("ul");
    zoznam.className = "navstevy";
    odkazy.forEach(function (r) {
      var li = document.createElement("li");
      var text = document.createElement("p");
      text.className = "navsteva-text";
      text.textContent = r[2].trim();
      var podpis = document.createElement("p");
      podpis.className = "navsteva-podpis";
      var kedy = datum(r[0]);
      podpis.textContent = (r[1] || "").trim() + (kedy ? ", " + kedy : "");
      li.appendChild(text);
      li.appendChild(podpis);
      zoznam.appendChild(li);
    });
    ciel.appendChild(zoznam);
  }

  function nacitaj() {
    var ciel = document.getElementById("odkazy");
    fetch(SCHVALENE)
      .then(function (o) { if (!o.ok) { throw new Error(o.status); } return o.text(); })
      .then(function (t) { vypis(citajCsv(t), ciel); })
      .catch(function () { ciel.textContent = "Odkazy sa teraz nepodarilo načítať. Skúste to prosím neskôr."; });
  }

  function odosielanie() {
    var form = document.getElementById("kniha-formular");
    var stav = document.getElementById("kniha-stav");
    var tlacidlo = form.querySelector("button");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var dakujem = "Ďakujeme! Odkaz sa tu objaví, keď ho prečítame a schválime.";
      /* Toto políčko človek nevidí, vypĺňajú ho len roboty. */
      if (form.webova_adresa.value) { stav.textContent = dakujem; form.reset(); return; }
      var meno = form.meno.value.trim(), odkaz = form.odkaz.value.trim();
      if (!meno || !odkaz) { stav.textContent = "Prosím, vyplňte meno aj odkaz."; return; }
      var data = new URLSearchParams();
      data.append(POLE_MENO, meno);
      data.append(POLE_ODKAZ, odkaz);
      tlacidlo.disabled = true;
      stav.textContent = "Odosielam…";
      fetch(FORMULAR, { method: "POST", mode: "no-cors", body: data })
        .then(function () { stav.textContent = dakujem; form.reset(); })
        .catch(function () { stav.textContent = "Odkaz sa nepodarilo odoslať. Skúste to prosím o chvíľu znova."; })
        .then(function () { tlacidlo.disabled = false; });
    });
  }

  function spusti() { nacitaj(); odosielanie(); }
  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", spusti); } else { spusti(); }
})();
