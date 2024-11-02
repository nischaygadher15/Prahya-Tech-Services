import express from "express";
import { loginCtrl } from "../Controllers/controllers.js";

let router = express.Router();

router.post("/login", loginCtrl);

export default router;
