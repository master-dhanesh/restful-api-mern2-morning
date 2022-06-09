const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils");
const jwt = require("jsonwebtoken");

exports.HomepageRoute = async (req, res, next) => {
    const user = await User.findById(req.auth._id).exec();
    res.status(200).json({
        success: true,
        message: "This is authenticated homepage",
        user,
    });
};

exports.RegisterRoute = async (req, res, next) => {
    try {
        let { name, email, password } = req.body;

        const user = await User.findOne({ email }).exec();

        if (user)
            return res
                .status(400)
                .json({ message: false, error: "user already exists" });

        password = hashPassword(password);

        const newuser = await User.create({ name, email, password });
        res.status(201).json({ message: true, user: newuser });
    } catch (err) {
        res.status(201).json({ message: false, erorr: err.message });
    }
};

exports.LoginRoute = async (req, res, next) => {
    try {
        let { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password").exec();

        if (!user)
            return res
                .status(404)
                .json({ message: false, error: "user not found" });

        if (!comparePassword(password, user.password))
            return res
                .status(400)
                .json({ message: false, error: "email or password incorrect" });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "3d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            // secure: true
        });

        res.status(201).json({ message: true, token });
    } catch (err) {
        res.status(201).json({ message: false, erorr: err.message });
    }
};

exports.LogoutRoute = (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ message: true, message: "logged out successfully" });
};
