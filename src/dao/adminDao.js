let admins;
let cardaway;
import bcrypt from "bcryptjs"
export default class AdminDAO {
  static async injectDB(conn) {
    if (admins) {
      return;
    }
    try {
      cardaway = await conn.db(process.env.CARDAWAY_NS);
      admins = await conn.db(process.env.CARDAWAY_NS).collection("admins");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in PostalesDAO: ${e}`
      );
    }
  }
  static async login({ username, password }) {
  let admin = await admins.findOne({_id:username})
  if(admin == null){
    return {loginResult:-1,usuario:null}
  }
  if(await bcrypt.compare(password,admin.password)){
    return {loginResult:1,usuario:admin._id}
  }
  else{
    return {loginResult:0,usuario:null}
  }
  }
  static async insertAdmin(toInsertAdmin) {
    if (toInsertAdmin.password)
      toInsertAdmin.password = await bcrypt.hash(toInsertAdmin.password, 10);
    let response = { insertedId: undefined };
    let insertResult = await admins.insertOne(toInsertAdmin);
    response.insertedId = insertResult.insertedId;
    return response;
  }
  static async deleteAdmin(toDeleteAdminId){
    let response={deletedCount:undefined}
    let result = await admins.deleteOne({_id:toDeleteAdminId})
    response.deletedCount= result.deletedCount
    return response
  }
}
