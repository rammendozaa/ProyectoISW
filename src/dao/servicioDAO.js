let servicios, usuarios;
let database;
let ObjectId = require('mongodb').ObjectID;

export default class servicioDAO {
  static async injectDB(conn) {
    if (servicios) {
      return;
    }
    try {
      database = await conn.db(process.env.PYR_NS);
      servicios = await conn.db(process.env.PYR_NS).collection("servicios");
      usuarios = await conn.db(process.env.PYR_NS).collection("usuarios");
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
    let responseAlcaldia, responseServicios
    try {
      responseAlcaldia = await usuarios.findOne({"_id" : alcaldia});
      responseServicios = await servicios.find({"alcaldia" : responseAlcaldia.delegacion}).toArray();
    } catch (e) {
      responseServicios = e
    }
    return responseServicios
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
    console.log("Servicio a modificar:")
    console.log(servicio.idServicio)
    console.log(servicio.estado)
    
    try {
      modified = await servicios.updateOne({"_id": ObjectId(servicio.idServicio)}, {"$set": {"estado":servicio.estado}})
      if (modified) {
        response = {servicio}
        console.log(response)
      }

    } catch (e) {
      console.log("error al actualizar el estado del servicio")
      console.log(e)
      response = false
    }
    return response
  }
}
