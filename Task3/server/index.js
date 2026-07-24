const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
const authRoutes = require("./routes/authRoute");
const contactRoutes = require("./routes/contactRoute");
const aboutRoute = require("./routes/aboutRoute");
const projectRoute = require("./routes/projectRoute");
const skillRoute = require("./routes/skillsRoute");
const experienceRoute=require("./routes/experienceRoute");
const educationRoute=require("./routes/educationRoute");
const certificatesRoutes=require("./routes/certificateRoute");
const socialRoute=require("./routes/socialRoute");

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/about", aboutRoute);
app.use("/api/projects", projectRoute);
app.use("/api/skills",skillRoute);
app.use("/api/experience",experienceRoute);
app.use("/api/education",educationRoute);
app.use("/api/certificates",certificatesRoutes);
app.use("/api/social",socialRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
