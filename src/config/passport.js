const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
import UsuariosDAO from "./../dao/usersDAO.js"

passport.use(new LocalStrategy(
  async (username, password, done) => {
    let {loginResult,usuario}= await UsuariosDAO.login({
      username,
      password
    } )
  // Match Email's User
  if (loginResult==-1) {
    return done(null, false ,{success:false, msg:"Usuario no regristrado"});
  } else if(loginResult == 1){
    // Match Password's User
      return done(null, usuario,{success:true,msg:usuario.nombre});
  }
    else {
      return done(null, false,{success:false,msg:"Contraseña Incorrecta"});
    }
  }
));


passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(async function(id, done) {
  var user,err
try{
user= await UsuariosDAO.getUsuario({email:id})
}
catch(e){
 err=e
}
    done(err, user);
});

