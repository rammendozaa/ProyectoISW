const MongoClient = require("mongodb").MongoClient;
const NodeEnvironment = require("jest-environment-node");
module.exports = class MongoEnvironment extends NodeEnvironment {
  async setup() {
    if (!this.global.Client) {
      try {
        this.global.Client = await MongoClient.connect(
          process.env.PYR_DB_URI,
          {
            useUnifiedTopology: true
          }
        );
      } catch (e) {
        console.error(
          "Unable to stablish connection with db: " +
            process.env.PYR_DB_URI +
            "\nError:" +
            e
        );
      }
      await super.setup();
    }
  }

  async teardown() {
    await this.global.Client.close();
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
};
