gsap.registerPlugin(ScrollTrigger);

// Initialize variables and settings
let speed = 100;
let height = document.querySelector("svg").getBBox().height;
gsap.set("#h2-1", { opacity: 0 });
gsap.set("#bg_grad", { attr: { cy: "-50" } });
gsap.set("#scene3", { y: height - 40, visibility: "visible" });
gsap.set("#fstar", { y: -400 });
gsap.set("#bird", { opacity: 0, x: -800 }); // Hide bird initially

const mm = gsap.matchMedia();
mm.add("(max-width: 1922px)", () => {
  gsap.set(["#cloudStart-L", "#cloudStart-R"], { x: 10, opacity: 1 });
});

// Color-cycling timeline (unchanged, non-scroll-based)
const tl = gsap.timeline({ repeat: -1, yoyo: true });
const colors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#00ffff', '#ff4500', '#9932cc', '#00ced1', '#ff69b4', '#4682b4'];
const selectors = ['#text1', '#text2top', '#text3', '#text4', '#text5', '#text6', '#text7', '#text8', '#text9', '#text10', '#text11', '#text12', '#text13'];
selectors.forEach((selector, index) => {
  const shiftedColors = [...colors.slice(index), ...colors.slice(0, index)];
  shiftedColors.forEach((color, colorIndex) => {
    tl.to(selector, {
      fill: color,
      duration: 1,
      ease: 'none'
    }, colorIndex + (index * 0.2));
  });
});

// Twinkling stars (unchanged, non-scroll-based)
gsap.fromTo("#stars path:nth-of-type(1)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 0.8 });
gsap.fromTo("#stars path:nth-of-type(3)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.8 });
gsap.fromTo("#stars path:nth-of-type(5)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1 });
gsap.fromTo("#stars path:nth-of-type(8)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.2 });
gsap.fromTo("#stars path:nth-of-type(11)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 0.5 });
gsap.fromTo("#stars path:nth-of-type(15)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 2 });
gsap.fromTo("#stars path:nth-of-type(17)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.1 });
gsap.fromTo("#stars path:nth-of-type(18)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.4 });
gsap.fromTo("#stars path:nth-of-type(25)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.1 });
gsap.fromTo("#stars path:nth-of-type(28)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 0.9 });
gsap.fromTo("#stars path:nth-of-type(30)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.3 });
gsap.fromTo("#stars path:nth-of-type(35)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 2 });
gsap.fromTo("#stars path:nth-of-type(40)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 0.8 });
gsap.fromTo("#stars path:nth-of-type(45)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.8 });
gsap.fromTo("#stars path:nth-of-type(48)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1 });

// Main scroll-based timeline
let mainTimeline = gsap.timeline();
ScrollTrigger.create({
  animation: mainTimeline,
  trigger: ".scrollElement",
  start: "top top",
  end: "6000 bottom",
  scrub: 1,
//   markers: true
});

// Scene 1 (starts at "top top" ≈ 0 seconds)
mainTimeline.add("scene1", 0);
mainTimeline.to("#h1-1", { y: 3 * speed, x: 1 * speed, scale: 0.9, ease: "power1.in", duration: 1 }, "scene1");
mainTimeline.to("#h1-2", { y: 2.6 * speed, x: -0.6 * speed, ease: "power1.in", duration: 1 }, "scene1");
mainTimeline.to("#h1-3", { y: 1.7 * speed, x: 1.2 * speed, duration: 1 }, "scene1+=0.03");
mainTimeline.to("#h1-4", { y: 3 * speed, x: 1 * speed, duration: 1 }, "scene1+=0.03");
mainTimeline.to("#h1-5", { y: 2 * speed, x: 1 * speed, duration: 1 }, "scene1+=0.03");
mainTimeline.to("#h1-6", { y: 2.3 * speed, x: -2.5 * speed, duration: 1 }, "scene1");
mainTimeline.to("#h1-7", { y: 5 * speed, x: 1.6 * speed, duration: 1 }, "scene1");
mainTimeline.to("#h1-8", { y: 3.5 * speed, x: 0.2 * speed, duration: 1 }, "scene1");
mainTimeline.to("#h1-9", { y: 3.5 * speed, x: -0.2 * speed, duration: 1 }, "scene1");
mainTimeline.to("#cloudsBig-L", { y: 4.5 * speed, x: -0.2 * speed, duration: 1 }, "scene1");
mainTimeline.to("#cloudsBig-R", { y: 4.5 * speed, x: -0.2 * speed, duration: 1 }, "scene1");
mainTimeline.to("#cloudStart-L", { x: -300, duration: 1 }, "scene1");
mainTimeline.to("#cloudStart-R", { x: 300, duration: 1 }, "scene1");
mainTimeline.to("#info", { y: 8 * speed, duration: 1 }, "scene1");

// Clouds (starts at "top top" ≈ 0 seconds)
mainTimeline.to("#cloud1", { x: 500, duration: 1 }, "scene1");
mainTimeline.to("#cloud2", { x: 1000, duration: 1 }, "scene1");
mainTimeline.to("#cloud3", { x: -1000, duration: 1 }, "scene1");
mainTimeline.to("#cloud4", { x: -700, y: 25, duration: 1 }, "scene1");

// Sun motion and background (starts at "1% top" ≈ 0.06 seconds)
mainTimeline.add("sunStart", 0.06);
mainTimeline.fromTo("#bg_grad", { attr: { cy: "-50" } }, { attr: { cy: "330" }, duration: 1 }, "sunStart");
mainTimeline.to("#bg_grad stop:nth-child(2)", { attr: { offset: "0.15" }, duration: 1 }, "sunStart");
mainTimeline.to("#bg_grad stop:nth-child(3)", { attr: { offset: "0.18" }, duration: 1 }, "sunStart");
mainTimeline.to("#bg_grad stop:nth-child(4)", { attr: { offset: "0.25" }, duration: 1 }, "sunStart");
mainTimeline.to("#bg_grad stop:nth-child(5)", { attr: { offset: "0.46" }, duration: 1 }, "sunStart");
mainTimeline.to("#bg_grad stop:nth-child(6)", { attr: { "stop-color": "#FF9171" }, duration: 1 }, "sunStart");
mainTimeline.fromTo("#scene2_text", { opacity: 0, y: 1210 }, { opacity: 1, y: -210, duration: 1 }, "sunStart+=0.15");

// Scene 2 (starts at "15% top" ≈ 0.9 seconds)
mainTimeline.add("scene2", 0.9);
mainTimeline.fromTo("#h2-1", { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "scene2");
mainTimeline.fromTo("#h2-2", { y: 500 }, { y: 0, duration: 1 }, "scene2+=0.1");
mainTimeline.fromTo("#h2-3", { y: 700 }, { y: 0, duration: 1 }, "scene2+=0.1");
mainTimeline.fromTo("#h2-4", { y: 700 }, { y: 0, duration: 1 }, "scene2+=0.2");
mainTimeline.fromTo("#h2-5", { y: 800 }, { y: 0, duration: 1 }, "scene2+=0.3");
mainTimeline.fromTo("#h2-6", { y: 900 }, { y: 0, duration: 1 }, "scene2+=0.3");

// Sun increase (starts at "2000 top" ≈ 2 seconds)
mainTimeline.add("sunIncrease", 2);
mainTimeline.to("#scene2_text", { opacity: 0, x: -800, duration: 1 }, "sunIncrease+=0.1");
mainTimeline.to("#sun", { attr: { offset: "1.4" }, duration: 1 }, "sunIncrease");
mainTimeline.to("#bg_grad stop:nth-child(2)", { attr: { offset: "0.7" }, duration: 1 }, "sunIncrease");
mainTimeline.to("#sun", { attr: { "stop-color": "#F4F6F0" }, duration: 1 }, "sunIncrease");
mainTimeline.to("#lg4 stop:nth-child(1)", { attr: { "stop-color": "#623951" }, duration: 1 }, "sunIncrease");
mainTimeline.to("#lg4 stop:nth-child(2)", { attr: { "stop-color": "#261F36" }, duration: 1 }, "sunIncrease");
mainTimeline.to("#bg_grad stop:nth-child(6)", { attr: { "stop-color": "#45224A" }, duration: 1 }, "sunIncrease");
mainTimeline.fromTo("#testing2", { opacity: 0 }, { opacity: 1, y: -100, duration: 1 }, "sunIncrease+=0.15");

// Transition (Scene 2 to Scene 3, starts at "60% top" ≈ 3.6 seconds)
mainTimeline.add("sceneTransition", 4);
mainTimeline.to("#h2-1", { y: -height - 100, scale: 1.5, transformOrigin: "50% 50%", duration: 1 }, "sceneTransition");
mainTimeline.to("#bg_grad", { attr: { cy: "-80" }, duration: 1 }, "sceneTransition");
mainTimeline.to("#bg2", { y: 0, duration: 1 }, "sceneTransition");

// Scene 3 (starts at "70% 50%" ≈ 4.2 seconds)
mainTimeline.add("scene3", 4.2);
mainTimeline.fromTo("#h3-1", { y: 300 }, { y: -550, duration: 1 }, "scene3");
mainTimeline.fromTo("#h3-2", { y: 800 }, { y: -550, duration: 1 }, "scene3+=0.03");
mainTimeline.fromTo("#h3-3", { y: 600 }, { y: -550, duration: 1 }, "scene3+=0.06");
mainTimeline.fromTo("#h3-4", { y: 800 }, { y: -550, duration: 1 }, "scene3+=0.09");
mainTimeline.fromTo("#h3-5", { y: 1000 }, { y: -550, duration: 1 }, "scene3+=0.12");
mainTimeline.fromTo("#stars", { opacity: 0 }, { opacity: 0.5, y: -500, duration: 1 }, "scene3");
mainTimeline.fromTo("#scene3_text", { opacity: 0 }, { opacity: 0.7, y: -710, duration: 1 }, "scene3+=0.25");
mainTimeline.to("#bg2-grad", { attr: { cy: 600 }, duration: 1 }, "scene3");
mainTimeline.to("#bg2-grad", { attr: { r: 500 }, duration: 1 }, "scene3");

// Handle #x-logo and #t-logo with matchMedia
const mmedia = gsap.matchMedia();
mmedia.add("(min-width: 768px)", () => {
  mainTimeline.fromTo("#x-logo", { opacity: 0, scale: 0 }, { opacity: 0.7, y: -200, x: 280, scale: 0.5, duration: 1 }, "scene3+=0.15");
  mainTimeline.fromTo("#t-logo", { opacity: 0, x: 1000, scale: 0 }, { opacity: 0.7, y: -210, x: 390, scale: 0.65, duration: 1 }, "scene3+=0.15");
});
mmedia.add("(max-width: 767px)", () => {
  mainTimeline.fromTo("#x-logo", { opacity: 0, scale: 0 }, { opacity: 0.7, y: -200, x: 280, scale: 0.5, duration: 1 }, "scene3+=0.15");
  mainTimeline.fromTo("#t-logo", { opacity: 0, x: 1000, scale: 0 }, { opacity: 0.7, y: -210, x: 390, scale: 0.65, duration: 1 }, "scene3+=0.15");
});

// Bird (starts at "15% top" ≈ 0.9 seconds)
mainTimeline.fromTo(
  "#bird",
  { opacity: 0, x: -800 },
  { opacity: 1, y: -250, x: 800, ease: "power2.out", duration: 1 },
  "scene2"
);
mainTimeline.to(
  "#bird",
  { scaleX: 1, rotation: 0, duration: 0.1 }, // Face right when entering
  "scene2"
);
mainTimeline.to(
  "#bird",
  { scaleX: -1, rotation: -15, duration: 0.1 }, // Face left when exiting
  "scene2+=1" // At the end of the bird’s movement
);
mainTimeline.to(
  "#bird",
  { scaleX: 1, rotation: 0, duration: 0.1 }, // Face right when scrolling back up
  "scene2" // Sync with start for reversal
);

// Falling star (starts at "4200 top" ≈ 4.2 seconds)
mainTimeline.add("fstar", 4.2);
mainTimeline.set("#fstar", { opacity: 1 }, "fstar");
mainTimeline.to("#fstar", { x: -700, y: -250, ease: "power2.out", duration: 1, onComplete: function () {
  gsap.set("#fstar", { opacity: 0 });
}}, "fstar");

// Reset scrollbar on refresh
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};