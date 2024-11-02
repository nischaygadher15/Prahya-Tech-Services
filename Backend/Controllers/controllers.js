import contactUsForm from "../Model/contactUs.js";
import bcrypt from "bcrypt";

let contactUsCtrl = async (req, res, next) => {
  let { username, email, subject, textarea } = req.body;
  try {
    let f1 = new contactUsForm({
      username: username,
      email: email,
      subject: subject,
      message: textarea,
    });
    await f1.save();
    res.send();
  } catch (error) {
    console.log(error);
  }
};

// Hash Encryption
let encryptHash = async (ecryPwd) => {
  try {
    let salt = bcrypt.genSaltSync(10);
    let ecryHash = await bcrypt.hash(ecryPwd, salt);
    return ecryHash.toString();
  } catch (error) {
    throw new Error(error);
  }
};

// Hash Decryption
let decryptHash = async (pwd, dcryHash) => {
  try {
    let flag = await bcrypt.compare(pwd, dcryHash);
    return flag;
  } catch (error) {
    throw new Error(error);
  }
};

// Login Controller
let loginCtrl = async (req, res, next) => {
  let { username, password } = req.body;
  let authHash = "$2b$10$gaYAAT1m90TqfLd0f2yuK.1ZqZXZRN53n8rf9VAHbwDAEnzGsioA6";
  let authFlag = await decryptHash(password, authHash);
  console.log("AuthFlag :", authFlag);
  res.send("Yeah it is working.");
};

// Registration Controller
let regCtrl = async (req, res, next) => {
  let { username, password, cpassword } = req.body;
  if (password == cpassword) {
    let regHash = await encryptHash(password);
    console.log(regHash);
  } else console.log("Password Do not Match.");
  res.send();
};

export { contactUsCtrl, loginCtrl, regCtrl };
