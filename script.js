gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Initialize matchMedia
const mm = gsap.matchMedia();
console.log("matchMedia initialized:", mm);
// Initialize variables and settings
let speed = 100;
// Calculate height excluding #mushroom
gsap.set("#mushroom", { display: "none" });
let height = document.querySelector("svg").getBBox().height;
gsap.set("#mushroom", { display: "block" });
// Dynamic centering for mushroom
const mushroom = document.querySelector("#mushroom");
const bbox = mushroom.getBBox();
const canvasWidth = 750;
const canvasHeight = 500;
const centerX = canvasWidth / 2 - bbox.width / 2;
const centerY = canvasHeight / 2 - bbox.height / 2;
gsap.set("#mushroom", {
  opacity: 0,
  scale: 0,
  transformOrigin: "50% 50%",
  x: centerX,
  y: centerY - 20,
});

// Center and size the halo circles too
const haloRadius = bbox.width / 2.8; // Or tweak to bbox.height / 2 if it's taller
gsap.set("#halo_outer", {
  cx: centerX + 176,
  cy: centerY + 172,
  r: 0,
  opacity: 0,
});

gsap.set("#h2-1", { opacity: 0, y: 500 });
gsap.set("#h2-4", { opacity: 0, y: 500 });
gsap.set("#h2-5", { opacity: 0, y: 500 });
gsap.set("#h2-6", { opacity: 0, y: 500 });
// gsap.set("#bg_grad", { attr: { cy: "-50" } }); // Removed - using linear now
gsap.set("#scene3", { y: height - 40, visibility: "visible" });
gsap.set("#fstar", { y: -550 });
gsap.set("#info", { y: -50 });
gsap.set("#cloudStart-R", { y: 10 });
gsap.set("#cloudStart-L", { y: 0 });
gsap.set("#bird", { opacity: 0, x: -800, scaleX: 1, rotation: 0 });
// gsap.set("#birdy", { opacity: 0, x: -800, scaleX: 1, rotation: 0 });
gsap.set("#findAndEatYou", { opacity: 0 });

// Set initial cloud opacity to ensure visibility on load
gsap.set(["#cloudStart-L", "#cloudStart-R"], { opacity: 0.7 });

// Desktop-only cloud y adjustment to prevent nav clip on wide screens
mm.add(
  {
    isDesktop: "(min-width: 1068px)",
  },
  (context) => {
    const { isDesktop } = context.conditions;
    if (isDesktop) {
      gsap.set("#cloudStart-R", { y: 40 });
      gsap.set("#cloudStart-L", { y: 30 });
    }
    return () => {}; // Cleanup if needed
  }
);

// Particle effect code
document.addEventListener("DOMContentLoaded", () => {
  let clickCount = 0;
  let particleAlpha = 0;
  let fadeOut = false;
  let fadeStartTime = null;
  let fadeFromAlpha = 0;
  let animationId = null;
  const particles = [];
  const canvas = document.querySelector("#particle-canvas");
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Generate 1500 particles
    for (let i = 0; i < 1500; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 5 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        speed: Math.random() * 2 + 1,
        angle: Math.random() * Math.PI * 2,
      });
    }
    // Quadratic ease-out function
    const easeOutQuad = (t) => t * (2 - t);
    // Animation loop
    const animate = (timestamp) => {
      const ctx = canvas.getContext("2d");
      // Handle fade out
      if (fadeOut) {
        if (!fadeStartTime) fadeStartTime = timestamp || performance.now();
        const elapsed = (timestamp || performance.now()) - fadeStartTime;
        const progress = Math.min(elapsed / 3000, 1);
        particleAlpha = fadeFromAlpha * (1 - easeOutQuad(progress));
        if (progress >= 1) {
          particleAlpha = 0;
          fadeOut = false;
          fadeStartTime = null;
          fadeFromAlpha = 0;
          clickCount = 0;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          cancelAnimationFrame(animationId);
          animationId = null;
          // Reset nav-menu styles in desktop mode
          const navMenu = document.querySelector(".nav-menu");
          if (window.innerWidth >= 768 && navMenu) {
            navMenu.style.position = "fixed";
            navMenu.style.top = "0";
            navMenu.style.left = "0";
            navMenu.style.width = "100%";
            navMenu.style.height = "auto";
            navMenu.style.padding = "10px";
            navMenu.style.display = "flex";
            navMenu.style.pointerEvents = "auto";
            console.log(
              "Nav menu styles reset after particle effect:",
              navMenu.style.cssText
            );
          }
          return;
        }
      }
      // Semi-transparent fill for trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Set alpha for particles
      ctx.globalAlpha = particleAlpha;
      particles.forEach((p) => {
        p.angle += (Math.random() - 0.5) * 0.2;
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        if (p.x < -p.radius) p.x = canvas.width + p.radius;
        if (p.x > canvas.width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = canvas.height + p.radius;
        if (p.y > canvas.height + p.radius) p.y = -p.radius;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };
    // Click handler for #myco-trip
    const tripLink = document.getElementById("myco-trip");
    if (tripLink) {
      tripLink.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (fadeOut) return;
        clickCount += 1;
        let targetAlpha;
        switch (clickCount) {
          case 1:
            targetAlpha = 1.0;
            break;
          default:
            fadeOut = true;
            fadeStartTime = null;
            fadeFromAlpha = particleAlpha;
            return;
        }
        particleAlpha = targetAlpha;
        if (!animationId) {
          animationId = requestAnimationFrame(animate);
        }
      });
    }
    // Global click handler to trigger fade-out
    document.addEventListener("click", (e) => {
      if (e.target.closest(".nav-menu")) return;
      if (clickCount === 1 && particleAlpha > 0 && !fadeOut) {
        fadeOut = true;
        fadeStartTime = null;
        fadeFromAlpha = particleAlpha;
      }
    });
    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.forEach((p) => {
        p.x = Math.random() * canvas.width;
        p.y = Math.random() * canvas.height;
      });
      // Clamp cloudStart y to ceiling on resize (prevents nav clip on wide screens)
      const clouds = ["#cloudStart-L", "#cloudStart-R"];
      clouds.forEach((id) => {
        const currentY = gsap.getProperty(id, "y");
        gsap.set(id, { y: Math.max(currentY, -20) });
      });
    };
    window.addEventListener("resize", handleResize);
  }
  const bindHamburgerEvents = () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);
    if (navMenu && newHamburger && window.innerWidth <= 767) {
      newHamburger.addEventListener("click", () => {
        newHamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        if (newHamburger.classList.contains("active")) {
          gsap.to(".line:nth-child(1)", {
            y: 7,
            rotation: 45,
            transformOrigin: "50% 50%",
            duration: 0.3,
            ease: "power3.out",
          });
          gsap.to(".line:nth-child(2)", {
            opacity: 0,
            duration: 0.2,
            ease: "power3.out",
          });
          gsap.to(".line:nth-child(3)", {
            y: -7,
            rotation: -45,
            transformOrigin: "50% 50%",
            duration: 0.3,
            ease: "power3.out",
          });
          gsap.to(".nav-menu", { left: 0, duration: 0.5, ease: "power3.out" });
        } else {
          gsap.to(".line:nth-child(1)", {
            y: 0,
            rotation: 0,
            transformOrigin: "50% 50%",
            duration: 0.3,
            ease: "power3.out",
          });
          gsap.to(".line:nth-child(2)", {
            opacity: 1,
            duration: 0.2,
            ease: "power3.out",
          });
          gsap.to(".line:nth-child(3)", {
            y: 0,
            rotation: 0,
            transformOrigin: "50% 50%",
            duration: 0.3,
            ease: "power3.out",
          });
          gsap.to(".nav-menu", {
            left: "-100%",
            duration: 0.4,
            ease: "power3.in",
          });
        }
      });
      newHamburger.addEventListener("mouseenter", () => {
        gsap.to(".hamburger", {
          scale: 1.1,
          backgroundColor: "rgba(0,0,0,0.7)",
          duration: 0.2,
          ease: "power3.out",
        });
      });
      newHamburger.addEventListener("mouseleave", () => {
        gsap.to(".hamburger", {
          scale: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          duration: 0.2,
          ease: "power3.out",
        });
      });
      const navLinks = document.querySelectorAll(".nav-menu a");
      navLinks.forEach((link) => {
        link.removeEventListener("click", closeMenu);
        link.addEventListener("click", closeMenu);
      });
      function closeMenu() {
        newHamburger.classList.remove("active");
        navMenu.classList.remove("active");
        gsap.to(".line:nth-child(1)", {
          y: 0,
          rotation: 0,
          transformOrigin: "50% 50%",
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.to(".line:nth-child(2)", {
          opacity: 1,
          duration: 0.2,
          ease: "power3.out",
        });
        gsap.to(".line:nth-child(3)", {
          y: 0,
          rotation: 0,
          transformOrigin: "50% 50%",
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.to(".nav-menu", {
          left: "-100%",
          duration: 0.4,
          ease: "power3.in",
        });
      }
    } else if (!newHamburger || !navMenu) {
      console.warn("Hamburger or nav-menu not found in DOM");
    }
  };
  bindHamburgerEvents();

// Get Involved scroll handler
const involvedLink = document.getElementById('involved');
if (involvedLink) {
  involvedLink.addEventListener('click', (e) => {
    e.preventDefault();
    gsap.to(window, { scrollTo: "max", duration: 1 });
  });
}

  window.addEventListener("resize", bindHamburgerEvents);
  const musicToggle = document.querySelector("#musicToggle");
  const bgMusic = document.querySelector("#bgMusic");
  if (musicToggle && bgMusic) {
    let isPlaying = false; // Global-ish for state preservation across modes
    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        const { isMobile, isDesktop } = context.conditions;
        console.log(
          `Music toggle setup for ${isDesktop ? "desktop" : "mobile"}`
        );
        const musicPulse = gsap.timeline({ paused: true, repeat: -1 });
        musicPulse
          .to("#musicToggle", { scale: 1.2, duration: 0.5, ease: "power2.out" })
          .to("#musicToggle", { scale: 1, duration: 0.2, ease: "power2.in" });
        const onClick = () => {
          if (isPlaying) {
            bgMusic.pause();
            musicPulse.pause();
            gsap.to("#musicToggle", {
              scale: 1,
              duration: 0.2,
              ease: "power3.out",
            });
            musicToggle.textContent = "🔇";
            isPlaying = false;
          } else {
            bgMusic.play().catch((error) => {
              console.warn("Audio play failed:", error);
            });
            musicPulse.play();
            musicToggle.textContent = "🔊";
            isPlaying = true;
          }
        };
        const onEnter = () => {
          if (!isPlaying) {
            gsap.to("#musicToggle", {
              scale: 1.1,
              backgroundColor: "rgba(0,0,0,0.7)",
              duration: 0.2,
              ease: "power3.out",
            });
          }
        };
        const onLeave = () => {
          if (!isPlaying) {
            gsap.to("#musicToggle", {
              scale: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              duration: 0.2,
              ease: "power3.out",
            });
          }
        };
        musicToggle.addEventListener("click", onClick);
        musicToggle.addEventListener("mouseenter", onEnter);
        musicToggle.addEventListener("mouseleave", onLeave);
        // Restore state after mode switch (revert clears inline, so re-apply if playing)
        if (isPlaying) {
          musicPulse.play();
          musicToggle.textContent = "🔊";
        } else {
          musicToggle.textContent = "🔇";
        }
        // Force a quick set to ensure base positioning
        gsap.set("#musicToggle", { clearProps: "scale" }); // Clears any lingering scale, but pulse will override if playing
        // Cleanup function to remove listeners on mode change
        return () => {
          musicToggle.removeEventListener("click", onClick);
          musicToggle.removeEventListener("mouseenter", onEnter);
          musicToggle.removeEventListener("mouseleave", onLeave);
        };
      }
    );
  } else {
    console.warn("musicToggle or bgMusic not found in DOM");
  }
  const whitepaperLink = document.getElementById("whitepaper-link");
  const popup = document.getElementById("whitepaper-popup");
  if (whitepaperLink && popup) {
    whitepaperLink.addEventListener("click", (e) => {
      e.preventDefault();
      popup.classList.add("active");
      document.body.style.overflow = "hidden";
    });
    popup.addEventListener("click", () => {
      popup.classList.remove("active");
      document.body.style.overflow = "";
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && popup.classList.contains("active")) {
        popup.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  const roadmapLink = document.getElementById("roadmap-link");
  const popupRM = document.getElementById("roadmap-popup");
  if (roadmapLink && popupRM) {
    roadmapLink.addEventListener("click", (e) => {
      e.preventDefault();
      popupRM.classList.add("active");
      document.body.style.overflow = "hidden";
    });
    popupRM.addEventListener("click", () => {
      popupRM.classList.remove("active");
      document.body.style.overflow = "";
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && popupRM.classList.contains("active")) {
        popupRM.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }
  // Cloud drift animations (moved inside for timing, removed opacity to avoid override)
  const cloudDriftL = gsap.to("#cloudStart-L", {
    x: 100,
    duration: 10,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    overwrite: false, // Lets scroll timeline override x/opacity when needed
    onStart: () => console.log("Cloud L drifting"),
  });
  const cloudDriftR = gsap.to("#cloudStart-R", {
    x: -100,
    duration: 15,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    overwrite: false,
    onStart: () => console.log("Cloud R drifting"),
  });
  // Optional: Pause drifts when scrolled past the initial scene (uncomment if you want to stop animation off-screen)
  /*
  ScrollTrigger.create({
    trigger: ".scrollElement",
    start: "top top",
    end: "100vh top", // Adjust to roughly match your scene1 scroll distance (~ first viewport or ~1143px if precise)
    onLeave: () => {
      cloudDriftL.pause();
      cloudDriftR.pause();
    },
    onEnterBack: () => {
      cloudDriftL.play();
      cloudDriftR.play();
    }
  });
  */
});
// Color-cycling timeline
const tl = gsap.timeline({
  repeat: -1,
  yoyo: true,
  onStart: () => console.log("Color cycling started"),
});
const colors = [
  "#ff0000",
  "#00ff00",
  "#ff00eeff",
  "#ff0026ff",
  "#0044ffff",
  "#ff4500",
  "#aa00ffff",
  "#ddff00ff",
  "#fb007dff",
  "#1aff00ff",
];
const selectors = [
  "#info",
  "#scene2_text_a",
  "#scene2_text_b",
  "#scene2_text_c",
  "#scene2_text_d",
  "#findAndEatYou",
  "#scene3_text",
];
selectors.forEach((selector, index) => {
  const shiftedColors = [...colors.slice(index), ...colors.slice(0, index)];
  shiftedColors.forEach((color, colorIndex) => {
    tl.to(
      selector,
      {
        fill: color,
        duration: 1,
        ease: "none",
      },
      colorIndex + index * 0.2
    );
  });
});
// Twinkling stars
gsap.fromTo(
  "#stars path:nth-of-type(1)",
  { opacity: 0.3 },
  { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 0.8 }
);
gsap.fromTo(
  "#stars path:nth-of-type(3)",
  { opacity: 0.3 },
  { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.8 }
);
gsap.fromTo(
  "#stars path:nth-of-type(5)",
  { opacity: 0.3 },
  { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1 }
);
gsap.fromTo(
  "#stars path:nth-of-type(8)",
  { opacity: 0.3 },
  { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.2 }
);
gsap.fromTo(
  "#stars path:nth-of-type(11)",
  { opacity: 0.3 },
  { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 0.5 }
);
gsap.fromTo(
  "#stars path:nth-of-type(15)",
  { opacity: 0.3 },
  { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 2 }
);
gsap.fromTo(
  "#stars path:nth-of-type(17)",
  { opacity: 0.3 },
  { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.1 }
);
gsap.fromTo(
  "#stars path:nth-of-type(18)",
  { opacity: 0.3 },
  { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.4 }
);
gsap.fromTo(
  "#stars path:nth-of-type(25)",
  { opacity: 0.3 },
  { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.1 }
);
gsap.fromTo(
  "#stars path:nth-of-type(28)",
  { opacity: 0.3 },
  { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 0.9 }
);
gsap.fromTo(
  "#stars path:nth-of-type(30)",
  { opacity: 0.3 },
  { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.3 }
);
gsap.fromTo(
  "#stars path:nth-of-type(35)",
  { opacity: 0.3 },
  { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 2 }
);
gsap.fromTo(
  "#stars path:nth-of-type(40)",
  { opacity: 0.3 },
  { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 0.8 }
);
gsap.fromTo(
  "#stars path:nth-of-type(45)",
  { opacity: 0.3 },
  { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.8 }
);
gsap.fromTo(
  "#stars path:nth-of-type(48)",
  { opacity: 0.3 },
  { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1 }
);
// Main scroll-based timeline
let mainTimeline = gsap.timeline();
ScrollTrigger.create({
  animation: mainTimeline,
  trigger: ".scrollElement",
  start: "top top",
  end: "8000 bottom",
  scrub: 1,
  markers: false,
  invalidateOnRefresh: true,
});
// Scene 1
mainTimeline.add("scene1", 0);
mainTimeline.to(
  "#h1-1",
  { y: 3 * speed, x: 1 * speed, scale: 0.9, ease: "power1.in", duration: 1 },
  "scene1"
);
mainTimeline.to(
  "#h1-2",
  { y: 2.6 * speed, x: -0.6 * speed, ease: "power1.in", duration: 1 },
  "scene1"
);
mainTimeline.to(
  "#h1-3",
  { y: 1.7 * speed, x: 1.2 * speed, duration: 1 },
  "scene1+=0.03"
);
mainTimeline.to(
  "#h1-4",
  { y: 3 * speed, x: 1 * speed, duration: 1 },
  "scene1+=0.03"
);
mainTimeline.to(
  "#h1-5",
  { y: 2 * speed, x: 1 * speed, duration: 1 },
  "scene1+=0.03"
);
mainTimeline.to(
  "#h1-6",
  { y: 2.3 * speed, x: -2.5 * speed, duration: 1 },
  "scene1"
);
mainTimeline.to(
  "#h1-7",
  { y: 5 * speed, x: 1.6 * speed, duration: 1 },
  "scene1"
);
mainTimeline.to(
  "#h1-8",
  { y: 3.5 * speed, x: 0.2 * speed, duration: 1 },
  "scene1"
);
mainTimeline.to(
  "#h1-9",
  { y: 3.5 * speed, x: -0.2 * speed, duration: 1 },
  "scene1"
);
mainTimeline.to(
  "#cloudsBig-L",
  {
    y: 4.5 * speed,
    x: -0.2 * speed,
    duration: 1,
  },
  "scene1"
);
mainTimeline.to(
  "#cloudsBig-R",
  {
    y: 4.5 * speed,
    x: -0.2 * speed,
    duration: 1,
  },
  "scene1"
);
mainTimeline.to(
  "#cloudStart-L",
  { x: -300, opacity: 0, duration: 1, ease: "power1.out" },
  "scene1"
);
mainTimeline.to(
  "#cloudStart-R",
  { x: 300, opacity: 0, duration: 1, ease: "power1.out" },
  "scene1"
);
mainTimeline.to("#info", { y: 8 * speed, duration: 1 }, "scene1");
mainTimeline.set(
  ["#cloudStart-L", "#cloudStart-R"],
  { opacity: 0 },
  "scene1+=1"
);
// Clouds
mainTimeline.to("#cloud1", { x: 700, duration: 1 }, "scene1");
mainTimeline.to("#cloud2", { x: 1000, duration: 1 }, "scene1");
mainTimeline.to("#cloud3", { x: -1000, duration: 1 }, "scene1");
mainTimeline.to(
  "#cloud4",
  { x: -700, y: 25, duration: 1, modifiers: { y: (y) => Math.max(y, -20) } },
  "scene1"
);
// Sun motion and background (sky shift instead of cy)
mainTimeline.add("sunStart", 0.06);
// Animate sky linear's y1 from high up (darker top) to full cover
mainTimeline.fromTo(
  "#sky_linear",
  { attr: { y1: "-0.2" } }, // Starts "above" viewport for dramatic top
  { attr: { y1: "0" }, duration: 1 },
  "sunStart"
);
// Keep sun stop anims on bg_grad (now only up to nth-child(5))
mainTimeline.to(
  "#bg_grad stop:nth-child(2)",
  { attr: { offset: "0.15" }, duration: 1 },
  "sunStart"
);
mainTimeline.to(
  "#bg_grad stop:nth-child(3)",
  { attr: { offset: "0.18" }, duration: 1 },
  "sunStart"
);
mainTimeline.to(
  "#bg_grad stop:nth-child(4)",
  { attr: { offset: "0.25" }, duration: 1 },
  "sunStart"
);
mainTimeline.to(
  "#bg_grad stop:nth-child(5)",
  { attr: { offset: "0.46" }, duration: 1 },
  "sunStart"
);
mainTimeline.fromTo(
  "#scene2_text_a",
  { opacity: 0, y: 1210 },
  { opacity: 1, y: -210, duration: 1 },
  "sunStart+=0.15"
);
mainTimeline.fromTo(
  "#scene2_text_b",
  { opacity: 0, y: 1210 },
  { opacity: 1, y: -210, duration: 1 },
  "sunStart+=0.15"
);
mainTimeline.fromTo(
  "#scene2_text_c",
  { opacity: 0, y: 1210 },
  { opacity: 1, y: -210, duration: 1 },
  "sunStart+=0.15"
);
mainTimeline.fromTo(
  "#scene2_text_d",
  { opacity: 0, y: 1210 },
  { opacity: 1, y: -210, duration: 1 },
  "sunStart+=0.15"
);
// Scene 2
mainTimeline.add("scene2", 0.9);
mainTimeline.fromTo(
  "#h2-1",
  { y: 500, opacity: 0 },
  { y: 0, opacity: 1, duration: 1 },
  "scene2"
);
mainTimeline.fromTo(
  "#h2-2",
  { y: 500, opacity: 0 },
  { y: 0, opacity: 1, duration: 1 },
  "scene2+=0.1"
);
mainTimeline.fromTo(
  "#h2-3",
  { y: 700, opacity: 0 },
  { y: 0, opacity: 1, duration: 1 },
  "scene2+=0.1"
);
mainTimeline.fromTo(
  "#h2-4",
  { y: 500, opacity: 0 },
  { y: 0, opacity: 1, duration: 1 },
  "scene2+=0.2"
);
mainTimeline.fromTo(
  "#h2-5",
  { y: 500, opacity: 0 },
  { y: 0, opacity: 1, duration: 1 },
  "scene2+=0.1"
);
mainTimeline.fromTo(
  "#h2-6",
  { y: 500, opacity: 0 },
  { y: 0, opacity: 1, duration: 1 },
  "scene2+=0.1"
);
// New matchMedia for #mushroom animation
mm.add(
  {
    isMobile: "(max-width: 767px)",
    isDesktop: "(min-width: 768px)",
  },
  (context) => {
    const { isMobile, isDesktop } = context.conditions;
    console.log(
      "Mushroom animation added at sunIncrease, Mobile:",
      isMobile,
      "Desktop:",
      isDesktop
    );
    mainTimeline
      .fromTo(
        "#mushroom",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 0.55,
          duration: 1.8,
          ease: "power2.out",
          onStart: () => console.log("Mushroom fading in full-sized!"),
        },
        "sunIncrease"
      )
      .fromTo(
        "#halo_outer",
        { r: 0, opacity: 0, strokeWidth: 0 },
        {
          r: haloRadius * 0.9,
          opacity: 1,
          strokeWidth: 6,
          duration: 1.8,
          ease: "power2.out",
          onComplete: () => {
            // Fire the swirl on halo complete (100 cycles for long hypnotic loop)
            gsap.to("#rainbow_grad", {
              duration: 2, // Per cycle—slower for visible color chase
              ease: "none",
              repeat: 99, // 100 total cycles (initial + 99 repeats)
              onUpdate: function () {
                const progress = this.progress();
                const rotation = 360 * progress;
                document
                  .querySelector("#rainbow_grad")
                  .setAttribute(
                    "gradientTransform",
                    `rotate(${rotation} 200 200)`
                  ); // Adjust 200 200 to your SVG center if needed
              },
              onStart: () => console.log("Gradient swirl started on complete!"),
            });
          },
        },
        "sunIncrease"
      );
  }
);
// Sun increase
mainTimeline.add("sunIncrease", 2);
mainTimeline.to(
  "#scene2_text_a",
  { opacity: 0, x: -800, duration: 1 },
  "sunIncrease+=0.1"
);
mainTimeline.to(
  "#scene2_text_b",
  { opacity: 0, x: 800, duration: 1 },
  "sunIncrease+=0.1"
);
mainTimeline.to(
  "#scene2_text_c",
  { opacity: 0, x: -800, duration: 1 },
  "sunIncrease+=0.1"
);
mainTimeline.to(
  "#scene2_text_d",
  { opacity: 0, x: 800, duration: 1 },
  "sunIncrease+=0.1"
);
// Animate sky linear bottom stop for "sunset" darkening
mainTimeline.to(
  "#sky_linear stop:nth-child(2)",
  { attr: { "stop-color": "#45224A" }, duration: 1 },
  "sunIncrease"
);
mainTimeline.to(
  "#lg4 stop:nth-child(1)",
  { attr: { "stop-color": "#623951" }, duration: 1 },
  "sunIncrease"
);
mainTimeline.to(
  "#lg4 stop:nth-child(2)",
  { attr: { "stop-color": "#261F36" }, duration: 1 },
  "sunIncrease"
);
mainTimeline.add("mushroomFade", 4); // Hover pause ends here, but no fade—just holds
mainTimeline.add("findAndEatEnter", 6.25);
mainTimeline.fromTo(
  "#findAndEatYou",
  { opacity: 0 },
  {
    opacity: 1,
    y: -100,
    duration: 0.5,
    onStart: () => console.log("findAndEatYou animating!"),
  },
  "findAndEatEnter"
);
// Mushroom quick shrink/dart synced to text enter (relative from center)
mainTimeline.to(
  "#halo_outer, #mushroom",
  {
    scale: 0.3,
    //x: "+=75", // Gentle right nudge from center
    y: "+=150", // Mild down drop
    opacity: 0,
    duration: 0.5,
    ease: "power2.inOut",
    onStart: () => console.log("Mushroom shrinking and darting away!"),
  },
  "findAndEatEnter"
);
mainTimeline.add("findAndEatFade", 8.25);
mainTimeline.to(
  "#findAndEatYou",
  {
    opacity: 0,
    duration: 0.75,
    onStart: () => console.log("findAndEatYou fading out!"),
  },
  "findAndEatFade"
);
// Transition (Scene 2 to Scene 3)
mainTimeline.add("sceneTransition", 8.5);
mainTimeline.to(
  "#h2-1",
  {
    y: -height - 100,
    scale: 1.5,
    transformOrigin: "50% 50%",
    duration: 1,
    onStart: () => console.log("Scene transition starting!"),
  },
  "sceneTransition"
);
mainTimeline.to(
  "#h2-2",
  { opacity: 0, y: -height - 100, duration: 1, ease: "power1.out" },
  "sceneTransition"
);
mainTimeline.to(
  "#h2-3",
  { opacity: 0, y: -height - 100, duration: 1, ease: "power1.out" },
  "sceneTransition"
);
mainTimeline.to(
  "#h2-4",
  { opacity: 0, y: -height - 100, duration: 1, ease: "power1.out" },
  "sceneTransition"
);
mainTimeline.to(
  "#h2-5",
  { opacity: 0, y: -height - 100, duration: 1, ease: "power1.out" },
  "sceneTransition"
);
mainTimeline.to(
  "#h2-6",
  { opacity: 0, y: -height - 100, duration: 1, ease: "power1.out" },
  "sceneTransition"
);
// Compress sky linear y2 for transition fade-out vibe
mainTimeline.to(
  "#sky_linear",
  { attr: { y2: "0.8" }, duration: 1 },
  "sceneTransition"
);
mainTimeline.to("#bg2", { y: 0, duration: 1 }, "sceneTransition");
// Scene 3
mainTimeline.add("scene3", 8.7);
mainTimeline.fromTo(
  "#h3-1",
  { y: 300 },
  { y: -550, duration: 1, onStart: () => console.log("Scene 3 starting!") },
  "scene3"
);
mainTimeline.fromTo(
  "#h3-2",
  { y: 800 },
  { y: -550, duration: 1 },
  "scene3+=0.03"
);
mainTimeline.fromTo(
  "#h3-3",
  { y: 600 },
  { y: -550, duration: 1 },
  "scene3+=0.06"
);
mainTimeline.fromTo(
  "#h3-4",
  { y: 800 },
  { y: -550, duration: 1 },
  "scene3+=0.09"
);
mainTimeline.fromTo(
  "#h3-5",
  { y: 1000 },
  { y: -550, duration: 1 },
  "scene3+=0.12"
);
mainTimeline.fromTo(
  "#stars",
  { opacity: 0 },
  { opacity: 0.5, y: -500, duration: 1 },
  "scene3"
);
mainTimeline.fromTo(
  "#scene3_text",
  { opacity: 0 },
  { opacity: 0.7, y: -710, duration: 1 },
  "scene3+=0.25"
);
mainTimeline.to("#bg2-grad", { attr: { cy: 600 }, duration: 1 }, "scene3");
mainTimeline.to("#bg2-grad", { attr: { r: 500 }, duration: 1 }, "scene3");
// Reset sky linear y2 to full after transition
mainTimeline.to("#sky_linear", { attr: { y2: "1" }, duration: 0.5 }, "scene3");
// Handle #x-logo and #t-logo with matchMedia
mm.add(
  {
    isMobile: "(max-width: 767px)",
    isDesktop: "(min-width: 768px)",
  },
  (context) => {
    const { isMobile, isDesktop } = context.conditions;
    mainTimeline.fromTo(
      "#x-logo",
      { opacity: 0, scale: 0 },
      { opacity: 0.7, y: -200, x: 280, scale: 0.5, duration: 1 },
      "scene3+=0.15"
    );
    mainTimeline.fromTo(
      "#t-logo",
      { opacity: 0, x: 1000, scale: 0 },
      { opacity: 0.7, y: -210, x: 390, scale: 0.65, duration: 1 },
      "scene3+=0.15"
    );
  }
);
// Bird
gsap.to("#bird", {
  opacity: 1,
  y: -250,
  x: 800,
  scaleX: 1,
  rotation: 0,
  ease: "power2.out",
  duration: 1,
  scrollTrigger: {
    trigger: ".scrollElement",
    start: "4% top",
    end: "15% top",
    scrub: 1,
    onEnter: () => gsap.set("#bird", { opacity: 1 }),
    onLeave: () => gsap.set("#bird", { opacity: 0 }),
    onEnterBack: () => gsap.set("#bird", { opacity: 0 }),
    onLeaveBack: () => gsap.set("#bird", { opacity: 0 }),
  },
});


// Falling star
mainTimeline.add("fstar", 9.6);
mainTimeline.set("#fstar", { opacity: 1 }, "fstar");
mainTimeline.to(
  "#fstar",
  {
    x: -800,
    y: -375,
    ease: "power2.out",
    duration: 1,
    onComplete: () => gsap.set("#fstar", { opacity: 0 }),
  },
  "fstar"
);
// Reset scrollbar on refresh
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
