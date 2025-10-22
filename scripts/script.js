document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu");

  function closeMenu() {
    if (burger) burger.classList.remove("active");
    if (mobileMenu) mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (burger && mobileMenu) {
    burger.addEventListener("click", function () {
      this.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      document.body.style.overflow = mobileMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    mobileMenu.addEventListener("click", function (e) {
      if (e.target === mobileMenu) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
        closeMenu();
      }
    });
  }

  if (window.location.hash) {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
  }

  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);

      newLink.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        if (href === "#" || href === "") return;

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          e.preventDefault();
          e.stopPropagation();

          if (burger && mobileMenu && burger.classList.contains("active")) {
            closeMenu();
            setTimeout(() => {
              scrollToElement(targetElement);
            }, 300);
          } else {
            scrollToElement(targetElement);
          }

          history.replaceState(null, null, href);
        }
      });
    });
  }

  function scrollToElement(element) {
    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 0;
    const elementTop = element.offsetTop;
    const vh = window.innerHeight * 0.01;
    const offset80vh = -1 * vh;
    const targetPosition = elementTop - offset80vh;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "smooth",
    });
  }

  initSmoothScroll();

  window.addEventListener("hashchange", function (e) {
    e.preventDefault();
    const newURL = new URL(e.newURL);
    const targetId = newURL.hash.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      setTimeout(() => {
        scrollToElement(targetElement);
      }, 100);
    }
  });
});
