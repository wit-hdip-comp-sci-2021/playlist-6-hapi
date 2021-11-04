"use strict";

import { JsonStore } from "./json-store.js";
import { v4 } from "uuid";

export const userStore = {
  store: new JsonStore("./app/models/user-store.json", { users: [] }),
  collection: "users",

  async getAllUsers() {
    return this.store.findAll(this.collection);
  },

  async addUser(user) {
    user.id = v4();
    this.store.add(this.collection, user);
  },

  async getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  async getUserByEmail(email) {
    return await this.store.findOneBy(this.collection, { email: email });
  },

  async deleteUserById(id) {
    const user = await this.getUserById(id);
    await this.store.remove(this.collection, user);
  },

  async deleteAll() {
    await this.store.removeAll(this.collection);
  }
};
