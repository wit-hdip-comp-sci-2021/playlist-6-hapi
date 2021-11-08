"use strict";

import { v4 } from "uuid";
import lodash from "lodash";

export let userMemStore = {
  store: [],

  async getAllUsers() {
    return this.store;
  },

  async addUser(user) {
    user._id = v4();
    this.store.push(user);
    return user;
  },

  async getUserById(id) {
    return lodash.find(this.store, { _id: id });
  },

  async getUserByEmail(email) {
    return lodash.find(this.store, { email: email });
  },

  async deleteUserById(id) {
    const user = await this.getUserById(id);
    lodash.remove(this.store, user);
  },

  async deleteAll() {
    this.store = [];
  }
};
