import Vote from "&/models/Vote";

module.exports = {
  getIp: (req) => {
    const forwarded = req.headers["x-forwarded-for"];
    return (
      (Array.isArray(forwarded) ? forwarded.shift() : forwarded || "")
        .split(",")
        .pop()
        .trim() ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress
    );
  },
  getVote: async (idPost) => {
    const upVote = await Vote.countDocuments({ idPost, vote: "UP" });
    const downVote = await Vote.countDocuments({ idPost, vote: "DOWN" });
    return upVote - downVote;
  },
};
