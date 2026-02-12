(() => {
  const jarSel = "#page-3 #belljar, #page-3 .page-image";

  let clicks = 0;
  let running = false;

  document.addEventListener("click", (e) => {
    const jar = e.target.closest(jarSel);
    if (!jar) return;

    clicks += 1;

    if (clicks >= 3 && !running) {
      clicks = 0;
      running = true;
      spawnSpiral();
    }
  });

  function spawnSpiral() {
    const jarWrap = document.querySelector("#page-3 .jar-wrap");
    if (!jarWrap) {
      console.error("Spiral: can't find #page-3 .jar-wrap");
      running = false;
      return;
    }

    const spiral = document.createElement("img");
    spiral.src = "spiral.png";
    spiral.className = "spiral";
    spiral.alt = "";

    jarWrap.appendChild(spiral);

    // allow retrigger after animation ends
    const total = 5600;
    setTimeout(() => {
      spiral.remove();
      running = false;
    }, total);
  }
})();
