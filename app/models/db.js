import { userJsonStore } from "./json/user-json-store.js";
import { playlistJsonStore } from "./json/playlist-json-store.js";
import { trackJsonStore } from "./json/track-json-store.js";
import { userMemStore } from "./mem/user-mem-store.js";
import { playlistMemStore } from "./mem/playlist-mem-store.js";
import { initMongo } from "./mongo/db.js";

export const db = {
  userStore: null,
  playListStore: null,
  trackStore: null,

  init() {
    this.userStore = userJsonStore;
    this.playlistStore = playlistJsonStore;
    this.trackStore = trackJsonStore;
    initMongo();
  },
};
