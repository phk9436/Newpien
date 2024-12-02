window.addEventListener("load", () => {

  const vh =  window.innerHeight;
  document.querySelector(".section01 .txtContainer").classList.add("on");
  document.querySelector(".section01 .mainItem").classList.add("on");

  window.addEventListener("scroll", (e) => {
    console.log(window.scrollY/ (vh / 2))
    const itemWrapper = document.querySelector(".section01 .itemWrapper");
    const txtContainer = document.querySelector(".section01 .txtContainer");
    const isScroll = (window.scrollY / (vh / 2)) > 0.7;
    txtContainer.style.opacity = isScroll > 0.7 ? 0 : 1;
    itemWrapper.style.opacity = isScroll > 0.7 ? 0 : 1;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const vh = window.innerHeight;
  document.documentElement.style.setProperty("--vh", `${vh * 0.01}px`);
});