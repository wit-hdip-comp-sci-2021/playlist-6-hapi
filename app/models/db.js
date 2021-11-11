import { userJsonStore } from "./json/user-json-store.js";
import { playlistJsonStore } from "./json/playlist-json-store.js";
import { userMemStore } from "./mem/user-mem-store.js";
import { playlistMemStore } from "./mem/playlist-mem-store.js";
import { initMongo } from "./mongo/db.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { playlistMongoStore } from "./mongo/playlist-mongo-store.js";

export const db = {
  userStore: null,
  playListStore: null,

  init() {
    this.userStore = userJsonStore;
    this.playlistStore = playlistMemStore;
    initMongo();
  }
};
