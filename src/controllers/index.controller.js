import arbolesDAO from "../dao/arbolesDAO.js"
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

static async getArbol(req, res) {
  var arbol = await arbolesDAO.getArbol(req);
  console.log(arbol)
  res.json(arbol)
}
}
