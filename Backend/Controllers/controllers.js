import contactUsForm from "../Model/contactUs.js";
import bcrypt from "bcrypt";
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

// bcrypt Encryption
// let encryptHash = async (ecryPwd) => {
//   try {
//     let salt = bcrypt.genSaltSync(10);
//     let ecryHash = await bcrypt.hash(ecryPwd, salt);
//     return ecryHash.toString();
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// bcrypt Comparison
// let decryptHash = async (pwd, dcryHash) => {
//   try {
//     let flag = await bcrypt.compare(pwd, dcryHash);
//     return flag;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

//Crypto Encryption
const { secret_key, secret_iv, encryption_method } = config;

if (!secret_key || !secret_iv || !encryption_method) {
  throw new Error(
    "secret_key, secret_iv, encryption_method are required for Encryption/Decryption."
  );
}

const key = crypto
  .createHash("sha512")
  .update(secret_key)
  .digest("hex")
  .substring(0, 32);

const encryptionIV = crypto
  .createHash("sha512")
  .update(secret_iv)
  .digest("hex")
  .substring(0, 16);

let encryptData = (data) => {
  const cipher = crypto.createCipheriv(encryption_method, key, encryptionIV);
  let cipherText = cipher.update(data, "utf8", "hex") + cipher.final("hex");
  let cipherBase64 = cipherText.toString("base64");
  console.log(cipherBase64);
  return { cipherBase64, key, encryptionIV };
};

//Crypto Decryption
let decryptData = ({ cipher, key, iv }) => {
  const cipherText = Buffer.from(cipher, "base64");
  const keyText = Buffer.from(key, "base64");
  const ivText = Buffer.from(iv, "base64");

  const decipher = crypto.createDecipheriv(encryption_method, keyText, ivText);
  let decipherText =
    decipher.update(cipherText.toString("utf8"), "hex", "utf8") +
    decipher.final("utf8");
  return decipherText;
};

// Login Controller
let loginCtrl = async (req, res, next) => {
  let { username, password } = req.body;
  let userQuery = userRegModel.where({ username: username });
  let userObj = await userQuery.findOne();
  let authFlag,
    errorCode = [];

  if (userObj != null) {
    // decrypted = decryptData(userObj.pwdObj);
    let { cipherBase64, key, encryptionIV } = encryptData(password);
    let { pwdObj } = userObj;
    if (
      cipherBase64 == pwdObj.cipher &&
      key == pwdObj.key &&
      encryptionIV == pwdObj.iv
    ) {
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
        // let regHash = await encryptHash(password);
        let { cipherBase64, key, encryptionIV } = encryptData(password);
        let um = new userRegModel({
          username: username,
          pwdObj: { cipher: cipherBase64, key: key, iv: encryptionIV },
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

export { contactUsCtrl, loginCtrl, regCtrl, contactUsData };
