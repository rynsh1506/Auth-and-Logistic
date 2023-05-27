const express = require("express");
const router = express.Router();

const logisticController = require("../controllers/logisticController");
const isAuthenticated = require("../middleware/authMiddleware");

router.get("/rates", isAuthenticated, logisticController.fetchRates);
router.get("/data", isAuthenticated, logisticController.getLogisticData);

module.exports = router;
