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
    [".trust-strip > div", 90],
    [".section-heading", 0],
    [".steps > li", 100],
    [".feature-grid > article", 120],
    [".screen", 0],
    [".install > *", 120],
    [".persian-grid > p", 100],
    ["footer > *", 80],
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
    { rootMargin: "0px 0px -9%", threshold: 0.08 },
  );

  revealItems.forEach((element) => observer.observe(element));

  const heroArt = document.querySelector(".hero-art");
  const desktop = window.matchMedia("(min-width: 901px)");
  let animationFrame = 0;

  const updateDepth = () => {
    animationFrame = 0;
    if (!heroArt || !desktop.matches) {
      heroArt?.style.removeProperty("--hero-shift");
      return;
    }

    const shift = Math.min(window.scrollY * 0.075, 42);
    heroArt.style.setProperty("--hero-shift", `${shift}px`);
  };

  const requestDepthUpdate = () => {
    if (animationFrame) return;
    animationFrame = window.requestAnimationFrame(updateDepth);
  };

  updateDepth();
  window.addEventListener("scroll", requestDepthUpdate, { passive: true });
  desktop.addEventListener("change", updateDepth);

  reduceMotion.addEventListener("change", (event) => {
    if (!event.matches) return;
    observer.disconnect();
    revealItems.forEach((element) => element.classList.add("is-visible"));
    heroArt?.style.removeProperty("--hero-shift");
  });
})();
