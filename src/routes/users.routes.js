const express = require("express");
const router = express.Router();
import passport from "passport"
// Controllers
import controller from  "../controllers/users.controller.js"

router.post("/registro", controller.agregarUsuario);
router.post("/login",controller.logIn);
router.get("/perfil",controller.renderPerfil);
router.get("/logout",controller.logOut);
  module.exports = router;
