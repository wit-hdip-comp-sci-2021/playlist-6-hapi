"use strict";
import { v4 as uuidv4 } from "uuid";
import { userStore } from "../models/user-store.js";

export const accountsController = {

  index(request, response) {
    const viewData = {
      title: "Login or Signup"
    };
    return response.view("main", { title: "Welcome to Donations" });
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    return response.view("login-view", viewData);
  },

  logout(request, response) {
    request.cookieAuth.clear();
    return response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    return response.view("signup-view", viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuidv4();
    userStore.addUser(user);
    return response.redirect("/");
  },

  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.payload.email);
    if (user) {
      request.cookieAuth.set({ email: user.email });
      return response.redirect("/dashboard");
    } else {
      return response.redirect("/login");
    }
  },

  async getCurrentUser(request) {
    const userEmail = request.auth.credentials.email;
    return await userStore.getUserByEmail(userEmail);
  }
};
