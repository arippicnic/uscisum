import Joi from "joi";
import { joiObjectId } from "./joiSchema";

module.exports = {
  searchSchema: Joi.object({
    query: Joi.string().required(),
  }),
  postSchema: Joi.object({
    post: joiObjectId.required(),
  }),
  voteSchema: Joi.object({
    idPost: joiObjectId.required(),
    vote: Joi.string().valid("UP", "DOWN").required(),
  }),
};
