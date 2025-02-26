import "../css/base.css";
import "../css/index.css";

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Hero Text Fade-Up Animation
  // =========================
  gsap.timeline()
    .to(".hero-text h1", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    })
    .to(
      ".hero-text p",
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.5"
    )
    .to(
      ".hero-text a",
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.5"
    );

  // =========================
  // Set Initial State for Locations and Pins
  // =========================
  gsap.set(".locations p, .pins .pin", { opacity: 0, y: 20 });

  // =========================
  // Draggable Pins Initialization
  // =========================
  const pinsContainer = document.querySelector(".pins");
  const containerWidth = pinsContainer.offsetWidth;
  const containerHeight = pinsContainer.offsetHeight;
  const safePadding = 20;

  const pins = document.querySelectorAll(".pin");
  pins.forEach((pin) => {
    // Read inline left/top positions
    let left = parseFloat(pin.style.left);
    let top = parseFloat(pin.style.top);
    const pinWidth = pin.offsetWidth;
    const pinHeight = pin.offsetHeight;

    // Ensure pins are not too close to container edges
    if (left < safePadding) left = safePadding;
    else if (left > containerWidth - pinWidth - safePadding)
      left = containerWidth - pinWidth - safePadding;
    if (top < safePadding) top = safePadding;
    else if (top > containerHeight - pinHeight - safePadding)
      top = containerHeight - pinHeight - safePadding;

    // Update inline styles with safe positions
    pin.style.left = left + "px";
    pin.style.top = top + "px";
    // Save original positions for snapping back
    pin.dataset.origLeft = left;
    pin.dataset.origTop = top;

    // Make the pin draggable and snap back on drag end
    Draggable.create(pin, {
      type: "x,y",
      bounds: pinsContainer,
      onDragStart() {
        pin.classList.add("dragging");
      },
      onDragEnd() {
        pin.classList.remove("dragging");
        gsap.to(pin, {
          x: 0,
          y: 0,
          duration: 0.3,
          onComplete() {
            pin.style.transform = "";
          },
        });
      },
    });
  });

  // =========================
  // Proof Section Animations Upon Visibility
  // =========================
  const proofSection = document.querySelector(".proof");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate the proof-number from a near-120 value to 120,000,000,000
          const proofNumberEl = document.querySelector(".proof-number");
          const startVal = 119950000000;
          const endVal = 120000000000;
          proofNumberEl.textContent = startVal.toLocaleString();
          let proofObj = { val: startVal };
          gsap.to(proofObj, {
            val: endVal,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              proofNumberEl.textContent = Math.round(proofObj.val).toLocaleString();
            },
          });

          // Create a timeline for the fade-up animations of locations paragraphs and pins
          gsap.timeline()
            .to(".proof > p:not(.proof-number), .locations p", {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              stagger: 0.2,
            })
            .to(
              ".pins .pin",
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.1,
              },
              "-=0.3"
            );

          obs.unobserve(proofSection);
        }
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(proofSection);
});
