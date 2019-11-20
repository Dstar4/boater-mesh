module.exports.AsyncWrapper = function AsyncWrapper(fn) {
    return function (req, res, next) { return fn(req, res).catch(next); };
};
