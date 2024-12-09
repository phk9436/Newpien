document.addEventListener("DOMContentLoaded", () => {

  const scrollbar = document.querySelector(".scrollbar")
  const thumb = document.querySelector('.scrollThumb');

  let isDragging = false;

  const updateThumb = () => {
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.scrollHeight;
    const scrollRatio = windowHeight / bodyHeight;
    thumb.style.height = `${scrollRatio * 100}%`;
  };

  const scrollContent = () => {
    const scrollTop = window.scrollY;
    const bodyHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    const thumbHeight = thumb.clientHeight;

    const scrollRatio = scrollTop / bodyHeight;
    thumb.style.transform = `translateY(${scrollRatio * windowHeight}px)`;
  };

  const onMouseDown = () => isDragging = true;

  const onMouseMove = (e) => {
    if (!isDragging) return;
    const scrollbarHeight = scrollbar.clientHeight;
    const maxScrollTop = document.body.scrollHeight;
    // thumb의 새로운 위치 계산
    const newY = e.clientY - scrollbar.getBoundingClientRect().top;
    const constrainedY = Math.max(0, Math.min(newY, scrollbarHeight));
    // 스크롤 비율 계산
    const scrollRatio = constrainedY / scrollbarHeight;
    window.scrollTo(0, scrollRatio * (maxScrollTop - scrollbarHeight));
  };

  const onMouseUp = () => isDragging = false;

  thumb.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  window.addEventListener('scroll', scrollContent);
  window.addEventListener('resize', updateThumb);

  updateThumb();
});
