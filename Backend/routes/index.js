import express from "express";
import { contactUsCtrl, contactUsData } from "../Controllers/controllers.js";

let router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/data", contactUsData);

router.post("/", contactUsCtrl);

export default router;
