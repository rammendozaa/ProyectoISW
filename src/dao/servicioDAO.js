let servicios;
let database;
export default class servicioDAO {
  static async injectDB(conn) {
    if (servicios) {
      return;
    }
    try {
      database = await conn.db(process.env.PYR_NS);
      servicios = await conn.db(process.env.PYR_NS).collection("servicios");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in ArbolesDAO: ${e}`
      );
    }
  }
  
  static async insertServicio(toInsertServicio) {
    let response = { insertedId: undefined };
    let insertResult = await servicios.insertOne(toInsertServicio);
    response.insertedId = insertResult.insertedId;
    return response;
  }
  static async deleteServicio(toDeleteAdminId){
    let response={deletedCount:undefined}
    let result = await servicios.deleteOne({_id:toDeleteAdminId})
    response.deletedCount= result.deletedCount
    return response
  }
}
