import "../css/index.css";

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

document.addEventListener("DOMContentLoaded", () => {
	// Hero Text Fade-Up Animation
	gsap
		.timeline()
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

	// Set Initial State for Locations and Pins and Mission elements
	gsap.set(".locations p, .pins .pin", { opacity: 0, y: 20 });
	gsap.set(".mission-wrapper h2, .mission-wrapper p", { opacity: 0, y: 20 });
	gsap.set(
		".mission-wrapper .mission-focal .mission-icon-card .mission-focal-icon-wrapper",
		{ scale: 0 }
	);
	gsap.set(
		".mission-wrapper .mission-focal .mission-icon-card .mission-focal-icon-wrapper .mission-focal-icon",
		{ scale: 0 }
	);
	gsap.set(
		".mission-wrapper .mission-focal .mission-icon-card .mission-focal-icon-label",
		{ opacity: 0, y: 20 }
	);

	// Draggable Pins Initialization
	const pinsContainer = document.querySelector(".pins");
	const containerWidth = pinsContainer.offsetWidth;
	const containerHeight = pinsContainer.offsetHeight;
	const safePadding = 20;

	const pins = document.querySelectorAll(".pin");
	pins.forEach((pin) => {
		let left = parseFloat(pin.style.left);
		let top = parseFloat(pin.style.top);
		const pinWidth = pin.offsetWidth;
		const pinHeight = pin.offsetHeight;

		if (left < safePadding) left = safePadding;
		else if (left > containerWidth - pinWidth - safePadding)
			left = containerWidth - pinWidth - safePadding;
		if (top < safePadding) top = safePadding;
		else if (top > containerHeight - pinHeight - safePadding)
			top = containerHeight - pinHeight - safePadding;

		pin.style.left = left + "px";
		pin.style.top = top + "px";
		pin.dataset.origLeft = left;
		pin.dataset.origTop = top;

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

	// Proof Section Animations
	// -----------------------------
	// Animate the proof number individually
	const proofNumberEl = document.querySelector(".proof-number");
	const proofNumberObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const startVal = 119950000000;
					const endVal = 120000000000;
					proofNumberEl.textContent = startVal.toLocaleString();
					let proofObj = { val: startVal };
					gsap.to(proofObj, {
						val: endVal,
						duration: 2,
						ease: "power2.out",
						onUpdate: () => {
							proofNumberEl.textContent = Math.round(
								proofObj.val
							).toLocaleString();
						},
					});
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.5 }
	);
	proofNumberObserver.observe(proofNumberEl);

	// Animate each paragraph in .proof (except the proof number) and .locations
	document
		.querySelectorAll(".proof > p:not(.proof-number), .locations p")
		.forEach((el) => {
			const obs = new IntersectionObserver(
				(entries, observer) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							gsap.to(entry.target, {
								opacity: 1,
								y: 0,
								duration: 1,
								ease: "power2.out",
							});
							observer.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.5 }
			);
			obs.observe(el);
		});

	// Animate each pin individually
	document.querySelectorAll(".pins .pin").forEach((el) => {
		const obs = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						gsap.to(entry.target, {
							opacity: 1,
							y: 0,
							duration: 0.5,
							ease: "power2.out",
						});
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.5 }
		);
		obs.observe(el);
	});

	// Mission Section Animations
	// ------------------
	// Animate each h2 and paragraph in .mission-wrapper
	document
		.querySelectorAll(".mission-wrapper h2, .mission-wrapper p")
		.forEach((el) => {
			const obs = new IntersectionObserver(
				(entries, observer) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							gsap.to(entry.target, {
								opacity: 1,
								y: 0,
								duration: 1,
								ease: "power2.out",
							});
							observer.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.5 }
			);
			obs.observe(el);
		});

	// Animate each mission icon card's icon wrapper
	document
		.querySelectorAll(
			".mission-wrapper .mission-focal .mission-icon-card .mission-focal-icon-wrapper"
		)
		.forEach((el) => {
			const obs = new IntersectionObserver(
				(entries, observer) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							gsap.to(entry.target, {
								scale: 1,
								duration: 1,
								ease: "power2.out",
							});
							observer.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.5 }
			);
			obs.observe(el);
		});

	// Animate each mission icon
	document
		.querySelectorAll(
			".mission-wrapper .mission-focal .mission-icon-card .mission-focal-icon-wrapper .mission-focal-icon"
		)
		.forEach((el) => {
			const obs = new IntersectionObserver(
				(entries, observer) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							gsap.to(entry.target, {
								scale: 1,
								duration: 1.6,
								ease: "power2.out",
							});
							observer.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.5 }
			);
			obs.observe(el);
		});
	// GSAP Hover Effect for Icons
	document
		.querySelectorAll(".mission-icon-card .mission-focal-icon-wrapper")
		.forEach((iconWrapper) => {
      iconWrapper.addEventListener('mouseenter', () => {
        gsap.to(iconWrapper, {
          scale: 1.1,
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
          duration: 0.3,
          ease: "power2.out"
        });
        const icon = iconWrapper.querySelector('.mission-focal-icon');
        if (icon) {
          gsap.to(icon, {
            scale: 1.1,
            duration: 0.9,
            ease: "power2.out"
          });
        }
      });
      iconWrapper.addEventListener('mouseleave', () => {
        gsap.to(iconWrapper, {
          scale: 1,
          boxShadow: "none",
          duration: 0.3,
          ease: "power2.out"
        });
        const icon = iconWrapper.querySelector('.mission-focal-icon');
        if (icon) {
          gsap.to(icon, {
            scale: 1,
            duration: 0.9,
            ease: "power2.out"
          });
        }
      });
		});

	// Animate each mission icon label
	document
		.querySelectorAll(
			".mission-wrapper .mission-focal .mission-icon-card .mission-focal-icon-label"
		)
		.forEach((el) => {
			const obs = new IntersectionObserver(
				(entries, observer) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							gsap.to(entry.target, {
								opacity: 1,
								y: 0,
								duration: 1,
								ease: "power2.out",
							});
							observer.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.5 }
			);
			obs.observe(el);
		});
	// GSAP Hover Effect for labels
  document
		.querySelectorAll(".mission-icon-card .mission-focal-icon-label")
		.forEach((label) => {
			label.addEventListener('mouseenter', () => {
        const iconWrapper = label.nextElementSibling;
        if (iconWrapper) {
          gsap.to(iconWrapper, {
            scale: 1.1,
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
            duration: 0.3,
            ease: "power2.out"
          });
          const icon = iconWrapper.querySelector('.mission-focal-icon');
          if (icon) {
            gsap.to(icon, {
              scale: 1.1,
              duration: 0.9,
              ease: "power2.out"
            });
          }
        }
      });
    
      label.addEventListener('mouseleave', () => {
        const iconWrapper = label.nextElementSibling;
        if (iconWrapper) {
          gsap.to(iconWrapper, {
            scale: 1,
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out"
          });
          const icon = iconWrapper.querySelector('.mission-focal-icon');
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      });
		});
});
