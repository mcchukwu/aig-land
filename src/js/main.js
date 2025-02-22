import '../css/base.css'; 
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // List of digital addresses
  const digitalAds = [
    "LAIK-6798",
    "LAIK-7989",
    "LAIK-8199",
    "LAIK-9676",
    "LAIK-7980",
    "LAIK-9679",
    "LAIK-8897",
    "LAIK-9897",
    "LAIK-8101",
    "LAIK-7786"
  ];

  // Function to select N unique random elements from an array
  function getRandomUniqueElements(arr, count) {
    const shuffled = arr.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }

  // Choose 3 unique digital addresses at random
  const chosenDigitalAds = getRandomUniqueElements(digitalAds, 3);

  // Select the overall parent container
  const container = document.querySelector(".hero-focal-content");

  // Get container dimensions after layout
  const { width, height } = container.getBoundingClientRect();

  // Use only the center third horizontally to avoid edge bubbles
  const horizontalStart = width / 3;
  const horizontalRange = width / 3; 

  // For vertical positioning, spawn bubbles between 50% and 90% of container height - ensures they are not near the top.
  const verticalStart = height * 0.5;
  const verticalRange = height * 0.4;

  chosenDigitalAds.forEach((text) => {
    // Create bubble element
    const bubble = document.createElement("div");
    bubble.classList.add("speech-bubble");
    bubble.textContent = text;
    
    // Random horizontal position within center third
    const randomLeft = Math.floor(Math.random() * horizontalRange) + horizontalStart;
    // Random vertical position between verticalStart and (verticalStart + verticalRange)
    const randomTop = Math.floor(Math.random() * verticalRange) + verticalStart;
    
    bubble.style.left = `${randomLeft}px`;
    bubble.style.top = `${randomTop}px`;

    container.appendChild(bubble);

    // Animate bubble upward based on scroll
    gsap.fromTo(bubble,
      { y: 0, opacity: 0.6 },
      { 
        y: -100, 
        opacity: 1, 
        ease: "none", 
        scrollTrigger: {
          trigger: container,
          start: "top 90%",
          end: "bottom 10%",
          scrub: true,
        }
      }
    );
  });
});
