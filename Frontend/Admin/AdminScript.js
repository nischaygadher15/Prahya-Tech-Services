// User Drop Down

let userDD = document.getElementById("userDD");

let handleUserDD = () => {
  userDD.classList.toggle("showDD");
};

//Login Form Password Box Eye

let e1 = document.getElementById("eye1");
let e2 = document.getElementById("eye2");
let pwdBox = document.getElementById("pwd");

let handleeye = (event) => {
  if (event.target.id == "eye1") {
    e1.style.display = "none";
    e2.style.display = "block";
    pwdBox.type = "text";
  } else {
    e1.style.display = "block";
    e2.style.display = "none";
    pwdBox.type = "password";
  }
};

//Login Form Password Box Eye

let ce1 = document.getElementById("ceye1");
let ce2 = document.getElementById("ceye2");
let cpwdBox = document.getElementById("cpwdBox");

let handleCeye = (event) => {
  if (event.target.id == "ceye1") {
    ce1.style.display = "none";
    ce2.style.display = "block";
    cpwdBox.type = "text";
  } else {
    ce1.style.display = "block";
    ce2.style.display = "none";
    cpwdBox.type = "password";
  }
};

// Login/Registration Switching Form

let login = document.getElementById("loginForm");
let reg = document.getElementById("regForm");

let handleformSwitch = (event) => {
  if (event.target.id == "login") {
    reg.style.display = "none";
    login.style.display = "flex";
  }
  if (event.target.id == "reg") {
    reg.style.display = "flex";
    login.style.display = "none";
  }
};

//Handle Registration Submission

let handleLoginSub = (event) => {
  //validation
};

//Handle Registration Submission

let handleRegSub = (event) => {
  //validation
};
