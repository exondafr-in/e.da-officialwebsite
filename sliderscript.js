document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slider-track");
  const slides = Array.from(track.children);
  const left = document.querySelector(".arrow.left");
  const right = document.querySelector(".arrow.right");

  const gap = 15;
  const slideWidth = slides[0].offsetWidth + gap;

  // 🔁 duplication pour effet infini
  slides.forEach(slide => {
    track.appendChild(slide.cloneNode(true));
  });

  let index = 0;
  let position = 0;

  function update() {
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(${position}px)`;
  }

  function next() {
    index++;
    position -= slideWidth;
    update();

    if (index === slides.length) {
      setTimeout(() => {
        track.style.transition = "none";
        index = 0;
        position = 0;
        track.style.transform = "translateX(0)";
      }, 500);
    }
  }

  function prev() {
    if (index === 0) {
      // saute à la fin sans animation
      track.style.transition = "none";
      index = slides.length;
      position = -slideWidth * index;
      track.style.transform = `translateX(${position}px)`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          index--;
          position += slideWidth;
          update();
        });
      });
    } else {
      index--;
      position += slideWidth;
      update();
    }
  }

  right.addEventListener("click", next);
  left.addEventListener("click", prev);
});