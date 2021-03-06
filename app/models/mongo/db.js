import * as dotenv from "dotenv";
// import * as data from "./seed-data.json";

import Mongoose from "mongoose";
// import seeder from "mais-mongoose-seeder";

export function initMongo() {
  dotenv.config();

  Mongoose.connect(process.env.db);
  const db = Mongoose.connection;

  // async function seed() {
  // eslint-disable-next-line max-len
  //  const dbData = await seeder(Mongoose).seed(data.default, { dropDatabase: false, dropCollections: true });
  //   console.log(dbData);
  // }

  db.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("database disconnected");
  });

  db.once("open", function () {
    console.log(`database connected to ${this.name} on ${this.host}`);
    // seed();
  });
}
