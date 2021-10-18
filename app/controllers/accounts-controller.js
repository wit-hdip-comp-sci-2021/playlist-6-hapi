"use strict";
import { v4 as uuidv4 } from "uuid";
import { userStore } from "../models/user-store.js";
import Boom from "@hapi/boom";
import { UserCredentials, UserDetails } from "../models/joi-schemas.js";

export const accountsController = {
  index: {
    auth: false,
    handler: function(request, h) {
      return h.view("main", { title: "Welcome to Playlist" });
    }
  },
  showSignup: {
    auth: false,
    handler: function(request, h) {
      return h.view("signup-view", { title: "Sign up for Playlist" });
    }
  },
  signup: {
    auth: false,
    validate: {
      payload: UserDetails,
      options: { abortEarly: false },
      failAction: function(request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      }
    },
    handler: async function(request, h) {
      try {
        const user = request.payload;
        user.id = uuidv4();
        await userStore.addUser(user);
        return h.redirect("/");
      } catch (err) {
        return h.view("signup-view", { errors: [{ message: err.message }] });
      }
    }
  },
  showLogin: {
    auth: false,
    handler: function(request, h) {
      return h.view("login-view", { title: "Login to Playlist" });
    }
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentials,
      options: { abortEarly: false },
      failAction: function(request, h, error) {
        return h.view("login-view", { title: "Sign in error", errors: error.details }).takeover().code(400);
      }
    },
    handler: async function(request, h) {
      const { email, password } = request.payload;
      try {
        const user = await userStore.getUserByEmail(request.payload.email);
        if (!user) {
          const message = "Email address is not registered";
          throw Boom.unauthorized(message);
        }
        request.cookieAuth.set({ email: user.email });
        return h.redirect("/dashboard");
      } catch (err) {
        return h.view("login-view", { errors: [{ message: err.message }] });
      }
    }
  },
  logout: {
    handler: function(request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    }
  },

  async validate(request, session) {
    const user = await userStore.getUserByEmail(session.email);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  }
};
