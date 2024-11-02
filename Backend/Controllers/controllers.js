import contactUsForm from "../Model/contactUs.js";

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

let loginCtrl = (req, res, next) => {
  let { username, password } = req.body;
  console.log(`user: ${username}, pwd:${password}`);
  res.send();
};

let regCtrl = (req, res, next) => {
  let { username, password, cpassword } = req.body;
  console.log(`user: ${username}, pwd:${password}, cpwd:${cpassword}`);
  res.send();
};

export { contactUsCtrl, loginCtrl, regCtrl };
