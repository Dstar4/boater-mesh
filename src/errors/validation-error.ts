module.exports = class ValidationError {
  message: string;
  model: any;
  constructor(message, model) {
    this.message = message;
    this.model = model;
  }
};
