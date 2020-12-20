let arboles;
let cardaway;
import { ObjectId } from "bson"
import {Date}       from "bson"

export default class PostalesDAO {
  static async injectDB(conn) {
    if (arboles) {
      return;
    }
    try {
      cardaway = await conn.db(process.env.PYR_NS);
      arboles = await conn.db(process.env.PYR_NS).collection("arboles");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in PostalesDAO: ${e}`
      );
    }
  }
  static async insertPostales(toInsertPostales = [{  }]) {
    let response = { insertedIds: undefined, errors: undefined };
    try {
      let insertResult = await arboles.insertMany(toInsertPostales, {
        ordered: false
      });

      response.insertedIds = Object.values(insertResult.insertedIds);
    } catch (e) {
      response.errors = e;
    }
    return response;
  }

  static async deletePostales(toDeletePostalesIds = []) {
    let deleteOperations = toDeletePostalesIds.map(function(id) {
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
  try{
   response= await arboles.find({},{projection:{"geometry.coordinates":1}}).toArray() 
  }catch(e){
    response=e
  }
    return response
  }

}
