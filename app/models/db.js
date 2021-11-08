import { userJsonStore } from "./json/user-json-store.js";
import { userMemStore} from "./mem/user-mem-store.js";
import { playlistJsonStore } from "./json/playlist-json-store.js";

import { initMongo } from "./mongo/db.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";

export const db = {
  userStore: userMemStore,
  playlistStore: null,

  init() {
    initMongo();
  }
};
