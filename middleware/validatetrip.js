
const validateTrip = (req, res, next) => {
  const { destination, country, cost } = req.body;

  // Destination must be a non-empty string
  if (
    typeof destination !== "string" ||
    destination.trim() === ""
  ) {
    return res.status(400).json({
      message: "Destination must be a non-empty string"
    });
  }

  // Country must be a non-empty string
  if (
    typeof country !== "string" ||
    country.trim() === ""
  ) {
    return res.status(400).json({
      message: "Country must be a non-empty string"
    });
  }

  // Cost must be a finite number greater than zero
  if (
    typeof cost !== "number" ||
    !Number.isFinite(cost) ||
    cost <= 0
  ) {
    return res.status(400).json({
      message: "Cost must be a finite number greater than zero"
    });
  }

  // All checks passed
  next();
};

module.exports = validateTrip;
