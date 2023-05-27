const mongoose = require("mongoose");

const logisticSchema = new mongoose.Schema({
    logistic_name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    destination_name: {
        type: String,
        required: true,
    },
    origin_name: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
});

const Logistic = mongoose.model("Logistic", logisticSchema);

module.exports = Logistic;
