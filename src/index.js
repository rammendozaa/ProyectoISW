require("dotenv").config();
import {promesa,app} from "./server.js";
const port = process.env.PORT || 4000
promesa.then(()=>{
   app.listen(port, () => {
    console.log("Server on port", port);
  }); 
})


