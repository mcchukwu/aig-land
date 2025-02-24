import "../css/base.css";
import "../css/index.css";

import { gsap } from 'gsap';


document.addEventListener('DOMContentLoaded', () => {
  const tl = gsap.timeline();

  tl.to('.hero-text h1', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
    .to('.hero-text p', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.5')
    .to('.hero-text a', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.5');
});
