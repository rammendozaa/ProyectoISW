const express = require("express");
const router = express.Router();

// Controllers
import controller from  "../controllers/index.controller"

router.get("/", controller.renderIndex);
router.get("/registro",controller.renderFormulario)
router.get("/getArboles",controller.getArboles)
router.get("/getArbol", controller.getArbol)
router.get("/registrarServicio",controller.registrarServicio)
router.get("/registrarArboles", controller.registrarArboles)
module.exports =  router;
