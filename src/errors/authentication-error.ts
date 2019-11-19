module.exports = class AuthenticationError {
  constructor(public message: string) {
    this.message = message;
  }
};

export {};
