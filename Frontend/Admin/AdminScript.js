// User Drop Down

let userDD = document.getElementById("userDD");

let ddFlag = false;
let handleUserDD = () => {
  ddFlag = !ddFlag;
  if (ddFlag) {
    userDD.classList.remove("hidden");
    userDD.classList.add("flex");
    userDD.classList.add("top-1/2");
  } else {
    userDD.classList.add("hidden");
    userDD.classList.remove("flex");
  }
};

let leave = () => {
  console.log("Mouse Leaved.");
};

document.getElementById("userDrop").addEventListener("click", handleUserDD);

//Login Form Password Box Eye

let e1 = document.getElementById("eye1");
let e2 = document.getElementById("eye2");
let pwdBox = document.getElementById("pwd");
let pwdBox2 = document.getElementById("pwd2");

let handleeye = (event) => {
  if (event.target.id == "eye1") {
    e1.style.display = "none";
    e2.style.display = "block";
    pwdBox.type = "text";
  } else if (event.target.id == "eye2") {
    e1.style.display = "block";
    e2.style.display = "none";
    pwdBox.type = "password";
  }
  if (event.target.id == "eye3") {
    e3.style.display = "none";
    e4.style.display = "block";
    pwdBox2.type = "text";
  } else {
    e3.style.display = "block";
    e4.style.display = "none";
    pwdBox2.type = "password";
  }
};

//Login Form Password Box Eye

let e3 = document.getElementById("eye3");
let e4 = document.getElementById("eye4");
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

//Admin Taable Building

let makeTable = () => {
  let code = ``;
  for (let i = 1; i <= 20; i++) {
    code += `
        <tr class="hover:bg-blue-500 hover:text-white">
          <td class="p-3 text-wrap text-center w-1/6 font-bold border border-slate-600">${i}</td>
          <td class="p-3 text-wrap text-center w-1/6 border border-slate-600">
            ${new Date(Date.now() + i * 100000000).toLocaleString("en-IN", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </td>
          <td class="p-3 text-wrap text-center w-1/6 border border-slate-600">
            ayushawasthi @ gmail.com
          </td>
          <td class="p-3 text-wrap text-center w-1/6 border border-slate-600">
            Contact me
          </td>
          <td class="p-3 text-wrap text-center w-1/6 border border-slate-600">
            Hi this is Ayush from PTS Ltd. I am looking for Website
            Designing Service, if you are available then i would like talk
            further about that.
          </td>
        </tr>
      `;
  }
  document.getElementById("rows").innerHTML = code;
};

window.onload = makeTable;

//Model Close Button
let closeModel = () => {
  document.getElementById("profileModel");
};
