module.exports = async function() {
  console.log("Teardown Mongo Connection")
  delete global.cardawayClient
  delete global.cardawayDB
}
