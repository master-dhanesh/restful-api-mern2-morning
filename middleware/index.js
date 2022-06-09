const { expressjwt } = require("express-jwt");
exports.isLoggedIn = expressjwt({
    getToken: (req, res) => req.cookies.token,
    algorithms: ["HS256"],
    secret: process.env.JWT_SECRET,
}); // req.user - > passport / req.auth -> expressjwt
