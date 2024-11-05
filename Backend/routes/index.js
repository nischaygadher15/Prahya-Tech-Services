import express from "express";
import {
  contactUsCtrl,
  contactUsData,
  getAdmin,
  updateAdmin,
} from "../Controllers/controllers.js";

let router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/", contactUsCtrl);

router.put("/", updateAdmin);

router.get("/data", contactUsData);

router.post("/admin", getAdmin);

export default router;
