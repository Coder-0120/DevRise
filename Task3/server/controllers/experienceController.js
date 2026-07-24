const Experience = require("../models/Experience");

const createExperience = async (req, res) => {
    try {

        const experience = await Experience.create(req.body);

        res.status(201).json({
            success: true,
            message: "Experience added successfully.",
            data: experience
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getExperiences = async (req, res) => {
    try {

        const experiences = await Experience.find().sort({ startDate: -1 });

        res.status(200).json({
            success: true,
            count: experiences.length,
            data: experiences
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getExperience = async (req, res) => {
    try {

        const experience = await Experience.findById(req.params.id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found."
            });
        }

        res.status(200).json({
            success: true,
            data: experience
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const updateExperience = async (req, res) => {
    try {

        const experience = await Experience.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Experience updated successfully.",
            data: experience
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const deleteExperience = async (req, res) => {
    try {

        const experience = await Experience.findById(req.params.id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found."
            });
        }

        await experience.deleteOne();

        res.status(200).json({
            success: true,
            message: "Experience deleted successfully."
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    createExperience,
    getExperiences,
    getExperience,
    updateExperience,
    deleteExperience
};