import contactUsForm from "../Model/contactUs.js";
import bcrypt from "bcrypt";
import userRegModel from "../Model/userReg.js";

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
  let userQuery = userRegModel.where({ username: username });
  let authHash = await userQuery.findOne();
  let authFlag;

  if (authHash != null) {
    console.log(`Username : ${authHash.username}`);
    authFlag = await decryptHash(password, authHash.password);
  } else {
    authFlag = false;
  }
  res.json({ authFlag });
};

// Registration Controller
let regCtrl = async (req, res, next) => {
  let { username, password, cpassword } = req.body;
  let userQuery = userRegModel.where({ username: username });
  let userFind = await userQuery.findOne();
  console.log(userFind);
  try {
    if (userFind == null) {
      if (password == cpassword) {
        let regHash = await encryptHash(password);
        let um = new userRegModel({
          username: username,
          password: regHash,
          role: 1,
        });
        await um.save();
        res.send("Registration Successfully Done.");
      } else {
        throw new Error("Password do not match.");
      }
    } else {
      throw new Error("User Already Exists.");
    }
  } catch (error) {
    console.log(error);
    res.send("User Already Exists.");
  }
};

export { contactUsCtrl, loginCtrl, regCtrl };
