const express = require("express");
const router = express.Router();
import passport from "passport"
// Controllers
import controller from  "../controllers/users.controller.js"

router.post("/registro", controller.agregarUsuario);
router.post("/login",controller.logIn);
  module.exports = router;
