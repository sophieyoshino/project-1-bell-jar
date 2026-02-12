const parisTrigger = document.querySelector(".paris-trigger");
const parisImage = document.querySelector(".paris-image");

if (!parisTrigger || !parisImage) {
  console.log("Missing:", { parisTrigger, parisImage });
} else {
  parisTrigger.addEventListener("click", () => {
    parisImage.classList.toggle("show");
  });
}
