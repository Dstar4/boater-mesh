module.exports.AsyncWrapper = function AsyncWrapper(fn) {
  return (req: Request, res: Response, next) => fn(req, res).catch(next);
};
