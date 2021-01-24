let arboles;
let cardaway;
import { ObjectId } from "bson"
import {Date}       from "bson"

export default class ArbolesDAO {
  static async injectDB(conn) {
    if (arboles) {
      return;
    }
    try {
      cardaway = await conn.db(process.env.PYR_NS);
      arboles = await conn.db(process.env.PYR_NS).collection("arboles");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in ArbolesDAO: ${e}`
      );
    }
  }

  static async insertArbol(toInsertArbol) {
    let response = {insertedId: undefined, errors: undefined};
    let insertResult = await arboles.insertOne(toInsertArbol);
    response.insertedId = insertResult.insertedIds;
    return response;
  }

  static async deleteArbol(toDeleteArbol) {
    let response = {n : undefined}
    let deleteResult = await arboles.deleteOne({"_id": ObjectId(toDeleteArbol)});
    response.n = deleteResult.deletedCount;
    return response;
  }

  static async getArboles(){
    let response
  try {
   response = await arboles.find({},{projection:{"geometry.coordinates":1}}).toArray()
  } catch(e) {
    response = e
  }
    return response
  }

// idArbol es ObjectId
  static async getArbol(idArbol) {
    let response;
    try {
      response = await arboles.find({"_id": ObjectId(idArbol)}).toArray();
    } catch (e) {
      response = e;
    }
    return response;
  }

}
