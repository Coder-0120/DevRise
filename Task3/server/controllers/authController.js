const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {

    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }
        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }
        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.json({
            success: true,
            token
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

};
module.exports = login;