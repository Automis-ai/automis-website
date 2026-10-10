// Loop dell'apertura e comparsa allo scroll. Senza JS o con movimento ridotto tutto resta visibile.
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;

  // video: con movimento ridotto solo il fotogramma che racconta la storia, mai il download del video
  var videos = document.querySelectorAll("video.loop-v");
  videos.forEach(function (v) {
    if (reduce) { v.poster = v.dataset.still; return; }
    if (!hasIO) { v.src = v.dataset.src; v.play(); return; }
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          if (!v.src) v.src = v.dataset.src;
          var p = v.play(); if (p && p.catch) p.catch(function () {});
        } else { v.pause(); }
      });
    }, { threshold: 0.2 }).observe(v);
  });

  // carosello mobile: un puntino per scheda, quello acceso segue lo scorrimento
  document.querySelectorAll(".cards").forEach(function (c) {
    var kids = c.children, dots = document.createElement("div");
    dots.className = "dots"; dots.setAttribute("aria-hidden", "true");
    for (var i = 0; i < kids.length; i++) dots.appendChild(document.createElement("i"));
    c.insertAdjacentElement("afterend", dots);
    var set = function () {
      var step = kids.length > 1 ? kids[1].offsetLeft - kids[0].offsetLeft : 1;
      var n = Math.max(0, Math.min(kids.length - 1, Math.round(c.scrollLeft / (step || 1))));
      Array.prototype.forEach.call(dots.children, function (d, k) { d.className = k === n ? "on" : ""; });
    };
    c.addEventListener("scroll", set, { passive: true }); set();
  });

  if (reduce || !hasIO) return;
  document.documentElement.classList.add("js");

  // le righe del registro entrano una alla volta
  document.querySelectorAll(".log").forEach(function (log) {
    log.querySelectorAll(".row").forEach(function (row, i) {
      row.style.transitionDelay = 180 + i * 260 + "ms";
    });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.18 });
  document.querySelectorAll(".reveal, .log").forEach(function (el) { io.observe(el); });
})();
