document.addEventListener("DOMContentLoaded", function () {
  const videoPopup = document.querySelector(".video-popup");
  const videoOverlay = document.querySelector(".video-popup__overlay");
  const videoContainer = document.querySelector(".video-popup__container");
  const videoContent = document.querySelector(".video-popup__content");
  const videoElement = videoPopup.querySelector("video");
  const closeButton = document.querySelector(".video-popup__close");

  const videoSources = {
    projectOne: "https://disk.yandex.ru/i/2P7flI2xeF_dow",
    projectTwo: "https://glebka-crevetca.github.io/exactimage/img/Medvezhi-Obyatiya-Ekonomik.mp4",
  };

  function openVideoPopup(videoSrc) {
    videoElement.src = videoSrc;
    videoElement.preload = "none";

    videoPopup.classList.add("active");
    document.body.classList.add("video-popup-open");

    videoElement.load();
  }

  function closeVideoPopup() {
    videoPopup.classList.remove("active");
    document.body.classList.remove("video-popup-open");

    videoElement.pause();
    videoElement.currentTime = 0;
    videoElement.removeAttribute("src");
  }

  const projectOneLink = document.querySelector(".projectOne");
  const projectTwoLink = document.querySelector(".projectTwo");

  if (projectOneLink) {
    projectOneLink.addEventListener("click", function (e) {
      e.preventDefault();
      openVideoPopup(videoSources.projectOne);
    });
  }

  if (projectTwoLink) {
    projectTwoLink.addEventListener("click", function (e) {
      e.preventDefault();
      openVideoPopup(videoSources.projectTwo);
    });
  }

  closeButton.addEventListener("click", closeVideoPopup);
  videoOverlay.addEventListener("click", closeVideoPopup);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && videoPopup.classList.contains("active")) {
      closeVideoPopup();
    }
  });

  videoContainer.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  videoElement.addEventListener("ended", function () {
    console.log("Видео завершено");
  });
});


