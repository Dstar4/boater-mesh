import { NextFunction } from "express";

module.exports.AsyncWrapper = function AsyncWrapper(fn) {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res).catch(next);
  };
};
