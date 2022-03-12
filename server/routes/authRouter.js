import express from "express";
import rateLimit from "express-rate-limit";
import { serialize } from "cookie";
import requestIp from "request-ip";
import responses from "&/utils/responses";

const router = express.Router();

const { ADMIN_PASSWORD, ADMIN_SESSION, NODE_ENV } = process.env;

const limiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  handler: function (req, res /*next*/) {
    return responses.CONFLICT(
      res,
      "Too many login attempts.  Please try again later."
    );
  },
  keyGenerator: function (req, res) {
    return requestIp.getClientIp(req);
  },
});

router.post("/login", limiter, async (req, res) => {
  if (req.body.password === ADMIN_PASSWORD) {
    res.setHeader(
      "Set-Cookie",
      serialize("ADMIN_SESSION", ADMIN_SESSION, {
        path: "/",
        maxAge: 7200000, //2hours
        secure: NODE_ENV === "production",
      })
    );
    return responses.OK(res, {});
  }
  return responses.UNAUTHORIZED(res);
});

export default router;
