import express from "express";
import { loginCtrl, regCtrl } from "../Controllers/controllers.js";

let router = express.Router();

router.post("/login", loginCtrl);

router.post("/register", regCtrl);

export default router;
