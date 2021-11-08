import { userJsonStore } from "./json/user-json-store.js";
import { playlistJsonStore } from "./json/playlist-json-store.js";

import {initMongo} from "./mongo/db.js"
import {userMongoStore} from "./mongo/user-mongo-store.js"

export const db = {
  userStore : userMongoStore,
  playlistStore : null,

  init() {
    initMongo()
  }
};
