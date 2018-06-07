class ApiError extends Error {
  constructor(props) {
    super(props);

    const { type, message, code, ...rest } = props;
    this.type = type;
    this.errorMessage = message;
    this.errorCode = code;
    Object.keys(rest).forEach((key, index) => {
      this[key] = rest[key];
    });
  }
}

module.exports = ApiError;