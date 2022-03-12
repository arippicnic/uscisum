import { ReasonPhrases, StatusCodes } from "http-status-codes";

module.exports = {
  OK: (res, data) => res.status(StatusCodes.OK).send(data),

  CREATED: (res, data) => res.status(StatusCodes.CREATED).send(data),

  NOT_FOUND: (res, error) =>
    res.status(StatusCodes.NOT_FOUND).send({
      error: error || "I can't find this page anywhere. Give it back!",
      code: "NOT_FOUND",
    }),

  BAD_REQUEST: (res, error) =>
    res.status(StatusCodes.BAD_REQUEST).send({
      error: error || "Gimme a proper request!",
      code: "BAD_REQUST",
    }),

  INTERNAL: (res, error) =>
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error || ReasonPhrases.INTERNAL_SERVER_ERROR,
      code: "INTERNAL_SERVER_ERROR",
    }),

  CONFLICT: (res, error) =>
    res.status(StatusCodes.CONFLICT).send({ error, code: "CONFLICT" }),

  UNAUTHORIZED: (res, error) =>
    res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ error: "Unauthorized request", code: "UNAUTHORIZED" }),
};
