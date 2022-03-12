import responses from "&/utils/responses";

export default function (req, res, next) {
  const cookieRequest = req.cookies;
  if (
    cookieRequest &&
    cookieRequest.ADMIN_SESSION === process.env.ADMIN_SESSION
  ) {
    return next();
  }
  return responses.UNAUTHORIZED(res);
}
