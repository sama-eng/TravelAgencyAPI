
const verifyAdmin = (req, res, next) => {
  if (req.headers["x-role"] === "admin") {
    return next();
  }

  return res.status(403).json({
    message: "Admin access required"
  });
};

module.exports = verifyAdmin;
