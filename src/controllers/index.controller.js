import PostalesDAO from "../dao/postalesDAO.js"
export default class  indexController{
static renderIndex (req, res) {
  //res.render('index');
  res.render('index');
};



static renderFormulario(req,res){

  res.render('formulario', {noButtons:true})  
}




}
