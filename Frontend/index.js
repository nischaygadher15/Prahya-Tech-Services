// creating a responsive navbar compoenet

const mobile_nav = document.querySelector(".mobile-navbar-btn");
const headerElem = document.querySelector(".header");

mobile_nav.addEventListener("click", () => {
  headerElem.classList.toggle("active");
});

// creating portfolio section
const p_btns = document.querySelector(".p-btns");
const p_btn = document.querySelectorAll(".p-btn");
const p_img_elem = document.querySelectorAll(".img-overlay");

p_btns.addEventListener("click", (e) => {
  const p_btn_clicked = e.target;
  console.log(p_btn_clicked);

  if (!p_btn_clicked.classList.contains("p-btn")) return;

  p_btn.forEach((curElem) => curElem.classList.remove("p-btn-active"));

  p_btn_clicked.classList.add("p-btn-active");

  const btn_num = p_btn_clicked.dataset.btnNum;
  console.log(btn_num);

  const img_active = document.querySelectorAll(`.p-btn--${btn_num}`);

  p_img_elem.forEach((curElem) => curElem.classList.add("p-image-not-active"));

  img_active.forEach((curElem) =>
    curElem.classList.remove("p-image-not-active")
  );
});

// swiper js code

new Swiper(".mySwiper", {
  slidesPerView: 2,
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const myJsmedia = (widthSize) => {
  if (widthSize.matches) {
    new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  } else {
    new Swiper(".mySwiper", {
      slidesPerView: 2,
      spaceBetween: 30,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }
};
const widthSize = window.matchMedia("(max-width:780px)");
myJsmedia(widthSize);

widthSize.addEventListener("change", myJsmedia);

//  scrooll button start

const heroSection = document.querySelector(".section-hero");
const footerElem = document.querySelector(".section-footer");

const scroollElement = document.createElement("div");
scroollElement.classList.add("scrollTop-style");

scroollElement.innerHTML = `<ion-icon name="arrow-up-outline" class="scroll-top"></ion-icon>`;

footerElem.after(scroollElement);

const scrollTop = () => {
  heroSection.scrollIntoView({ behavior: "smooth" });
};

scroollElement.addEventListener("click", scrollTop);

// scrooll portfolio and contact

const portfolioSec = document.querySelector(".section-portfolio");
const contactSec = document.querySelector(".section-contact");

document.querySelector(".portfolio-link").addEventListener("click", () => {
  portfolioSec.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".hireme-btn").addEventListener("click", () => {
  e.preventDefault();
  contactSec.scrollIntoView({ behavior: "smooth" });
});

// animate counter number

const counterNum = document.querySelectorAll(".counter-numbers");

const speed = 200;

counterNum.forEach((curElem) => {
  const updateNumber = () => {
    const targetNumber = parseInt(curElem.dataset.number);

    const initialNum = parseInt(curElem.innerText);

    const incrementNumber = Math.trunc(targetNumber / speed);

    if (initialNum < targetNumber) {
      curElem.innerText = `${initialNum + incrementNumber}+`;

      setTimeout(updateNumber, 10);
    }
  };

  updateNumber();
});

//Handle Contact Submit Form
let contactUs = document.getElementById("contactUsForm");

let data = {};
let handleSubmit = async (event) => {
  event.preventDefault();
  let uemail = event.target[1].value.split("@");
  let femail = `${uemail[0]} @${uemail[1]}`;
  data = {
    createdat: Date.now(),
    username: event.target[0].value,
    email: femail,
    subject: event.target[2].value,
    textarea: event.target[3].value,
  };
  try {
    await fetch("http://localhost:8000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log("Data Sent Successfully.");
    contactUs.reset();
  } catch (error) {
    console.log(error);
  }
};
