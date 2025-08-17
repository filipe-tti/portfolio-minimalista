src="https://kit.fontawesome.com/b3f89f3272.js"
      crossorigin="anonymous"




document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('skillsCarousel');
  if (!carousel) return;

  const track   = carousel.querySelector('.carousel-track');
  const items   = carousel.querySelectorAll('.skill-item');
  const prevBtn = carousel.querySelector('.btn-prev');
  const nextBtn = carousel.querySelector('.btn-next');

  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + items.length) % items.length;
    update();
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % items.length;
    update();
  });

  // inicializa posição
  update();
});

