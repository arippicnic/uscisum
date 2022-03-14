import express from "express";
import { Types } from "mongoose";

import Posts from "&/models/Posts";
import Vote from "&/models/Vote";

import { getIp, getVote } from "&/utils/general";
import { postSchema, voteSchema, searchSchema } from "&/validate";
import responses from "&/utils/responses";

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Posts.find().sort({ createdAt: "desc" }).limit(10).exec();
  return responses.OK(res, posts);
});

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    const validationError = searchSchema.validate({ query }).error;

    if (validationError)
      return responses.BAD_REQUEST(res, validationError.details[0].message);
    const results = query
      ? await Posts.find({ title: { $regex: query, $options: "i" } })
          .limit(5)
          .exec()
      : [];
    return responses.OK(res, { results });
  } catch (err) {
    console.log(err);
    return responses.INTERNAL(res);
  }
});

router.get("/post/:post", async (req, res) => {
  const validationError = postSchema.validate(req.params).error;

  if (validationError)
    return responses.BAD_REQUEST(res, validationError.details[0].message);

  const idPost = Types.ObjectId(req.params.post);

  const found = await Posts.findOne({ _id: idPost }).lean().exec();
  if (!found) return responses.NOT_FOUND(res);
  const vote = await getVote(idPost);
  return responses.OK(res, {
    ...found,
    vote,
  });
});

router.post("/vote/:select", async (req, res) => {
  try {
    const vote = req.params.select;
    const validationError = voteSchema.validate({
      idPost: req.body.idPost,
      vote,
    }).error;

    if (validationError)
      return responses.BAD_REQUEST(res, validationError.details[0].message);

    const author = getIp(req);
    const idPost = Types.ObjectId(req.body.idPost);

    const found = await Posts.findOne({ _id: idPost }).lean().exec();
    if (!found) return responses.NOT_FOUND(res);

    if (await Vote.exists({ author, idPost, vote }))
      return responses.CONFLICT(res, `You already voted ${vote} this lyrics`);

    const foundVote = await Vote.findOne({ author, idPost });
    if (foundVote) {
      await foundVote.updateOne({ vote });
      const voteResult = await getVote(idPost);
      return responses.OK(res, { vote: voteResult });
    }
    const created = await Vote.create({
      vote,
      author,
      idPost,
    });
    const voteResult = await getVote(idPost);
    return responses.CREATED(res, { vote: voteResult });
  } catch (err) {
    console.log(err);
    return responses.INTERNAL(res);
  }
});

export default router;
