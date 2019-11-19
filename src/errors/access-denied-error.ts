module.exports = class AccessDeniedError {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
};
export {};
