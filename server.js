// https://dev.to/bigyank/a-quick-guide-to-setup-eslint-with-airbnb-and-prettier-3di2

import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Cookie from "@hapi/cookie";
import Joi from "joi";
import Handlebars from "handlebars";
import dotenv from "dotenv";
import HapiSwagger from "hapi-swagger";
import path from "path";
import { fileURLToPath } from "url";
import { routes } from "./routes.js";
import { accountsController } from "./app/controllers/accounts-controller.js";
import { db } from "./app/models/db.js";
import * as pack from "./package.json";

import { apiRoutes } from "./api-routes.js";

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

const server = Hapi.server({
  port: process.env.PORT || 4000,
  routes: { cors: true },
});

const swaggerOptions = {
  info: {
    title: "Playlist API",
    version: pack.default.version,
  },
  reuseDefinitions: false,
  definitionPrefix: "useLabel",
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
      options: swaggerOptions,
    },
  ]);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./app/views",
    layoutPath: "./app/views/layouts",
    partialsPath: "./app/views/partials",
    layout: true,
    isCached: false,
  });
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    validateFunc: accountsController.validate,
    redirectTo: "/",
  });
  server.auth.default("session");
  server.route(routes);
  server.route(apiRoutes);
  db.init();
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
