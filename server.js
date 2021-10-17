"use strict";
import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Cookie from "@hapi/cookie";
import Joi from "joi";
import Handlebars from "handlebars";
import dotenv from "dotenv";
import { routes } from "./routes.js";
import { accountsController } from "./app/controllers/accounts-controller.js";
import HapiSwagger from "hapi-swagger";
import * as pack from "./package.json";

import path from "path";
import { fileURLToPath } from "url";
import { apiRoutes } from "./api-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

const server = Hapi.server({
  port: process.env.PORT || 4000,
  routes: { cors: true }
});

const swaggerOptions = {
  info: {
    title: "Test API Documentation",
    version: pack.default.version
  }
};

async function init() {
  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);

  server.validator(Joi);

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  server.views({
    engines: {
      hbs: Handlebars
    },
    relativeTo: __dirname,
    path: "./app/views",
    layoutPath: "./app/views/layouts",
    partialsPath: "./app/views/partials",
    layout: true,
    isCached: false
  });
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false
    },
    validateFunc: accountsController.validate,
    redirectTo: "/"
  });
  server.auth.default("session");
  server.route(routes);
  server.route(apiRoutes);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
