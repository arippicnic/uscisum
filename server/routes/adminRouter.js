import express from "express";

import Posts from "&/models/Posts";
import responses from "&/utils/responses";

const router = express.Router();

const { ADMIN_SESSION } = process.env;

router.post("/post", async (req, res) => {
  const created = await Posts.create({ ...req.body });
  return responses.OK(res, {});
});

router.delete("/signOut", async (req, res) => {
  res.cookie(ADMIN_SESSION, "none", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  return responses.OK(res, {});
});

export default router;
