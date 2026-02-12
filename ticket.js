(() => {
  window.addEventListener("load", () => {
    const triggers = document.querySelectorAll(".ticket-trigger");
    let active = false;

    triggers.forEach((trigger) => {
      let lastClick = 0;

      trigger.addEventListener("click", () => {
        const now = Date.now();
        if (now - lastClick < 600) return;
        lastClick = now;

        if (active) return;
        active = true;

        const stage = document.querySelector("#page-3 .page-content");
        if (!stage) {
          console.error("Ticket: can't find #page-3 .page-content");
          active = false;
          return;
        }

        spawnTicketFromTop(stage);
      });
    });

    function spawnTicketFromTop(stageEl) {
      const ticket = document.createElement("img");
      ticket.className = "ticket";
      ticket.src = "plane_ticket.webp"; // <-- confirm this path
      ticket.alt = "";

      ticket.onerror = () =>
        console.error("Ticket image failed to load:", ticket.src);

      const w = stageEl.clientWidth;
      const h = stageEl.clientHeight;

      const startX = Math.floor(w * 0.5) + rand(-80, 80);
      const startY = -70;

      ticket.style.left = `${startX}px`;
      ticket.style.top = `${startY}px`;

      // IMPORTANT: ticket-fall needs dx, dy, rot
      ticket.style.setProperty("--dx", `${rand(-25, 25)}px`);
      ticket.style.setProperty("--dy", `${h + 140}px`);
      ticket.style.setProperty("--rot", `${rand(-12, 12)}deg`);

      const dur = rand(1600, 2200);
      const delay = rand(0, 80);

      ticket.style.animation = `ticket-fall ${dur}ms linear ${delay}ms forwards`;

      stageEl.appendChild(ticket);

      setTimeout(() => {
        ticket.remove();
        active = false;
      }, dur + delay + 200);
    }

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  });
})();
