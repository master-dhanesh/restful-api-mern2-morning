var express = require("express");
var router = express.Router();

const User = require("../models/userModel");

/**
 * @route GET /
 * @desc Homepage
 * @access Private
 */
router.get("/", function (req, res, next) {
    res.status(200).json({ message: "This is authenticated homepage" });
});

// register post
router.post("/register", async function (req, res, next) {
    try {
        const { name, email, password } = req.body;
        const newuser = await User.create({ name, email, password });
        res.status(201).json({ message: true, user: newuser });
    } catch (err) {
        res.status(201).json({ message: false, erorr: err.message });
    }
});

module.exports = router;
