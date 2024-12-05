window.addEventListener("load", () => {

  const vh = window.innerHeight;
  document.querySelector(".section01 .txtContainer").classList.add("on");
  document.querySelector(".section01 .mainItem").classList.add("on");

  const sect2Bottom = document.querySelector(".section02").getBoundingClientRect().bottom + window.scrollY;

  const isScrollOver = () => {
    const { scrollY } = window;
    if (scrollY + window.innerHeight > sect2Bottom) {
      return (scrollY + window.innerHeight) - sect2Bottom; // 차이값 반환
    } else {
      return 0; // 아랫점에 도달하지 않았으면 0 반환
    }
  }

  const resizeKnee = () => {
    const ratio = 860 / 470;
    const knee = document.querySelector(".kneeItem");
    const newH = 470 + isScrollOver();
    const oldW = 860;
    const newW = newH * ratio;
    const maxW = 1200;
    const maxWgap = maxW - oldW;
    const wgap = (newW - oldW) / maxWgap;
    const kneeOff = document.querySelector(".kneeOff");
    const kneeOn = document.querySelector(".kneeOn");
    if (newW > maxW) {
      knee.style.width = `${maxW}px`;
      knee.style.height = `${maxW / ratio}px`;
      knee.classList.add("on");
      kneeOff.style.opacity = 0;
      kneeOn.style.opacity = 1;
    } else {
      knee.style.width = `${newW}px`;
      knee.style.height = `${newH}px`;
      kneeOff.style.opacity = 1 - wgap;
      kneeOn.style.opacity = wgap;
      knee.classList.remove("on");
    }
  }

  const scrollCheck = (el) => {
    const elementTop = el.getBoundingClientRect().top + window.scrollY;
    return window.scrollY >= elementTop;
  }

  const swiperSetting = {
    slidesPerView: 1,
    // 무한 루프
    autoplay: true,
    loop: true,
    loopAdditionalSlides: 1,
    //페이지를 로딩한 직후 작동
    observer: true,
    observeParents: true,
    // loopedSlides: 1,
    // pagination: {
    //   el: ".swiperBtnWrapper",
    //   clickable: true,
    // },
    navigation: {   // 버튼
      nextEl: ".swiperArrowNext",
      prevEl: ".swiperArrowPrev",
    },
  }

  const setSwiper = () => {
    const swiperDots = document.querySelectorAll(".swiper-dots li");
    const swiper = new Swiper(".swiper", {
      ...swiperSetting,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      scrollbar: { el: ".swiper-scroll" },
      on: {
        slideChange: function () {
          const { realIndex } = this;
          console.log(realIndex)
          swiperDots.forEach((e) => e.classList.remove("active"));
          swiperDots[realIndex].classList.add("active");
        }
      },
    });

    swiperDots.forEach((e, i) => e.addEventListener("click", () => swiper.slideToLoop(i)));
  }
  setSwiper();

  let isCircleActive = false;
  const circleFunc = () => {
    if (isCircleActive) return;
    const faqWrapper = document.querySelector(".faqWrapper");
    faqWrapper.classList.add("on");
    setTimeout(() => faqWrapper.classList.add("active"), 800);
    isCircleActive = true;
  };
  const circleWrapper = document.querySelector(".circleWrapper");
  const circle = document.querySelectorAll(".circleCont");
  circle.forEach((e) => {
    e.addEventListener("mouseover", () => {
      circleWrapper.style.animationPlayState = 'paused';
      circle.forEach((e) => e.querySelector(".circle").style.animationPlayState = 'paused');
    });
    e.addEventListener("mouseout", () => {
      circleWrapper.style.animationPlayState = 'running';
      circle.forEach((e) => e.querySelector(".circle").style.animationPlayState = 'running');
    });
  });

  window.addEventListener("scroll", (e) => {

    //섹션1 이벤트
    const itemWrapper = document.querySelector(".section01 .itemWrapper");
    const txtContainer = document.querySelector(".section01 .txtContainer");
    const isScroll = (window.scrollY / (vh / 2)) > 0.7;
    txtContainer.style.opacity = isScroll > 0.7 ? 0 : 1;
    itemWrapper.style.opacity = isScroll > 0.7 ? 0 : 1;

    //섹션2 이벤트
    resizeKnee();

    //섹션3 이벤트
    const sect3Item = document.querySelector(".section03 .items");
    scrollCheck(document.querySelector(".section03")) ? sect3Item.classList.add("on") : sect3Item.classList.remove("on");

    //섹션5 이벤트
    scrollCheck(document.querySelector(".section05 h2")) && circleFunc();
  });

});

document.addEventListener("DOMContentLoaded", () => {
  const vh = window.innerHeight;
  document.documentElement.style.setProperty("--vh", `${vh * 0.01}px`);
});