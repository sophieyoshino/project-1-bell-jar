const bangkokTrigger = document.querySelector(".bangkok-trigger");
const bangkokImage = document.querySelector(".bangkok-image");

if (!bangkokTrigger || !bangkokImage) {
  console.log("Missing:", { bangkokTrigger, bangkokImage });
} else {
  bangkokTrigger.addEventListener("click", () => {
    bangkokImage.classList.toggle("show");
  });
}
