gsap.registerPlugin(ScrollTrigger);
// Initialize variables and settings
let speed = 100;
// Calculate height excluding #mushroom
gsap.set("#mushroom", { display: "none" }); // Hide mushroom for bbox calc
let height = document.querySelector("svg").getBBox().height;
gsap.set("#mushroom", { display: "block" }); // Restore mushroom
gsap.set("#h2-1", { opacity: 0, y: 500 });
gsap.set("#h2-4", { opacity: 0, y: 500 });
gsap.set("#h2-5", { opacity: 0, y: 500 });
gsap.set("#h2-6", { opacity: 0, y: 500 });
gsap.set("#bg_grad", { attr: { cy: "-50" } });
gsap.set("#scene3", { y: height - 40, visibility: "visible" });
gsap.set("#fstar", { y: -400 });
gsap.set("#bird", { opacity: 0, x: -800, scaleX: 1, rotation: 0 });
gsap.set("#mushroom", { opacity: 0, scale: 0, transformOrigin: "50% 100%", x: 198.5, y: 500 }); // Start below screen
gsap.set("#testing2", { opacity: 0 }); // Ensure testing2 is ready
const mm = gsap.matchMedia();
mm.add("(max-width: 1922px)", () => {
  gsap.set(["#cloudStart-L", "#cloudStart-R"], { x: 10, opacity: 1 });
});
mm.add("(max-width: 767px)", () => {
  gsap.set("#mushroom", { x: 198.5, y: 40 * 0.5 }); // Fixed x centering, scaled y
});
// Cloud drift animations
const cloudDriftL = gsap.to("#cloudStart-L", {
  x: 100,
  duration: 10,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true
});
const cloudDriftR = gsap.to("#cloudStart-R", {
  x: -100,
  duration: 15,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true
});
// Color-cycling timeline
const tl = gsap.timeline({ repeat: -1, yoyo: true });
const colors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#00ffff', '#ff4500', '#9932cc', '#00ced1', '#ff69b4', '#4682b4'];
const selectors = ['#info', '#scene2_text', '#scene2_text_a', '#scene2_text_b', '#scene2_text_c', '#testing2', '#scene3_text'];
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
// Twinkling stars
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
  end: "12000 bottom", // Extended for scene3
  scrub: 1,
  markers: false, // Your change
  invalidateOnRefresh: true // Ensure recalculation
});
// Scene 1
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
mainTimeline.to("#cloudStart-L", { x: -300, opacity: 0, duration: 1, ease: "power1.out" }, "scene1");
mainTimeline.to("#cloudStart-R", { x: 300, opacity: 0, duration: 1, ease: "power1.out" }, "scene1");
mainTimeline.to("#info", { y: 8 * speed, duration: 1 }, "scene1");
mainTimeline.set(["#cloudStart-L", "#cloudStart-R"], { opacity: 0 }, "scene1+=1");
// Clouds
mainTimeline.to("#cloud1", { x: 500, duration: 1 }, "scene1");
mainTimeline.to("#cloud2", { x: 1000, duration: 1 }, "scene1");
mainTimeline.to("#cloud3", { x: -1000, duration: 1 }, "scene1");
mainTimeline.to("#cloud4", { x: -700, y: 25, duration: 1 }, "scene1");
// Sun motion and background
mainTimeline.add("sunStart", 0.06);
mainTimeline.fromTo("#bg_grad", { attr: { cy: "-50" } }, { attr: { cy: "330" }, duration: 1 }, "sunStart");
mainTimeline.to("#bg_grad stop:nth-child(2)", { attr: { offset: "0.15" }, duration: 1 }, "sunStart");
mainTimeline.to("#bg_grad stop:nth-child(3)", { attr: { offset: "0.18" }, duration: 1 }, "sunStart");
mainTimeline.to("#bg_grad stop:nth-child(4)", { attr: { offset: "0.25" }, duration: 1 }, "sunStart");
mainTimeline.to("#bg_grad stop:nth-child(5)", { attr: { offset: "0.46" }, duration: 1 }, "sunStart");
mainTimeline.to("#bg_grad stop:nth-child(6)", { attr: { "stop-color": "#FF9171" }, duration: 1 }, "sunStart");
mainTimeline.fromTo("#scene2_text_a", { opacity: 0, y: 1210 }, { opacity: 1, y: -210, duration: 1 }, "sunStart+=0.15");
mainTimeline.fromTo("#scene2_text_b", { opacity: 0, y: 1210 }, { opacity: 1, y: -210, duration: 1 }, "sunStart+=0.15");
mainTimeline.fromTo("#scene2_text_c", { opacity: 0, y: 1210 }, { opacity: 1, y: -210, duration: 1 }, "sunStart+=0.15");
mainTimeline.fromTo("#scene2_text_d", { opacity: 0, y: 1210 }, { opacity: 1, y: -210, duration: 1 }, "sunStart+=0.15");
// Scene 2
mainTimeline.add("scene2", 0.9);
mainTimeline.fromTo("#h2-1", { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "scene2");
mainTimeline.fromTo("#h2-2", { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "scene2+=0.1");
mainTimeline.fromTo("#h2-3", { y: 700, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "scene2+=0.1");
mainTimeline.fromTo("#h2-4", { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "scene2+=0.2");
mainTimeline.fromTo("#h2-5", { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "scene2+=0.1");
mainTimeline.fromTo("#h2-6", { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "scene2+=0.1");
// Sun increase
mainTimeline.add("sunIncrease", 2);
mainTimeline.fromTo("#mushroom", { opacity: 0, scale: 0, y: 500 }, { opacity: 1, scale: 0.8, y: 40, duration: 1, onStart: () => console.log("Mushroom animating!") }, "sunIncrease");
mainTimeline.to("#scene2_text_a", { opacity: 0, x: -800, duration: 1 }, "sunIncrease+=0.1");
mainTimeline.to("#scene2_text_b", { opacity: 0, x: 800, duration: 1 }, "sunIncrease+=0.1");
mainTimeline.to("#scene2_text_c", { opacity: 0, x: -800, duration: 1 }, "sunIncrease+=0.1");
mainTimeline.to("#scene2_text_d", { opacity: 0, x: 800, duration: 1 }, "sunIncrease+=0.1");
mainTimeline.to("#bg_grad stop:nth-child(2)", { attr: { offset: "0.7" }, duration: 1 }, "sunIncrease");
mainTimeline.to("#bg_grad stop:nth-child(6)", { attr: { "stop-color": "#45224A" }, duration: 1 }, "sunIncrease");
mainTimeline.to("#lg4 stop:nth-child(1)", { attr: { "stop-color": "#623951" }, duration: 1 }, "sunIncrease");
mainTimeline.to("#lg4 stop:nth-child(2)", { attr: { "stop-color": "#261F36" }, duration: 1 }, "sunIncrease");
mainTimeline.add("mushroomFade", 4);
mainTimeline.to("#mushroom", { opacity: 0, duration: 0.75, onStart: () => console.log("Mushroom fading out!") }, "mushroomFade");
mainTimeline.add("testing2Enter", 4.25);
mainTimeline.fromTo("#testing2", { opacity: 0 }, { opacity: 1, y: -100, duration: 0.5, onStart: () => console.log("Testing2 animating!") }, "testing2Enter");
mainTimeline.add("testing2Fade", 6.25);
mainTimeline.to("#testing2", { opacity: 0, duration: 0.75, onStart: () => console.log("Testing2 fading out!") }, "testing2Fade");
// Transition (Scene 2 to Scene 3)
mainTimeline.add("sceneTransition", 6.75);
mainTimeline.to("#h2-1", { y: -height - 100, scale: 1.5, transformOrigin: "50% 50%", duration: 1, onStart: () => console.log("Scene transition starting!") }, "sceneTransition");
mainTimeline.to("#h2-2", { opacity: 0, y: -height - 100, duration: 1, ease: "power1.out" }, "sceneTransition");
mainTimeline.to("#h2-3", { opacity: 0, y: -height - 100, duration: 1, ease: "power1.out" }, "sceneTransition");
mainTimeline.to("#h2-4", { opacity: 0, y: -height - 100, duration: 1, ease: "power1.out" }, "sceneTransition");
mainTimeline.to("#h2-5", { opacity: 0, y: -height - 100, duration: 1, ease: "power1.out" }, "sceneTransition");
mainTimeline.to("#h2-6", { opacity: 0, y: -height - 100, duration: 1, ease: "power1.out" }, "sceneTransition");
mainTimeline.to("#bg_grad", { attr: { cy: "-80" }, duration: 1 }, "sceneTransition");
mainTimeline.to("#bg2", { y: 0, duration: 1 }, "sceneTransition");
// Scene 3
mainTimeline.add("scene3", 6.95);
mainTimeline.fromTo("#h3-1", { y: 300 }, { y: -550, duration: 1, onStart: () => console.log("Scene 3 starting!") }, "scene3");
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
mm.add("(min-width: 768px)", () => {
  mainTimeline.fromTo("#x-logo", { opacity: 0, scale: 0 }, { opacity: 0.7, y: -200, x: 280, scale: 0.5, duration: 1 }, "scene3+=0.15");
  mainTimeline.fromTo("#t-logo", { opacity: 0, x: 1000, scale: 0 }, { opacity: 0.7, y: -210, x: 390, scale: 0.65, duration: 1 }, "scene3+=0.15");
});
mm.add("(max-width: 767px)", () => {
  mainTimeline.fromTo("#x-logo", { opacity: 0, scale: 0 }, { opacity: 0.7, y: -200, x: 280, scale: 0.5, duration: 1 }, "scene3+=0.15");
  mainTimeline.fromTo("#t-logo", { opacity: 0, x: 1000, scale: 0 }, { opacity: 0.7, y: -210, x: 390, scale: 0.65, duration: 1 }, "scene3+=0.15");
});
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
    start: "15% top",
    end: "30% top",
    scrub: 1,
    onEnter: () => gsap.set("#bird", { opacity: 1 }),
    onLeave: () => gsap.set("#bird", { opacity: 0 }),
    onEnterBack: () => gsap.set("#bird", { opacity: 0 }),
    onLeaveBack: () => gsap.set("#bird", { opacity: 0 })
  }
});
// Falling star
mainTimeline.add("fstar", 6.95);
mainTimeline.set("#fstar", { opacity: 1 }, "fstar");
mainTimeline.to("#fstar", { x: -700, y: -250, ease: "power2.out", duration: 1, onComplete: () => gsap.set("#fstar", { opacity: 0 }) }, "fstar");
// Reset scrollbar on refresh
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};