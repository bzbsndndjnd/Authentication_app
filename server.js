require("dotenv").config();
//console.log(process.env.NODE_ENV);
const express = require("express");
const connectDB = require("./config/dbCOnn");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const corsOptions = require("./config/corsOptions")
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")))
app.use("/", require("./routs/root"));
app.use("/auth", require("./routs/authRoutes"));
app.use("/users", require("./routs/userRoutes"));
app.use((req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ message: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

mongoose.connection.once("open", () => {
    console.log("Connect to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
});

mongoose.connection.on("errors", (err) => {
    console.log(err);
})