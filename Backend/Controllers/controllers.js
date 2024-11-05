import contactUsForm from "../Model/contactUs.js";
import crypto from "crypto";
import config from "../config.js";
import userRegModel from "../Model/userReg.js";

let contactUsCtrl = async (req, res, next) => {
  let { createdat, username, email, subject, textarea } = req.body;
  try {
    let f1 = new contactUsForm({
      createdat: createdat,
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

let contactUsData = async (req, res, next) => {
  let tbData = await contactUsForm.find({}).sort({ createdat: -1 });
  res.json(tbData);
};

//Crypto Encryption
const { secret_key, secret_iv, encryption_method } = config;

if (!secret_key || !secret_iv || !encryption_method) {
  throw new Error(
    "secret_key, secret_iv, encryption_method are required for Encryption/Decryption."
  );
}

// Generate secret hash with crypto to use for encryption

const secretkey = crypto
  .createHash("sha512")
  .update(secret_key)
  .digest("hex")
  .substring(0, 32);

const encryptionIV = crypto
  .createHash("sha512")
  .update(secret_iv)
  .digest("hex")
  .substring(0, 16);

// Encrypt data
let encryptData = (data) => {
  const cipher = crypto.createCipheriv(
    encryption_method,
    secretkey,
    encryptionIV
  );
  return Buffer.from(
    cipher.update(data, "utf8", "hex") + cipher.final("hex")
  ).toString("base64");
};

// Decrypt data
let decryptData = (encryptedData) => {
  const buff = Buffer.from(encryptedData, "base64");
  const decipher = crypto.createDecipheriv(
    encryption_method,
    secretkey,
    encryptionIV
  );
  return (
    decipher.update(buff.toString("utf8"), "hex", "utf8") +
    decipher.final("utf8")
  );
};

//Updating Admin User Data

let updateAdmin = async (req, res, next) => {
  let { username, pwd } = req.body;

  let password = encryptData(pwd);
  let saveFlag;
  let adm = await userRegModel.findOneAndUpdate(
    { username: username },
    { username: username, password: password },
    { upsert: false, new: true }
  );
  console.log("adm:", adm);
  if (adm != null) {
    saveFlag = true;
    await adm.save();
  } else {
    saveFlag = false;
  }
  res.json({ saveFlag });
};

//Fetching Admin User Data
let getAdmin = async (req, res, next) => {
  let username = req.body.username;
  let admin = await userRegModel.findOne({ username: username });
  let cipher = admin.password;
  let pwd = decryptData(cipher);
  res.send(pwd);
};

// Login Controller
let loginCtrl = async (req, res, next) => {
  let { username, password } = req.body;
  let userQuery = userRegModel.where({ username: username });
  let userObj = await userQuery.findOne();
  let authFlag,
    errorCode = [];

  if (userObj != null) {
    let cipherBase64 = encryptData(password);
    if (cipherBase64 == userObj.password) {
      authFlag = true;
      errorCode = [];
    } else {
      authFlag = false;
      errorCode.push("e103");
    }
  } else {
    authFlag = false;
    errorCode.push("e106");
  }
  res.json({ authFlag: authFlag, error: errorCode });
};

// Registration Controller
let regCtrl = async (req, res, next) => {
  let { username, password, cpassword } = req.body;
  let userQuery = userRegModel.where({ username: username });
  let userFind = await userQuery.findOne();
  let regFlag,
    errorCode = [];

  try {
    if (userFind == null) {
      if (password == cpassword) {
        let cipherBase64 = encryptData(password);
        let um = new userRegModel({
          username: username,
          password: cipherBase64,
          role: 1,
        });
        await um.save();
        regFlag = true;
        errorCode = [];
      } else {
        errorCode.push("e105");
        regFlag = false;
      }
    } else {
      regFlag = false;
      errorCode.push("e104");
      if (password != cpassword) errorCode.push("e105");
      if (password.length < 6 || cpassword.length < 6) errorCode.push("e102");
    }
    res.json({ regFlag: regFlag, error: errorCode });
  } catch (error) {
    errorCode.push(error.message);
    res.json({ regFlag: false, error: errorCode });
  }
};

export {
  contactUsCtrl,
  loginCtrl,
  regCtrl,
  contactUsData,
  updateAdmin,
  getAdmin,
};
