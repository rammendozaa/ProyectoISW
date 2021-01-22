import arbolesDAO from  "./dao/arbolesDAO.js"
import usuariosDao from "./dao/usersDAO.js"
import adminsDao from "./dao/adminDao.js"
import servicioDAO from "./dao/servicioDAO.js"
import {MongoClient} from "mongodb"
require("dotenv").config();
export default class database{
static   configDb(){
  var promise= MongoClient.connect(
  
  process.env.PYR_DB_URI,
  { useUnifiedTopology: true ,
  },
)
  
  .catch(err=>{
    console.error(err.stack)
   process.exit(1)
  })
  .then((client)=>{
  this.client=client
  usuariosDao.injectDB(client)
  arbolesDAO.injectDB(client)
  adminsDao.injectDB(client)
  servicioDAO.injectDB(client)
  console.log("Database Connected") 

  
  })
    return promise
}
}


