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

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href === "#") return;

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        if (burger && mobileMenu && burger.classList.contains("active")) {
          closeMenu();

          setTimeout(() => {
            scrollToElement(targetElement);
          }, 300);
        } else {
          scrollToElement(targetElement);
        }

        history.pushState(null, null, href);
      }
    });
  });

  function scrollToElement(element) {
    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 0;

    const elementTop = element.offsetTop;

    const vh = window.innerHeight * 0.01;
    const offset80vh = -1 * vh;

    const targetPosition = elementTop - offset80vh;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }

  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      const currentHash = window.location.hash;
      if (currentHash) {
        const targetElement = document.getElementById(currentHash.substring(1));
        if (targetElement) {
          scrollToElement(targetElement);
        }
      }
    }, 250);
  });
});
