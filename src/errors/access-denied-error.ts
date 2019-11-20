module.exports = class AccessDeniedError {
  constructor(public message: string) {
    this.message = message;
  }
};
export {};
