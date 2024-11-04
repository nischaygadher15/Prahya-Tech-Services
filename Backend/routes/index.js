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

router.post("/", contactUsCtrl);

router.put("/", updateAdmin);

router.get("/data", contactUsData);

router.get("/admin", getAdmin);

export default router;
