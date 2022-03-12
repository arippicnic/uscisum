import express from "express";

import isAuthorized from "&/middleware/auth";
import authRouter from "./authRouter";
import adminRouter from "./adminRouter";
import postsRouter from "./postsRouter";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/admin", isAuthorized, adminRouter);
router.use("/posts", postsRouter);

export default router;
