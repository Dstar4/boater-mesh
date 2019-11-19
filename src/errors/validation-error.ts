module.exports = class ValidationError {
  constructor(public message: string, public model) {
    this.message = message;
    this.model = model;
  }
};
