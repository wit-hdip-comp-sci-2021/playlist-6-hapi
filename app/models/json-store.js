"use strict";

import { JSONFile, Low } from "lowdb";
import lodash from "lodash";

export class JsonStore {
  constructor(file, defaults) {
    this.db = new Low(new JSONFile(file));
    this.db.data = defaults;
    this.db.read();
    return this;
  }

  async save() {
    await this.db.write();
  }
  async findBy(collection, filter) {
    await this.db.read();
    const objects = this.db.data[collection];
    const results = lodash.filter(objects, filter);
    return results;
  }

  async findOneBy(collection, filter) {
    await this.db.read();
    const objects = this.db.data[collection];
    const result = lodash.find(objects, filter);
    return result;
  }

  async add(collection, obj) {
    await this.db.read();
    const objects = this.db.data[collection];
    objects.push(obj);
    await this.db.write();
  }

  async remove(collection, obj) {
    await this.db.read();
    const objects = this.db.data[collection];
    lodash.remove(objects,obj);
    await this.db.write();
  }
}

