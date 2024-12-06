document.addEventListener("DOMContentLoaded", () => {


  const thumb = document.querySelector('.scrollThumb');
  
  const updateThumb = () => {
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.scrollHeight;
      const scrollRatio = windowHeight / (bodyHeight - windowHeight);
      thumb.style.height = `${scrollRatio * 100}%`;
  };
  
  const scrollContent = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.scrollHeight;
      const thumbHeight = thumb.clientHeight;
  
      // thumb의 위치를 계산할 때 thumbHeight를 고려
      const scrollRatio = scrollTop / bodyHeight;
      thumb.style.transform = `translateY(${scrollRatio * (windowHeight - thumbHeight)}px)`;
  };
  
  window.addEventListener('scroll', scrollContent);
  window.addEventListener('resize', updateThumb);
  updateThumb();
});
