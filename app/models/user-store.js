"use strict";

import { JsonStore } from "./json-store.js";

export const userStore = {
  store: new JsonStore("./app/models/user-store.json", { users: [] }),
  collection: "users",

  async getAllUsers() {
    return this.store.findAll(this.collection);
  },

  async addUser(user) {
    this.store.add(this.collection, user);
  },

  async getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  async getUserByEmail(email) {
    return await this.store.findOneBy(this.collection, { email: email });
  }
};
