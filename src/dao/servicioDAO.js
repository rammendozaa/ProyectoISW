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

  static async getServicioByIdUser(idUser) {
    let response
    try {
      response = await servicios.find({"correo": idUser}).toArray()
    } catch (e) {
      response = e
    }
    return response
  }

  static async getServicioByAlcaldia(alcaldia) {
    let response
    try {
      response = await servicios.find({"alcaldia" : alcaldia}).toArray();
    } catch (e) {
      response = e
    }
    return response
  }

  static async getServicioByIdServicio(servicioId) {
    let response
    try {
      response = await servicios.find({"_id" : ObjectId(servicioId)}).toArray()
    } catch (e) {
      response = e
    }
    return response
  }

  static async updateServicio(servicio) {
    let modified
    let response
    try {
      modified = await servicios.updateOne({"_id": ObjectId(servicio.idServicio)}, {"$set": {"status":servicio.status}})
      if (modified) {
        response = {servicio}
      }
    } catch (e) {
      response = false
    }
    return response
  }
}
