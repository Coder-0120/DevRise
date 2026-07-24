const About = require("../models/About");

const createAbout = async (req, res) => {
    try {
        const {
            name,
            title,
            description,
            email
        } = req.body;

        if (!title || !description || !name || !email) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        const about = await About.create({
            name,
            title,
            description,
            email
        });

        res.status(201).json({
            success: true,
            message: "About created successfully.",
            data: About
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

const getAbout = async (req, res) => {
    try {

        const abouts = await About.find();
        res.status(200).json({
            success: true,
            data: abouts
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};



const updateAbout = async (req, res) => {
    try {

        const about = await About.findById(req.params.id);

        if (!about) {
            return res.status(404).json({
                success: false,
                message: "about not found."
            });
        }

        const updatedAbout = await About.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "About updated successfully.",
            data: updatedAbout
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

const deleteAbout = async (req, res) => {
    try {

        const about = await About.findById(req.params.id);

        if (!about) {
            return res.status(404).json({
                success: false,
                message: "about not found."
            });
        }

        await About.deleteOne();

        res.status(200).json({
            success: true,
            message: "about deleted successfully."
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

module.exports = {
    createAbout,
    getAbout,
    updateAbout,
    deleteAbout
};