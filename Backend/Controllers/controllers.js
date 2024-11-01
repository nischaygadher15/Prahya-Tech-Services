import contactUsForm from "../Model/contactUs";

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

export { contactUsCtrl };
