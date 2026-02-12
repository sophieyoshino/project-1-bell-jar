(() => {
  const trigger = document.querySelector(".cruise-trigger");
  if (!trigger) return;

  let active = false;

  trigger.addEventListener("click", () => {
    if (active) return;
    active = true;

    const stage = document.querySelector("#page-3 .page-content");
    if (!stage) return;

    // create cruise image
    const ship = document.createElement("img");
    ship.src = "cruise.webp"; 
    ship.className = "cruise-ship";
    ship.alt = "";

    stage.appendChild(ship);

    // remove after animation ends
    ship.addEventListener("animationend", () => {
      ship.remove();
      active = false;
    });
  });
})();
