var express = require("express");
var router = express.Router();
const {
    HomepageRoute,
    RegisterRoute,
    LoginRoute,
    LogoutRoute,
} = require("../controllers/userController");
const { isLoggedIn } = require("../middleware");

/**
 * @route GET /
 * @desc Homepage
 * @access Private
 */
router.get("/", isLoggedIn, HomepageRoute);

// register post
router.post("/register", RegisterRoute);

// login post
router.post("/login", LoginRoute);

// logout user
router.get("/logout", isLoggedIn, LogoutRoute);

module.exports = router;
