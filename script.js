



document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('skillsCarousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const items = Array.from(carousel.querySelectorAll('.skill-item'));
  const prevBtn = carousel.querySelector('.btn-prev');
  const nextBtn = carousel.querySelector('.btn-next');

  let index = 0;

  // Variáveis para drag/swipe
  let isDragging = false;
  let startX = 0;
  let currentTranslate = -carousel.offsetWidth * index;
  let prevTranslate = currentTranslate;
  let animationID = 0;

  // Funções auxiliares
  function setPosition() {
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  function animate() {
    setPosition();
    if (isDragging) requestAnimationFrame(animate);
  }

  function update() {
    currentTranslate = -carousel.offsetWidth * index;
    prevTranslate = currentTranslate;
    track.style.transition = 'transform 0.45s ease';
    setPosition();
    setTimeout(() => track.style.transition = '', 450);
  }

  // Navegação com botões
  prevBtn.addEventListener('click', () => {
    if (index > 0) index--;
    update();
  });

  nextBtn.addEventListener('click', () => {
    if (index < items.length - 1) index++;
    update();
  });

  // Drag / Swipe
  track.addEventListener('mousedown', dragStart);
  track.addEventListener('touchstart', dragStart);
  track.addEventListener('mouseup', dragEnd);
  track.addEventListener('mouseleave', dragEnd);
  track.addEventListener('touchend', dragEnd);
  track.addEventListener('mousemove', dragAction);
  track.addEventListener('touchmove', dragAction);

  function dragStart(e) {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    animationID = requestAnimationFrame(animate);
  }

  function dragAction(e) {
    if (!isDragging) return;
    const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const deltaX = currentX - startX;
    currentTranslate = prevTranslate + deltaX;
  }

  function dragEnd() {
    if (!isDragging) return;
    cancelAnimationFrame(animationID);
    isDragging = false;

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -50 && index < items.length - 1) index++;
    if (movedBy > 50 && index > 0) index--;

    update();
  }

  // Inicializa a posição
  update();

  // Ajusta o carrossel ao redimensionar a tela
  window.addEventListener('resize', update);
});