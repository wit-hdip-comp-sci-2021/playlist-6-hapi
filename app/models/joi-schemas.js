import Joi from "joi";

export const Uuid = Joi.string().uuid().description("a valid UUID");
export const RequiredUuid = Joi.string().uuid().required().description("a valid UUID");

export const UserCredentials = Joi.object().keys({
  email: Joi.string().email().example("homer@simpson.com").required(),
  password: Joi.string().example("secret").required()
}).label("User Credentials");

export const UserDetails = UserCredentials.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required()
}).label("User Details");

export const User = UserDetails.keys({
  id: Uuid
}).label("User");

export const UserArray = Joi.array().items(User).label("User Array");

export const Song = Joi.object().keys({
  id: Uuid,
  title: Joi.string().example("Piano Concerto No. 4").required(),
  artist: Joi.string().example("Beethoven").required(),
  duration: Joi.number().example(12).required()
});

export const Playlist = Joi.object().keys({
  id: Uuid,
  userid: RequiredUuid,
  title: Joi.string().example("Playlist Title").required(),
  //songs : Joi.array().items(Song).label("Song Array").required(),
});

export const PlaylistArray = Joi.array().items(Playlist).label("Playlist Array");
