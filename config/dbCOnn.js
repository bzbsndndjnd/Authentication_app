const mongoose = require("mongoose");
console.log(mongoose);

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;