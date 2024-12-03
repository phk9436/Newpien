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
    const maxWgap = 1440 - 860;
    const wgap = (newW - oldW)/maxWgap;
    console.log(wgap)
    const kneeOff = document.querySelector(".kneeOff");
    const kneeOn = document.querySelector(".kneeOn");
    if(newW > 1440) {
      knee.style.width = '1440px';
      knee.style.height = `${1440 / ratio}px`;
      knee.classList.add("on");
    } else {
      knee.style.width = `${newW}px`;
      knee.style.height = `${newH}px`;
      kneeOff.style.opacity = 1 - wgap;
      kneeOn.style.opacity = wgap;
      knee.classList.remove("on");
    }
  }

  window.addEventListener("scroll", (e) => {

    //섹션1 이벤트
    const itemWrapper = document.querySelector(".section01 .itemWrapper");
    const txtContainer = document.querySelector(".section01 .txtContainer");
    const isScroll = (window.scrollY / (vh / 2)) > 0.7;
    txtContainer.style.opacity = isScroll > 0.7 ? 0 : 1;
    itemWrapper.style.opacity = isScroll > 0.7 ? 0 : 1;

    //섹션2 이벤트
    //console.log(window.scrollY + window.innerHeight,sect2Bottom , isScrollOver())
    isScrollOver(document.querySelector(".section02")) && resizeKnee();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const vh = window.innerHeight;
  document.documentElement.style.setProperty("--vh", `${vh * 0.01}px`);
});