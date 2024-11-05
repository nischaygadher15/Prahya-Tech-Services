import express from "express";
import path from "path";

import {
  contactUsCtrl,
  contactUsData,
  getAdmin,
  updateAdmin,
} from "../Controllers/controllers.js";

let router = express.Router();

/* GET home page. */
// router.get("/", (req, res, next) => {
//   res.render("index", { title: "Express" });
// });
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.hbs"));
});

router.post("/", contactUsCtrl);

router.put("/", updateAdmin);

router.get("/data", contactUsData);

router.post("/admin", getAdmin);

export default router;
