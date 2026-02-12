(() => {
  function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }

  function rectsOverlap(a, b){
    return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
  }

  function getObstacleRects(stageEl){
    const s = stageEl.getBoundingClientRect();
    return [...stageEl.querySelectorAll(".jar-obstacle")].map(el => {
      const r = el.getBoundingClientRect();
      return {
        left: r.left - s.left,
        top: r.top - s.top,
        right: r.right - s.left,
        bottom: r.bottom - s.top
      };
    });
  }

  function spawn(opts){
    const {
      stageEl,
      imgSrc,
      className,
      sizePx = 40,
      startX = "center",
      drift = 0.25,
      lifeMs = 1800,
      fadeMs = 320,
      maxOnStage = 6,
    } = opts;

    if (!stageEl) return;

    // limit amount on stage so performance stays smooth
    const existing = stageEl.querySelectorAll(`.${className}`);
    if (existing.length >= maxOnStage) existing[0].remove();

    const sRect = stageEl.getBoundingClientRect();
    const obstacles = getObstacleRects(stageEl);

    const img = document.createElement("img");
    img.className = className;
    img.src = imgSrc;
    img.alt = "";
    img.style.width = `${sizePx}px`;
    img.style.opacity = "1";
    img.style.transition = `opacity ${fadeMs}ms ease`;
    img.style.position = "absolute";
    img.style.left = "0px";
    img.style.top = "0px";
    img.style.transform = "translate3d(0,0,0)";

    stageEl.appendChild(img);

    // starting position
    let x = (startX === "center")
      ? (sRect.width / 2 - sizePx / 2)
      : clamp(startX, 0, sRect.width - sizePx);

    let y = -sizePx - 8;

    // physics
    let vx = (Math.random() * 2 - 1) * (drift * 90); // px/sec
    let vy = 0;
    const g = 520; // px/sec^2 (smooth floaty fall)

    const startT = performance.now();
    let lastT = startT;

    function step(t){
      const dt = Math.min(0.033, (t - lastT) / 1000);
      lastT = t;

      vy += g * dt;
      y += vy * dt;
      x += vx * dt;

      // keep within stage bounds
      if (x < 0){ x = 0; vx *= -0.65; }
      if (x > sRect.width - sizePx){ x = sRect.width - sizePx; vx *= -0.65; }

      // if overlapping obstacle, nudge sideways
      const me = { left: x, top: y, right: x + sizePx, bottom: y + sizePx };
      for (const ob of obstacles){
        if (rectsOverlap(me, ob)){
          const push = (me.left + me.right)/2 < (ob.left + ob.right)/2 ? -10 : 10;
          x = clamp(x + push, 0, sRect.width - sizePx);
          vx += push * 18;
        }
      }

      img.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      const elapsed = t - startT;

      // start fading near end of life
      if (elapsed > lifeMs - fadeMs) img.style.opacity = "0";

      // stop
      if (elapsed >= lifeMs || y > sRect.height + sizePx + 20){
        img.remove();
        return;
      }
      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  window.FallEngine = { spawn };
})();
