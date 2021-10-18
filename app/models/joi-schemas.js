import Joi from "joi";

export const UserId = Joi.string().uuid().required().description("the id of the user");

export const UserCredentials = Joi.object().keys({
  email: Joi.string().email().example("homer@simpson.com").required(),
  password: Joi.string().example("secret").required()
}).label("User Credentials");

export const UserDetails = UserCredentials.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("User Details");

export const User = UserDetails.keys({
  id: UserId
}).label("User");

export const UserArray = Joi.array().items(User).label("User Array");
