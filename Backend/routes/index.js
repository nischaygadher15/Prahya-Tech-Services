import express from "express";
import contactUsForm from "../Model/contactUs.js";
let router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.post("/", async (req, res, next) => {
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
});

export default router;
