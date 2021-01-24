import arbolesDAO from "../dao/arbolesDAO.js"
import servicioDAO from "../dao/servicioDAO.js"
export default class  indexController{
static renderIndex (req, res) {
  //res.render('index');
  res.render('index');
};



static renderFormulario(req,res){
  res.render('formulario', {noButtons:true})
}

static async getArboles(req,res){
  var arboles=await arbolesDAO.getArboles();
  console.log(arboles)
  res.json(arboles)
}

static async insertArbol(req, res) {
  var arbol = await arbolesDAO.insertArbol(req.body);
  console.log(arbol)
  res.json(arbol)
}

static async getArbol(req, res) {
  var arbol = await arbolesDAO.getArbol(req.query.idArbol);
  console.log(arbol)
  res.json(arbol)
}
static async registrarServicio(req, res){
     var result= await servicioDAO.insertServicio(req.body)
  res.json(result)
}

static async registrarArboles(req, res) {
  var result = await arbolesDAO.insertArboles(req.body)
  res.json(result)
}

static async getServicioByIdUser(req, res) {
  var servicio = await servicioDAO.getServicioByIdUser(req.query.idUser)
  console.log(servicio)
  res.json(servicio)
}

static async getServicioByAlcaldia(req, res) {
  var servicio = await servicioDAO.getServicioByAlcaldia(req.query.alcaldia)
  console.log(servicio)
  res.json(servicio)
}

static async getServicioByIdServicio(req, res)  {
  var servicio = await servicioDAO.getServicioByIdServicio(req.query.idServicio)
  console.log(servicio)
  res.json(servicio)
}

static async updateServicio(req, res) {
  let servicio = await servicioDAO.updateServicio(req.body.estado)
  if (servicio) {
    res.json({success: true, usuario})
  } else {
    res.json({success: false})
  }
}

}
