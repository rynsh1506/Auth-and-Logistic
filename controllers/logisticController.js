const Logistic = require("../models/logistic");

const addLogisticData = async (req, res, next) => {
    try {
        const {
            logistic_name,
            amount,
            destination_name,
            origin_name,
            duration,
        } = req.body;

        const newLogistic = new Logistic({
            logistic_name,
            amount,
            destination_name,
            origin_name,
            duration,
        });

        await newLogistic.save();
        res.status(200).json({ message: "Logistic data added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const fetchRates = async (req, res) => {
    try {
        // Fetch logistic rates from database
        const rates = await Logistic.find();
        res.status(200).json({ rates });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getLogisticData = async (req, res) => {
    try {
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

module.exports = { fetchRates, getLogisticData, addLogisticData };
