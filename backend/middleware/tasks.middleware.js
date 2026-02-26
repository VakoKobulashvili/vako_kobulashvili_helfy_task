function validations(req, res, next) {
  const { title, description, priority } = req.body;

  const errors = [];

  if (!title) {
    errors.push("Title is required!");
  } else if (title.trim().length >= 20) {
    errors.push("Title must be less than 20 characters.");
  }

  if (!description) {
    errors.push("Description is required.");
  }

  const allowedPriorities = ["low", "medium", "high"];
  if (priority !== undefined && !allowedPriorities.includes(priority)) {
    errors.push("Priority must be Low, Medium, or High only!");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Error during validating",
      errors,
    });
  }

  next();
}

module.exports = validations;
