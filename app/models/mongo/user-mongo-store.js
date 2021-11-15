import { User } from "./user.js";

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    const user = await User.findOne({ _id: id }).lean();
    return user;
  },

  async addUser(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    return await this.getUserById(userObj._id);
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id) {
    await User.deleteOne({ _id: id });
  },

  async deleteAll() {
    await User.deleteMany({});
  },
};
