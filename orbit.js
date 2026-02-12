(() => {
  const orbitTrigger = document.querySelector(".orbit-trigger");
  const scene = document.querySelector(".scene");
  const img = document.querySelector(".illustration");

  let orbitEl = null;
  let rafId = null;
  let startTime = 0;

  if (orbitTrigger && scene && img) {
    orbitTrigger.addEventListener("mouseenter", startOrbit);
    orbitTrigger.addEventListener("mouseleave", stopOrbit);
  } else {
    console.log("Orbit missing elements:", { orbitTrigger, scene, img });
  }

  function startOrbit() {
    orbitTrigger.classList.add("orbit-hidden");

    orbitEl = document.createElement("div");
    orbitEl.className = "orbiting-text";
    orbitEl.textContent = orbitTrigger.textContent;

    scene.appendChild(orbitEl);

    startTime = performance.now();
    rafId = requestAnimationFrame(tick);
  }

  function stopOrbit() {
      if (orbitEl) return; // prevents creating multiple copies

  orbitTrigger.classList.add("orbit-hidden");

  orbitEl = document.createElement("div");
  orbitEl.className = "orbiting-text";
  orbitEl.textContent = orbitTrigger.textContent;

  orbitScene.appendChild(orbitEl);

  startTime = performance.now();
  rafId = requestAnimationFrame(tick);

    orbitTrigger.classList.remove("orbit-hidden");
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    if (orbitEl) orbitEl.remove();
    orbitEl = null;
  }

  function tick(now) {
    if (!orbitEl) return;

    const sceneRect = scene.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    const cx = (imgRect.left - sceneRect.left) + imgRect.width / 2;
    const cy = (imgRect.top - sceneRect.top) + imgRect.height / 2;

    const rx = imgRect.width / 2 + 70;
    const ry = imgRect.height / 2 + 15;

    const t = (now - startTime) / 2500;
    const angle = t * Math.PI * 2;

    const x = cx + rx * Math.cos(angle);
    const y = cy + ry * Math.sin(angle);

    orbitEl.style.left = `${x}px`;
    orbitEl.style.top = `${y}px`;
    orbitEl.style.transform = "translate(-50%, -50%)";

    rafId = requestAnimationFrame(tick);
  }
})();
