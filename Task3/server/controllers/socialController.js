const Social = require("../models/Social");

// Create Social
const createSocial = async (req, res) => {
    try {

        const existingSocial = await Social.findOne();

        if (existingSocial) {
            return res.status(400).json({
                success: false,
                message: "Social links already exist."
            });
        }

        const social = await Social.create(req.body);

        res.status(201).json({
            success: true,
            message: "Social links created successfully.",
            data: social
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


// Get Social
const getSocial = async (req, res) => {
    try {

        const social = await Social.findOne();

        if (!social) {
            return res.status(404).json({
                success: false,
                message: "Social links not found."
            });
        }

        res.status(200).json({
            success: true,
            data: social
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


// Update Social
const updateSocial = async (req, res) => {
    try {

        const social = await Social.findById(req.params.id);

        if (!social) {
            return res.status(404).json({
                success: false,
                message: "Social links not found."
            });
        }

        const updatedSocial = await Social.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Social links updated successfully.",
            data: updatedSocial
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


// Delete Social
const deleteSocial = async (req, res) => {
    try {

        const social = await Social.findById(req.params.id);

        if (!social) {
            return res.status(404).json({
                success: false,
                message: "Social links not found."
            });
        }

        await social.deleteOne();

        res.status(200).json({
            success: true,
            message: "Social links deleted successfully."
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


module.exports = {
    createSocial,
    getSocial,
    updateSocial,
    deleteSocial
};