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

console.log(document.getElementById("userDrop"));
// document.getElementById("userDrop").addEventListener("click", handleUserDD);

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

let handleSwitch = (event) => {
  if (event.target.id == "login") {
    reg.style.display = "none";
    login.style.display = "flex";
  }
  if (event.target.id == "reg") {
    reg.style.display = "flex";
    login.style.display = "none";
  }
};

//Handle Login Submission

let handleLogin = async (event) => {
  event.preventDefault();
  //validation
  //Submission
  let loginF = document.getElementById("loginF");
  let username = document.getElementsByName("username")[0].value;
  let password = document.getElementsByName("password")[0].value;
  let data = {
    username,
    password,
  };
  try {
    await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log("Data Sent Successfully.");
    loginF.reset();
  } catch (error) {
    console.log(error);
  }
  // console.log(JSON.stringify(data));
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

//Profile Model Password Eye

let eyeP1 = document.getElementById("eyeP1");
let eyeP2 = document.getElementById("eyeP2");
let profileInp = document.getElementById("profileInp");

let handlePeye = (event) => {
  if (event.target.id == "eyeP1") {
    eyeP1.style.display = "none";
    eyeP2.style.display = "block";
    profileInp.type = "text";
  } else {
    eyeP1.style.display = "block";
    eyeP2.style.display = "none";
    profileInp.type = "password";
  }
};

//Profile Edit

let handlePfEdit = () => {
  document.getElementsByName("pusername")[0].removeAttribute("disabled");
  document.getElementsByName("puseremail")[0].removeAttribute("disabled");
  document.getElementsByName("puserpwd")[0].removeAttribute("disabled");
};

let handlePfSave = () => {
  document.getElementsByName("pusername")[0].setAttribute("disabled", "");
  document.getElementsByName("puseremail")[0].setAttribute("disabled", "");
  document.getElementsByName("puserpwd")[0].setAttribute("disabled", "");
};

//Model Close Button

let showModel = () => {
  document.getElementById("profileModel").style.display = "flex";
  document.getElementsByTagName("body")[0].style.overflow = "hidden";
};

let closeModel = () => {
  eyeP1.style.display = "block";
  eyeP2.style.display = "none";
  profileInp.type = "password";
  document.getElementById("profileModel").style.display = "none";
  document.getElementsByTagName("body")[0].style.overflow = "auto";
};

// Sign Out

// let sigMeOut = () => {};
