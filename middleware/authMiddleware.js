const User = require("../models/user");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "Mising Token" });
    }

    const decoded = jwt.verify(token, "secred");

    req.user = await User.findById(decoded.id);

    next();
};

module.exports = isAuthenticated;
