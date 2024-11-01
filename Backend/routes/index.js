import express from "express";
import { contactUsCtrl } from "../Controllers/controllers";

let router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.post("/", contactUsCtrl);

router.post("/", contactUsCtrl);

export default router;
