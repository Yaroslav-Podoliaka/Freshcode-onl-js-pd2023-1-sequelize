const { ValidationError } = require("yup");
const {
  Sequelize: { BaseError },
} = require("../db/models");

module.exports.validationErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).send({
      errors: [{ title: "Validation error", detalis: err.errors }],
    });
  }
  next(err);
};

module.exports.sequelizeErrorHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res.status(406).send({
      errors: [{ title: "Sequelize Error", detalis: err.errors }],
    });
  }
  next(err);
};

module.exports.errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    return;
  }
  if (!err) {
    next();
  } else {
    res.status(err.status ?? 500).send({
      errors: [{ title: err.message ?? "Internal server error" }],
    });
  }
};
