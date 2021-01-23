import usuariosDao from "../dao/usersDAO.js";
import administradoresDao from "../dao/adminDao.js";

export default class adminController {
  static renderAdmin(req, res) {
    if (!req.session.admin) {
      res.redirect("/");
    }
    //res.render('index');
    res.render("admin/admin", { noButtons: true });
  }

  static async agregarAdministrador(req, res) {
    let result = validarCamposAdmin(req.body);
    if (result.errors.length == 0) {
      try {
        let response = await administradoresDao.insertAdmin(result.json);
      } catch (e) {
        result.errors.push({
          id: "_id",
          msg: "nombre de admin ya registrado"
        });
      }
    }
    res.json({ errors: result.errors });
  }

  

  static async getUsuarios(req, res) {
    let reqJson = {}
    reqJson["page"] = parseInt(req.query.page)
    reqJson["textToSearch"] = req.query.textToSearch
    reqJson["usersPerPage"] = parseInt(req.query.usersPerPage)
    let usuarios = await usuariosDao.getUsuarios(reqJson)
    res.json(usuarios)
  }
  static async deleteUsuario(req,res){
    let deleteResponse
    let responseJson={success:false}
    try{
     deleteResponse=await usuariosDao.deleteUsuario(req.query.correo)
    }
    catch(e){
      console.log(e)
    }
    if(deleteResponse.n == 1)
      responseJson["success"]=true

    res.json(responseJson)
  }
}

function validarCamposAdmin(json) {
  let ret = {};
  ret["errors"] = [];
  if (json.nombre == "")
    ret.errors.push({ id: "nombre", msg: "Campo Obligatorio" });
  if (json.password.length < 5)
    ret.errors.push({ id: "password", msg: "Minimo 5 Caracateres" });
  if (ret.errors.length == 0) {
    ret["json"] = {};
    ret["json"]["nombre"] = json.nombre;
    ret["json"]["passwd"] = json.password;
  }
  return ret;
}