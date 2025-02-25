import "../css/base.css";
import "../css/index.css";

import { gsap } from 'gsap';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


gsap.registerPlugin(ScrollToPlugin);

// Dynamic viewport height calculation for mobile
function setVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVh();
window.addEventListener('resize', setVh);

// On page load, animate hero text
document.addEventListener('DOMContentLoaded', () => {
  const tl = gsap.timeline();
  tl.to('.hero-text h1', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
    .to('.hero-text p', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.5')
    .to('.hero-text a', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.5');

  // Full-screen sections swipe functionality
  const sections = document.querySelectorAll('.full-screen');
  let isAnimating = false;
  let currentSectionIndex = 0;

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;
    isAnimating = true;
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: sections[index], autoKill: false },
      ease: "power2.inOut",
      onComplete: () => {
        isAnimating = false;
        currentSectionIndex = index;
      }
    });
  }

  // Handle wheel events (desktop)
  window.addEventListener("wheel", (e) => {
    if (isAnimating) return;

    if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
      scrollToSection(currentSectionIndex + 1);
    } else if (e.deltaY < 0 && currentSectionIndex > 0) {
      scrollToSection(currentSectionIndex - 1);
    }
  });

  // Handle keydown events (arrow keys, page up/down, space)
  window.addEventListener("keydown", (e) => {
    if (isAnimating) return;
    
    if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
      if (currentSectionIndex < sections.length - 1) {
        scrollToSection(currentSectionIndex + 1);
      }
    }
    if (e.key === "ArrowUp" || e.key === "PageUp") {
      if (currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1);
      }
    }
  });

  // Touch events for swipe on mobile
  let touchStartY = 0;
  let touchEndY = 0;

  window.addEventListener("touchstart", (e) => {
    touchStartY = e.changedTouches[0].screenY;
  });

  window.addEventListener("touchend", (e) => {
    if (isAnimating) return;
    touchEndY = e.changedTouches[0].screenY;
    const deltaY = touchStartY - touchEndY;
    
    // Sensitivity threshold for swipe
    const threshold = 50;
    if (deltaY > threshold && currentSectionIndex < sections.length - 1) {
      scrollToSection(currentSectionIndex + 1);
    } else if (deltaY < -threshold && currentSectionIndex > 0) {
      scrollToSection(currentSectionIndex - 1);
    }
  });
});
