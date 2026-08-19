(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const header = document.querySelector(".site-header");

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    return;
  }

  const revealGroups = [
    [".trust-strip > div", 55],
    [".section-heading", 0],
    [".steps > li", 60],
    [".feature-grid > article", 70],
    [".screen", 0],
    [".install > *", 70],
    [".persian-grid > p", 60],
    ["footer > *", 50],
  ];

  const revealItems = [];
  revealGroups.forEach(([selector, stagger]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add("reveal-item");
      element.style.setProperty("--reveal-delay", `${index * stagger}ms`);
      revealItems.push(element);
    });
  });

  document.documentElement.classList.add("motion-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -4%", threshold: 0.04 },
  );

  revealItems.forEach((element) => observer.observe(element));

  reduceMotion.addEventListener("change", (event) => {
    if (!event.matches) return;
    observer.disconnect();
    revealItems.forEach((element) => element.classList.add("is-visible"));
  });
})();
