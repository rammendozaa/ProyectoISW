import PostalesDAO from  "./dao/postalesDAO.js"
import usuariosDao from "./dao/usersDAO.js"
import adminsDao from "./dao/adminDao.js"
import {MongoClient} from "mongodb"
require("dotenv").config();
export default class database{
static   configDb(){
  var promise= MongoClient.connect(
  
  process.env.CARDAWAY_DB_URI,
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
  PostalesDAO.injectDB(client)
  adminsDao.injectDB(client)
  console.log("Database Connected") 

  
  })
    return promise
}
}


