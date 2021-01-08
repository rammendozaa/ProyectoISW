import usuariosDao from "../dao/usersDAO.js";
import adminDao from "../dao/adminDao.js";
import passport from "passport";
var path = require("path");

export default class userController {
  static async agregarUsuario(req, res) {
    let result = validarCampos(req.body);
    if (result.errors.length == 0) {
      try {
        let response = await usuariosDao.insertUsuario(result.json);
      } catch (e) {
        result.errors.push({
          id: "correo",
          msg: "Correo electronico ya registrado"
        });
      }
    }
    res.json({ errors: result.errors });
  }
  static async logIn(req, res) {
    if (!(req.body.username && req.body.password)) {
      return res.json({ success: false, msg: "Ocurrio un error" });
    }
    let response = await adminDao.login(req.body);
    if (response.loginResult == 1) {
      req.session.admin = true;
      return res.json({ success: true, msg: req.body.username ,tipo:"admin"});
    } else if (response.loginResult == 0) {
      return res.json({ success: false, msg: "Contraseña Incorrecta" });
    } else {
      passport.authenticate("local", function(err, user, info) {
        if (err) {
          return res.json(err);
        }
        if (!user) {
          return res.json(info);
        }
        req.logIn(user, function(err) {
          if (err) {
            return res.json(err);
          }
          return res.json(info);
        });
      })(req, res);
    }
  }
static  renderPerfil(req,res){
  if(req.user){
    res.render('usuario/perfil');
  }
  else{
    res.render('index')
  }
}
static logOut(req,res){
  req.logout();
  req.session.admin=false;
  res.redirect('/');
}
}

function validarCampos(json) {
  let ret = {};
  ret["errors"] = [];
  if (json.nombre == "")
    ret.errors.push({ id: "nombre", msg: "Campo Obligatorio" });
  if (json.primerAp == "")
    ret.errors.push({ id: "primerAp", msg: "Campo Obligatorio" });
  if (json.password.length < 5)
    ret.errors.push({ id: "password", msg: "Minimo 5 Caracateres" });
  if (!/.+@.+\..+/.test(json.correo))
    ret.errors.push({ id: "correo", msg: "Correo Invalido" });
  if (json.fechaNac == "")
    ret.errors.push({ id: "fechaNac", msg: "Campo Obligatorio" });

  if (ret.errors.length == 0) {
    ret["json"] = {};
    ret["json"]["nombre"] = json.nombre;
    ret["json"]["primerAp"] = json.primerAp;
    ret["json"]["segundoAp"] = json.segundoAp;
    ret["json"]["passwd"] = json.password;
    ret["json"]["_id"] = json.correo;
    ret["json"]["fechaNac"] = json.fechaNac;
    ret["json"]["delegacion"] = json.delegacion;
  }
  return ret;
}
