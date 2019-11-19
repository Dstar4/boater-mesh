module.exports = class AuthenticationError {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
};

export {};
