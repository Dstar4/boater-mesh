module.exports.AsyncWrapper = function AsyncWrapper(fn) {
  return (req, res, next) => fn(req, res).catch(next);
};
