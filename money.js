(() => {
  window.addEventListener("load", () => {
    const triggers = document.querySelectorAll(".money-trigger");

    triggers.forEach((trigger) => {
      let lastClick = 0;

      trigger.addEventListener("click", () => {
        const now = Date.now();
        if (now - lastClick < 500) return;
        lastClick = now;

        const stage = document.querySelector("#page-3 .page-content");
        if (!stage) {
          console.error("Money: can't find #page-3 .page-content");
          return;
        }

        // spawn a bunch of bills
        for (let i = 0; i < 10; i++) {
          setTimeout(() => spawnBillFromTop(stage), i * 70);
        }
      });
    });

    function spawnBillFromTop(stageEl) {
      const bill = document.createElement("img");
      bill.className = "money";
      bill.src = "bill.webp"; 
      bill.alt = "";


      bill.onerror = () => console.error("Money image failed to load:", bill.src);

      const w = stageEl.clientWidth;
      const h = stageEl.clientHeight;

      // start at top (offscreen a bit)
      const startX = rand(20, Math.max(20, w - 40));
      const startY = -50;

      bill.style.left = `${startX}px`;
      bill.style.top = `${startY}px`;


      bill.style.setProperty("--dx", `${rand(-25, 25)}px`);
      bill.style.setProperty("--dy", `${h + 120}px`);   // <-- brings it through the page
      bill.style.setProperty("--rot", `${rand(-12, 12)}deg`);

      const dur = rand(1800, 2600);
      const delay = rand(0, 120);

      bill.style.animation = `money-fall ${dur}ms linear ${delay}ms forwards`;

      stageEl.appendChild(bill);
      setTimeout(() => bill.remove(), dur + delay + 200);
    }

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  });
})();
