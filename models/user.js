const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    msisdn: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (value) {
                // Format msisdn to remove non-digit characters
                const formattedMsisdn = value.replace(/\D/g, "");

                // Check if the formatted msisdn starts with "62"
                return formattedMsisdn.startsWith("62");
            },
            message: "Invalid msisdn format",
        },
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, "secred");
};

const User = mongoose.model("User", userSchema);

module.exports = User;
