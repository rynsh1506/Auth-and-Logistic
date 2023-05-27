const Logistic = require("../models/logistic");
const { $where } = require("../models/user");

const fetchRates = async (req, res) => {
    try {
        // Check if user is authenticated (valid JWT)
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Fetch logistic rates from database
        const rates = await Logistic.find();
        res.status(200).json({ rates });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getLogisticData = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { origin_name, destination_name, duration } = req.query;

        // Temukan data logistik berdasarkan nama asal dan tujuan
        const logisticData = await Logistic.findOne({
            origin_name,
            destination_name,
            duration,
        });

        if (!logisticData) {
            return res.status(404).json({ message: "Logistic data not found" });
        }

        res.status(200).json({ logisticData });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { fetchRates, getLogisticData };
