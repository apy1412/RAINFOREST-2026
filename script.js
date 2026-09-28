(function () {
  document.documentElement.classList.remove("no-js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Menu overlay */
  var menu = document.querySelector(".menu");
  var openers = document.querySelectorAll("[data-menu-open]");
  var closer = document.querySelector("[data-menu-close]");
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    openers.forEach(function (b) { b.setAttribute("aria-expanded", open ? "true" : "false"); });
    document.body.style.overflow = open ? "hidden" : "";
    if (open) { var first = menu.querySelector("a"); first && first.focus(); }
  }
  openers.forEach(function (b) { b.addEventListener("click", function () { setMenu(true); }); });
  closer && closer.addEventListener("click", function () { setMenu(false); openers[0] && openers[0].focus(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu && menu.classList.contains("open")) setMenu(false); });

  /* Fit giant words to their container width */
  var fits = document.querySelectorAll("[data-fit]");
  function fit() {
    fits.forEach(function (el) {
      var parent = el.parentElement;
      var w = parent.clientWidth - parseFloat(getComputedStyle(parent).paddingLeft) - parseFloat(getComputedStyle(parent).paddingRight);
      el.style.fontSize = "100px";
      var ratio = w / el.scrollWidth;
      el.style.fontSize = Math.floor(100 * ratio * 0.995) + "px";
    });
  }
  if (fits.length) {
    fit();
    document.fonts && document.fonts.ready.then(fit);
    var t; window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(fit, 80); });
  }

  /* Scroll reveals */
  var items = document.querySelectorAll(".reveal, .split-line");
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* Stat counters */
  var stats = document.querySelectorAll("[data-count]");
  function count(el) {
    var end = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduce) { el.textContent = end + suffix; return; }
    var start = performance.now(), dur = 1400;
    (function step(now) {
      var p = Math.min(1, (now - start) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }
  if (stats.length && "IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { count(en.target); so.unobserve(en.target); } });
    }, { threshold: 0.4 });
    stats.forEach(function (s) { so.observe(s); });
  }

  /* Contact form — front-end only. Wire to a real endpoint before launch. */
  var form = document.querySelector("#enquiry");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      form.classList.add("hide");
      var ok = document.querySelector(".form-success");
      ok.classList.add("show");
      ok.setAttribute("tabindex", "-1");
      ok.focus();
    });
  }

  /* Year */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
