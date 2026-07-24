const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
// const authRoutes = require("./routes/authRoute");
const contactRoutes = require("./routes/contactRoute");
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

// app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
