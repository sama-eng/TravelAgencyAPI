
const express = require("express");
const router = express.Router();

const {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  compareTrips
} = require("../controllers/tripcontroller");

const verifyAdmin = require("../middleware/verifyadmin");
const validateTrip = require("../middleware/validatetrip");

// Log every request to this router
const logRequest = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};

router.use(logRequest);

// Public routes
router.get("/", getAllTrips);
router.get("/:id", getTripById);

// Public comparison endpoint
router.post("/compare", compareTrips);

// Admin-only routes
router.post("/", verifyAdmin, validateTrip, createTrip);
router.put("/:id", verifyAdmin, updateTrip);
router.delete("/:id", verifyAdmin, deleteTrip);

module.exports = router;
