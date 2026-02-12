(() => {
  const slotSel = "#page-3 #city-slot";
  const triggers = {
    paris: ".paris-trigger",
    bangkok: ".bangkok-trigger",
    ship: ".ship-trigger",
  };

  function showCity(key) {
    const slot = document.querySelector(slotSel);
    if (!slot) return;

    const imgs = slot.querySelectorAll("img[data-city]");

    // Find the image that matches the clicked key
    const target = [...imgs].find(img => img.dataset.city === key);
    if (!target) return;

    // ✅ If it's already showing, turn it off (clear background)
    if (target.classList.contains("show")) {
      imgs.forEach(img => img.classList.remove("show"));
      return;
    }

    // Otherwise, hide all and show the clicked one
    imgs.forEach(img => {
      img.classList.toggle("show", img === target);
    });
  }


  // Click delegation so it works even if Turn.js re-renders pages
  document.addEventListener("click", (e) => {
    if (e.target.closest(triggers.paris))   showCity("paris");
    if (e.target.closest(triggers.bangkok)) showCity("bangkok");
    if (e.target.closest(triggers.ship))    showCity("ship");
  });
})();
