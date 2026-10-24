
const trips = require("../models/Trip");

// GET all trips
const getAllTrips = (req, res) => {
  res.status(200).json(trips);
};

// GET one trip by ID
const getTripById = (req, res) => {
  const id = Number(req.params.id);
  const trip = trips.find((trip) => trip.id === id);

  if (!trip) {
    return res.status(404).json({ message: "Trip not found" });
  }

  res.status(200).json(trip);
};

// POST create a new trip
const createTrip = (req, res) => {
  const { destination, country, cost } = req.body;

  const newTrip = {
    id: trips.length > 0
      ? Math.max(...trips.map((trip) => trip.id)) + 1
      : 1,
    destination: destination.trim(),
    country: country.trim(),
    cost: Number(cost)
  };

  trips.push(newTrip);

  res.status(201).json({
    message: "Trip created successfully",
    trip: newTrip
  });
};

// PUT update a trip
const updateTrip = (req, res) => {
  const id = Number(req.params.id);
  const trip = trips.find((trip) => trip.id === id);

  if (!trip) {
    return res.status(404).json({ message: "Trip not found" });
  }

  const { destination, country, cost } = req.body;

  if (destination !== undefined) {
    trip.destination = destination;
  }

  if (country !== undefined) {
    trip.country = country;
  }

  if (cost !== undefined) {
    trip.cost = Number(cost);
  }

  res.status(200).json({
    message: "Trip updated successfully",
    trip
  });
};

// DELETE a trip
const deleteTrip = (req, res) => {
  const id = Number(req.params.id);
  const index = trips.findIndex((trip) => trip.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Trip not found" });
  }

  const deletedTrip = trips.splice(index, 1)[0];

  res.status(200).json({
    message: "Trip deleted successfully",
    trip: deletedTrip
  });
};

// Compare two trips
const compareTrips = (req, res) => {
  const { tripId1, tripId2 } = req.body;

  if (
    !Number.isInteger(tripId1) ||
    !Number.isInteger(tripId2) ||
    tripId1 <= 0 ||
    tripId2 <= 0 ||
    tripId1 === tripId2
  ) {
    return res.status(400).json({
      message: "Provide two different positive integer trip IDs"
    });
  }

  let trip1 = null;
  let trip2 = null;

  // Search for both trips using a loop
  for (const trip of trips) {
    if (trip.id === tripId1) {
      trip1 = trip;
    }

    if (trip.id === tripId2) {
      trip2 = trip;
    }
  }

  if (!trip1 || !trip2) {
    return res.status(404).json({
      message: "One or both trips not found"
    });
  }

  const costDifference = Math.abs(trip1.cost - trip2.cost);
  let comparisonMessage;

  if (trip1.cost < trip2.cost) {
    comparisonMessage = `${trip1.destination} is cheaper`;
  } else if (trip2.cost < trip1.cost) {
    comparisonMessage = `${trip2.destination} is cheaper`;
  } else {
    comparisonMessage = "Neither destination is cheaper; both cost the same";
  }

  res.status(200).json({
    trip1: {
      id: trip1.id,
      destination: trip1.destination,
      cost: trip1.cost
    },
    trip2: {
      id: trip2.id,
      destination: trip2.destination,
      cost: trip2.cost
    },
    costDifference,
    comparisonMessage
  });
};

module.exports = {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  compareTrips
};
