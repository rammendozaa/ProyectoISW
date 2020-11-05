let postales;
let cardaway;
import { ObjectId } from "bson"
import {Date}       from "bson"

export default class PostalesDAO {
  static async injectDB(conn) {
    if (postales) {
      return;
    }
    try {
      cardaway = await conn.db(process.env.CARDAWAY_NS);
      postales = await conn.db(process.env.CARDAWAY_NS).collection("postales");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in PostalesDAO: ${e}`
      );
    }
  }
  static async insertPostales(toInsertPostales = [{  }]) {
    let response = { insertedIds: undefined, errors: undefined };
    try {
      let insertResult = await postales.insertMany(toInsertPostales, {
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
      let resultBulkWrite = await postales.bulkWrite(deleteOperations);
	  response.nDeleted=resultBulkWrite.deletedCount
    } catch (e) {
      response.errors = e;
    }
    return response;
  }

  static async getPostales({
    page=0,
    postalesPerPage=9,
    filter={}
  }){
    let response
  try{
   response= await postales.find(filter,{limit:postalesPerPage,skip:page*postalesPerPage}).toArray() 
  }catch(e){
    response=e
  }
    return response
  }

}
