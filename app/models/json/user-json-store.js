"use strict";

import { JsonStore } from "./json-store.js";
import { v4 } from "uuid";

export const userJsonStore = {
  store: new JsonStore("./app/models/json/users.json", { users: [] }),

  async getAllUsers() {
    return this.store.findAll("users");
  },

  async addUser(user) {
    user._id = v4();
    this.store.add("users", user);
    return user;
  },

  async getUserById(id) {
    return this.store.findOneBy("users", { _id: id });
  },

  async getUserByEmail(email) {
    return await this.store.findOneBy("users", { email: email });
  },

  async deleteUserById(id) {
    const user = await this.getUserById(id);
    await this.store.remove("users", user);
  },

  async deleteAll() {
    await this.store.removeAll("users");
  }
};
