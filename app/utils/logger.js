import Boom from "@hapi/boom";

export function validationError (request, h, error) {
  console.log(error.message);
  return Boom.badData();
}
