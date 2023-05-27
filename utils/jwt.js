// Create token and saving that in cookies
const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    // Option for cookies
    const options = {
        expires: new Date(Date.now() + 30 * 60 * 1000),
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        token,
    });
};

module.exports = sendToken;
