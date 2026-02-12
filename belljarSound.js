document.addEventListener("DOMContentLoaded", () => {
  const jar = document.getElementById("belljar");

  if (!jar) return;

  // Load tap sound
  const tapSound = new Audio("glass_tap.mp3");


  tapSound.volume = 0.8;

  jar.style.cursor = "pointer";

  jar.addEventListener("click", () => {
    // Restart sound if clicked repeatedly
    tapSound.currentTime = 0;
    tapSound.play();
  });
});
