const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const userModel = new Schema({
    name: {
        type: String,
        minlength: [4, "Name mube be at least 4 characters long."],
        required: [true, "Name field can not empty."],
    },
    email: {
        type: String,
        required: [true, "Email field can not empty."],
        validate: [validator.isEmail, "Invalid email"],
    },
    password: {
        type: String,
        minlength: [6, "Password mube be at least 6 characters long."],
        required: [true, "Password field can not empty."],
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const user = mongoose.model("user", userModel);

module.exports = user;
