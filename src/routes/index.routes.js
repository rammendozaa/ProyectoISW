const express = require("express");
const router = express.Router();

// Controllers
import controller from  "../controllers/index.controller"

router.get("/", controller.renderIndex);
router.get("/registro",controller.renderFormulario)
router.get("/getArboles",controller.getArboles)
router.get("/getArbol", controller.getArbol)
router.get("/getServicioByIdUser", controller.getServicioByIdUser)
router.get("/getServicioByAlcaldia", controller.getServicioByAlcaldia)
router.get("/getServicioByIdServicio", controller.getServicioByIdServicio)
router.post("/updateServicio", controller.updateServicio)
router.post("/registrarServicio",controller.registrarServicio)
router.post("/insertArbol", controller.insertArbol)
module.exports =  router;
