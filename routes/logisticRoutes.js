const express = require("express");
const router = express.Router();

const logisticController = require("../controllers/logisticController");
const isAuthenticated = require("../middleware/authMiddleware");

router.get("/rates", isAuthenticated, logisticController.fetchRates);
router.get("/data", isAuthenticated, logisticController.getLogisticData);
router.post("/add", isAuthenticated, logisticController.addLogisticData);

module.exports = router;
