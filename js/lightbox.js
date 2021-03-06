import { ImageFactory, VideoFactory } from "./media.js";

export class Lightbox {
  constructor(medias) {
    this.body = document.querySelector("body");
    this.lightboxBg = document.querySelector("#lightbox-background");
    this.btnClose = document.querySelector("#lightbox-close");
    this.btnPrevious = document.querySelector("#lightbox-previous");
    this.btnNext = document.querySelector("#lightbox-next");
    this.photographerWorkLink = document.querySelectorAll(
      ".photographer-work-link"
    );
    this.lightboxContent = document.querySelector("#lightbox-content");
    this.position = 0;
    this.medias = medias;
    this.imgSlide = "";
    console.log(this.medias);

    //---------------- EVENTS MOOVE LIGHTBOX SLIDE -----------------------//

    this.btnPrevious.addEventListener("click", () => {
      this.previousSlide();
    });

    this.btnNext.addEventListener("click", () => {
      this.nextSlide();
    });

    this.btnClose.addEventListener("click", () => {
      this.closeLightbox();
    });

    //-------------------------------- KEYBOARD ACTION  --------------------------------//

    this.btnPrevious.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.closeLightbox();
      }
    });

    this.btnNext.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.closeLightbox();
      }
      if (event.key === "Tab") {
        event.preventDefault();
        this.btnClose.focus();
      }
    });

    this.btnClose.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.closeLightbox();
      }
    });

    this.lightboxBg.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        this.previousSlide();
      }
      if (event.key === "ArrowRight") {
        this.nextSlide();
      }
      if (event.key === " ") {
        event.preventDefault();
      }
    });
  }

  openModal() {
    this.lightboxBg.style.display = "flex";
    this.createSlides();
    this.body.style.overflow = "hidden";
    this.btnClose.focus();
  }

  closeLightbox() {
    this.lightboxBg.style.display = "none";
    this.body.style.overflow = "scroll";
  }

  createSlides() {
    if (this.medias[this.position] instanceof ImageFactory) {
      this.imgSlide = document.createElement("img");
      this.imgSlide.classList.add("media-work-slide");
      this.imgSlide.setAttribute(
        "src",
        `./assets/img/media/${this.medias[this.position].url}`
      );
      this.imgSlide.setAttribute("alt", this.medias[this.position].title);
    } else if (this.medias[this.position] instanceof VideoFactory) {
      this.imgSlide = document.createElement("video");
      const videoSource = document.createElement("source");
      this.imgSlide.classList.add("media-work-slide");
      videoSource.setAttribute(
        "src",
        `./assets/img/media/${this.medias[this.position].url}`
      );
      videoSource.setAttribute("alt", this.medias[this.position].title);
      this.imgSlide.autoplay = false;
      this.imgSlide.controls = true;
      this.imgSlide.append(videoSource);
    }
    const titleSlide = document.createElement("p");
    titleSlide.classList.add("title-work-slide");
    titleSlide.textContent = `${this.medias[this.position].title}`;
    this.lightboxContent.append(this.imgSlide, titleSlide);
  }

  displaySlides() {
    this.lightboxBg.style.display = "flex";
    this.btnClose.focus();
    this.removeMedia();
  }

  launchLightbox(index) {
    this.openModal();
    this.position = index;
    this.currentSlide(this.position);
    this.createSlides();
  }

  currentSlide() {
    this.displaySlides();
  }

  nextSlide() {
    if (this.position < this.medias.length - 1) {
      this.position++;
    } else {
      this.position = 0;
    }
    this.removeMedia();
    this.createSlides();
  }

  previousSlide() {
    if (this.position > 0) {
      this.position--;
    } else {
      this.position = this.medias.length - 1;
    }
    this.removeMedia();
    this.createSlides();
  }

  removeMedia() {
    while (this.lightboxContent.firstChild) {
      this.lightboxContent.removeChild(this.lightboxContent.firstChild);
    }
  }
}
