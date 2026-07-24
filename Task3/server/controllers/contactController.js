const Contact = require("../models/Contact");

const createContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const contact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: contact
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
module.exports = createContact;