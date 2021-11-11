"use strict";

import { v4 } from "uuid";
import { JSONFile, Low } from "lowdb";
import lodash from "lodash";

const db = new Low(new JSONFile("./app/models/json/users.json"));
db.data = { users: [] };

export const userJsonStore = {

  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  async addUser(user) {
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },

  async getUserById(id) {
    await db.read();
    return lodash.find(db.data.users, { _id: id });
  },

  async getUserByEmail(email) {
    await db.read();
    return lodash.find(db.data.users, { email: email });
  },

  async deleteUserById(id) {
    await db.read();
    const user = lodash.find(db.data.users, { _id: id });
    lodash.remove(db.data.users, user);
    await db.write();
  },

  async deleteAll() {
    db.data.users = [];
    await db.write();
  }
};
