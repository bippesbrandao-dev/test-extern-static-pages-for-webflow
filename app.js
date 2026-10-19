// Prüft, ob alle Dateien unter dem Mount-Path korrekt geladen werden.
(function () {
  var liste = document.getElementById("checks");
  liste.innerHTML = "";

  function eintrag(text, ok) {
    var li = document.createElement("li");
    li.className = ok === undefined ? "offen" : ok ? "ok" : "fehler";
    li.textContent = text;
    liste.appendChild(li);
    return li;
  }

  // 1. JS selbst
  eintrag("JavaScript geladen (app.js)", true);

  // 2. Pfad anzeigen
  document.getElementById("pfad").textContent = location.pathname;

  // 3. Bilder prüfen
  document.querySelectorAll("img[data-check]").forEach(function (img) {
    var li = eintrag("Bild " + img.dataset.check + " wird geladen …");
    function fertig(ok) {
      li.className = ok ? "ok" : "fehler";
      li.textContent = "Bild " + img.dataset.check + (ok ? " geladen" : " NICHT gefunden (" + img.getAttribute("src") + ")");
    }
    if (img.complete) fertig(img.naturalWidth > 0);
    else {
      img.addEventListener("load", function () { fertig(true); });
      img.addEventListener("error", function () { fertig(false); });
    }
  });

  // 4. JSON per fetch (relativer Pfad)
  var datenLi = eintrag("daten.json wird per fetch geladen …");
  var ausgabe = document.getElementById("daten");
  fetch("./daten.json")
    .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then(function (daten) {
      datenLi.className = "ok";
      datenLi.textContent = "daten.json per fetch geladen";
      ausgabe.innerHTML = "";
      daten.eintraege.forEach(function (e) {
        var li = document.createElement("li");
        li.textContent = e;
        ausgabe.appendChild(li);
      });
    })
    .catch(function (err) {
      datenLi.className = "fehler";
      datenLi.textContent = "daten.json NICHT geladen (" + err.message + ")";
      ausgabe.innerHTML = "<li>Fehler beim Laden</li>";
    });
})();
