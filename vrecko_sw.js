// Pomocník pre „Zbierku do vrecka“ (vrecko.html): keď nie je internet, podá uložené súbory z mobilu.
// Spustí sa až vtedy, keď niekto na vrecko.html stlačí „Uložiť do mobilu“.
// Iné stránky webu nechá na pokoji – tie idú vždy normálne z internetu.
var CACHE = "zbierka-do-vrecka";

self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });

function patriVrecku(url) {
  if (url.origin !== self.location.origin) return false;
  var p = url.pathname;
  return /\/vrecko\.html$/.test(p) || /\/vrecko\.webmanifest$/.test(p) || /\/js\/zbierka\.js$/.test(p) ||
    /\/obrazky\/vrecko\//.test(p) || /\/obrazky\/zbierka\/.+_p_male\.jpg$/.test(p);
}

// Stránka a zoznam: najprv internet (najviac 4 sekundy), inak uložená verzia.
function najprvInternet(req) {
  return caches.open(CACHE).then(function (cache) {
    var cas = new Promise(function (_, zle) { setTimeout(zle, 4000); });
    return Promise.race([fetch(req), cas]).then(function (r) {
      if (r.ok) cache.put(req, r.clone());
      return r;
    }).catch(function () {
      return cache.match(req, { ignoreSearch: true }).then(function (m) { return m || fetch(req); });
    });
  });
}

// Obrázky: najprv z mobilu, inak z internetu.
function najprvMobil(req) {
  return caches.match(req, { ignoreSearch: true }).then(function (m) { return m || fetch(req); });
}

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url = new URL(e.request.url);
  if (!patriVrecku(url)) return;
  e.respondWith(/\.(jpg|png)$/.test(url.pathname) ? najprvMobil(e.request) : najprvInternet(e.request));
});
