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

  const textJourney = document.querySelector(".text-journey");
  const journeyHasRoom = window.matchMedia("(min-width: 901px)");
  if (textJourney && journeyHasRoom.matches) {
    textJourney.classList.add("is-ready");
    const journeyObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        textJourney.classList.add("is-animated");
        journeyObserver.disconnect();
      },
      { rootMargin: "0px 0px -18%", threshold: 0.3 },
    );
    journeyObserver.observe(textJourney);
  }

  const storySteps = [...document.querySelectorAll("[data-story-step]")];
  const storyScenes = [...document.querySelectorAll("[data-story-scene]")];
  const storyCaptions = [...document.querySelectorAll("[data-story-caption]")];
  const storyDots = [...document.querySelectorAll(".story-dots i")];

  const showStoryScene = (name) => {
    storySteps.forEach((step) => step.classList.toggle("is-active", step.dataset.storyStep === name));
    storyScenes.forEach((scene) => scene.classList.toggle("is-active", scene.dataset.storyScene === name));
    storyCaptions.forEach((caption) => caption.classList.toggle("is-active", caption.dataset.storyCaption === name));
    storyDots.forEach((dot, index) => dot.classList.toggle("is-active", storySteps[index]?.dataset.storyStep === name));
  };

  const storyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) showStoryScene(entry.target.dataset.storyStep);
      });
    },
    { rootMargin: "-42% 0px -42%", threshold: 0 },
  );

  storySteps.forEach((step) => storyObserver.observe(step));

  reduceMotion.addEventListener("change", (event) => {
    if (!event.matches) return;
    observer.disconnect();
    storyObserver.disconnect();
    revealItems.forEach((element) => element.classList.add("is-visible"));
  });
})();
