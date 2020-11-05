import usuariosDao from "../dao/usersDAO.js";

export default class adminController {
  static renderAdmin(req, res) {
    if (!req.session.admin) {
      res.redirect("/");
    }
    //res.render('index');
    res.render("admin/admin", { noButtons: true });
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
