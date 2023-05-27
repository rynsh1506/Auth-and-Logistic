const bcrypt = require("bcrypt");
const User = require("../models/user");
const sendToken = require("../utils/jwt");

const registerUser = async (req, res) => {
    const { msisdn, name, username, password } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [{ username }, { msisdn }],
        });

        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Username or msisdn already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            msisdn,
            name,
            username,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { msisdn, password } = req.body;

    try {
        const user = await User.findOne({ msisdn });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        sendToken(user, 200, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
