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
  static async insertArboles(toInsertArboles = [{  }]) {
    let response = { insertedIds: undefined, errors: undefined };
    try {
      let insertResult = await arboles.insertMany(toInsertArboles, {
        ordered: false
      });

      response.insertedIds = Object.values(insertResult.insertedIds);
    } catch (e) {
      response.errors = e;
    }
    return response;
  }

  static async deleteArboles(toDeleteArbolesIds = []) {
    let deleteOperations = toDeleteArbolesIds.map(function(id) {
      let Operation = {};
      Operation["deleteOne"] = {filter:{_id:ObjectId(id) }};
      return Operation;
    });
    let response={nDeleted:undefined,errors:undefined};
    try {
      let resultBulkWrite = await arboles.bulkWrite(deleteOperations);
	  response.nDeleted=resultBulkWrite.deletedCount
    } catch (e) {
      response.errors = e;
    }
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
