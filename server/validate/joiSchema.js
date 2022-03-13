import Joi from "joi";
import { isValidObjectId } from "mongoose";
import responses from "&/utils/responses";

module.exports = {
  joiObjectId: Joi.string()
    .trim()
    .min(1)
    .custom((value, helpers) => {
      try {
        return isValidObjectId(value)
          ? value
          : helpers.message("ID must conform to an ObjectId");
      } catch (err) {
        return helpers.message("ID must conform to an ObjectId");
      }
    }),
  joiResponses: (getSchema, param, res) => {
    const validationError = getSchema.validate(param).error;

    if (validationError)
      throw new responses.BAD_REQUEST(res, validationError.details[0].message);
  },
};
