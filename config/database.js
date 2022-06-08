const mongoose = require("mongoose");

exports.dbconnection = () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log("--MONGODB CONNECTED--"))
        .catch((err) => console.log("--DB ERROR-- ", err.message));
};
