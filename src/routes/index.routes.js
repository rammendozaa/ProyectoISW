const express = require("express");
const router = express.Router();

// Controllers
import controller from  "../controllers/index.controller"

router.get("/", controller.renderIndex);
router.get("/registro",controller.renderFormulario)
router.get("/getArboles",controller.getArboles)
router.get("/getArbol", controller.getArbol)
router.get("/getServicioByIdUser", controller.getServicioByIdUser)
//router.get("/getServicioByDelegacion", controller.getServicioByDelegacion)
router.get("/getServicioByIdServicio", controller.getServicioByIdServicio)
router.post("/updateServicio", controller.updateServicio)
router.post("/registrarServicio",controller.registrarServicio)
router.get("/insertArbol", controller.insertArbol)
module.exports =  router;
