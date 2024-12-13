window.addEventListener("load", () => {

  const vh = window.innerHeight;
  const vw = window.innerWidth;

  //메인섹션
  document.querySelector(".section01 .txtContainer").classList.add("on");
  document.querySelectorAll(".section01 .mainItem").forEach((e) => e.classList.add("on"));

  //무릎 섹션
  const sect2Bottom = document.querySelector(".section02").getBoundingClientRect().bottom + window.scrollY;
  const isScrollOver = () => {
    const { scrollY, innerHeight } = window;
    if (scrollY + innerHeight > sect2Bottom) {
      return (scrollY + innerHeight) - sect2Bottom; // 차이값 반환
    }
    return 0; // 아랫점에 도달하지 않았으면 0 반환
  }
  const resizeKnee = () => {
    let oldW, oldH, ratio, maxW;
    if (vw > 1440) {
      oldW = 860;
      oldH = 470;
      ratio = 860 / 470;
      maxW = 1100;
    }
    if (vw > 1100 && vw <= 1440) {
      oldW = 710;
      oldH = 388;
      ratio = 710 / 388;
      maxW = 1000;
    }
    if (vw <= 1100) {
      oldW = (vw / 100) * 60;
      ratio = 714 / 536;
      oldH = oldW * (536 / 714);
      maxW = vw - 100;
    }
    if (vw <= 450) {
      maxW = vw - 50;
    }
    const knee = document.querySelector(".kneeItem");
    const newH = oldH + isScrollOver();
    const newW = newH * ratio;
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
      document.querySelector(".sectionInter").style.paddingTop = '0px';
    } else {
      knee.style.width = `${newW}px`;
      knee.style.height = `${newH}px`;
      kneeOff.style.opacity = 1 - wgap;
      kneeOn.style.opacity = wgap;
      knee.classList.remove("on");
      document.querySelector(".sectionInter").style.paddingTop = `${(maxW / ratio - newH)}px`;
    }
  }

  //스크롤체크
  const scrollCheck = (el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const midpoint = rect.top + (rect.height * 2) / 3;
    return midpoint < windowHeight;
  }

  //스와이퍼 섹션
  const swiperDots = document.querySelectorAll(".swiper-dots li");
  const swiperSetting = {
    slidesPerView: 1,
    //autoplay: true,
    loop: true,
    loopAdditionalSlides: 1,
    observer: true,
    observeParents: true,
    navigation: {   // 버튼
      nextEl: ".swiperArrowNext",
      prevEl: ".swiperArrowPrev",
    },
    on: {
      slideChange: function () {
        const { realIndex } = this;
        swiperDots.forEach((e) => e.classList.remove("active"));
        swiperDots[realIndex].classList.add("active");
      }
    },
    scrollbar: { el: ".swiper-scroll" },
    effect: 'fade',
    fadeEffect: { crossFade: true },
  }
  const setSwiper = () => {
    const swiper = new Swiper(".swiper", swiperSetting);
    swiperDots.forEach((e, i) => e.addEventListener("click", () => swiper.slideToLoop(i)));
    const swiperTexts = document.querySelectorAll(".slideContent p");
    swiperTexts.forEach((e) => {
      e.addEventListener("mouseover", () => swiper.autoplay.pause());
      e.addEventListener("touchstart", () => swiper.autoplay.pause());
      e.addEventListener("mouseout", () => swiper.autoplay.resume());
      e.addEventListener("touchend", () => swiper.autoplay.resume());
    });
  }
  setSwiper();

  //faq 섹션
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
  const poplayer = document.querySelector(".faqPoplayer");
  circle.forEach((e) => {
    if (vw >= 451) {
      e.addEventListener("mouseover", () => {
        circleWrapper.style.animationPlayState = 'paused';
        circle.forEach((e) => e.querySelector(".circle").style.animationPlayState = 'paused');
      });
      e.addEventListener("mouseout", () => {
        circleWrapper.style.animationPlayState = 'running';
        circle.forEach((e) => e.querySelector(".circle").style.animationPlayState = 'running');
      });
      return;
    }
    e.addEventListener("click", () => {
      poplayer.style.display = "flex";
      setTimeout(() => poplayer.classList.add("on"), 0);
      const faqText = e.querySelector(".circle").innerHTML;
      poplayer.querySelector(".faqPopText").innerHTML = faqText;
    });
  });
  const closeLayer = () => {
    poplayer.classList.remove("on");
    setTimeout(() => poplayer.style.display = "none", 500);
  };
  poplayer.querySelector(".bg").addEventListener("click", closeLayer);
  poplayer.querySelector(".close").addEventListener("click", closeLayer);

  //푸터 섹션
  const family = document.querySelector(".family");
  family.querySelector("li").addEventListener("click", () => family.classList.toggle("on"));

  //네비게이션
  const navSect = document.querySelectorAll(".navigate");
  const navBtn = document.querySelectorAll(".navGray li");
  const navFunc = () => {
    navSect.forEach((e, i) => {
      if (scrollCheck(e)) {
        navBtn.forEach((e) => e.classList.remove("on"));
        navBtn[i].classList.add("on");
        return;
      }
    });
  };
  const navigateSect = (evt, i) => {
    evt.preventDefault();
    let sectPosition = document.querySelectorAll(".navigate")[i].getBoundingClientRect().top + window.scrollY + 10;
    if (i === 0) {
      sectPosition = 0;
    }
    window.scrollTo({
      top: sectPosition,
      behavior: "smooth"
    });
  };
  navBtn.forEach((e, i) => e.querySelector("a").addEventListener("click", (evt) => navigateSect(evt, i)));
  navBtn.forEach((e, i) => {
    const navMain = document.querySelectorAll(".navMain li");
    e.addEventListener("mouseover", () => {
      navMain.forEach((e) => e.classList.remove("on"));
      navMain[i].classList.add("on");
    });
    e.addEventListener("mouseout", () => {
      navMain.forEach((e) => e.classList.remove("on"));
    });
  });

  //섹션 함수
  const sectFunc = () => {
    //섹션1 이벤트
    const isScroll = (window.scrollY / (vh / 2)) > 0.8;
    !isScroll
      ? (
        document.querySelector(".navGray").classList.add("off"),
        document.querySelector(".navMain").classList.add("on")
      )
      : (
        document.querySelector(".navGray").classList.remove("off"),
        document.querySelector(".navMain").classList.remove("on")
      );
    resizeKnee(); //섹션2 이벤트
    //섹션3 이벤트
    const sect3Item = document.querySelector(".section03 .items");
    scrollCheck(document.querySelector(".section03"), -100) ? sect3Item.classList.add("on") : sect3Item.classList.remove("on");
    scrollCheck(document.querySelector(".section05")) && circleFunc();//섹션5 이벤트
    navFunc(); //네비게이션 이벤트
    //섹션prd 이벤트
    const sectPrd = document.querySelector(".sectionPrd");
    scrollCheck(sectPrd) ? sectPrd.classList.add("on") : sectPrd.classList.remove("on");
  };
  sectFunc();
  window.addEventListener("scroll", sectFunc);

});

document.addEventListener("DOMContentLoaded", () => {
  const vh = window.innerHeight;
  document.documentElement.style.setProperty("--vh", `${vh * 0.01}px`);
});