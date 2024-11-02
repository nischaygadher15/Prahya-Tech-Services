//Error Messages
let errMsg = {
  e101: "Password should have at least one uppercase letter, one special character and one number.",
  e102: "Password should be at least six characters long.",
  e103: "Invalid Credentials.",
  e104: "User already exist.",
  e105: "Password do not match.",
  s101: "<i class='fa-solid fa-circle-check mr-2'></i>User Registered Successfully.",
};

// Login & Register Form Error Handing

let showError = (ecode, spanId) => {
  document.getElementById(`${spanId}`).style.display = "block";
  document.getElementById(`${spanId}`).innerHTML = errMsg[ecode];
};

let hideError = (spanId) => {
  document.getElementById(`${spanId}`).innerHTML = "";
  document.getElementById(`${spanId}`).style.display = "none";
};

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
  hideError("s101", "regSuccessMsg");
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
    let res = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let resData = await res.json();

    if (resData.authFlag) {
      hideError("pwdLogErr");
      loginF.reset();
      window.location.href = "./AdminPanel.html";
    } else {
      // throw new Error("Incorrect Credentials");
      showError("e103", "pwdLogErr");
    }
  } catch (error) {
    console.log(error);
  }
};

//Handle Registration Submission

let handleRegSub = async (event) => {
  event.preventDefault();

  let regF = document.getElementById("regF");
  let username = document.getElementsByName("rusername")[0].value;
  let password = document.getElementsByName("rpassword")[0].value;
  let cpassword = document.getElementsByName("cpassword")[0].value;
  let data = {
    username,
    password,
    cpassword,
  };

  try {
    if (password == cpassword) {
      let regResp = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      let regRespData = await regResp.json();
      if (regRespData.regFlag) {
        regF.reset();
        showError("s101", "regSuccessMsg");
      } else {
        console.log("pwds do not match");
      }
    } else {
    }
  } catch (error) {
    console.log(error);
  }
};

//Admin Table Building

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

if (window.location.pathname.includes("AdminPanel.html")) {
  document.getElementById("userDrop").addEventListener("click", handleUserDD);
  window.onload = makeTable;
}

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
