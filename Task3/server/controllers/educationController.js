const Education = require("../models/Education");

const createEducation = async (req, res) => {
    try {

        const education = await Education.create(req.body);

        res.status(201).json({
            success: true,
            message: "Education added successfully.",
            data: education
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getEducations = async (req, res) => {
    try {

        const educations = await Education.find().sort({ endYear: -1 });

        res.status(200).json({
            success: true,
            count: educations.length,
            data: educations
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getEducation = async (req, res) => {
    try {

        const education = await Education.findById(req.params.id);

        if (!education) {
            return res.status(404).json({
                success: false,
                message: "Education not found."
            });
        }

        res.status(200).json({
            success: true,
            data: education
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const updateEducation = async (req, res) => {
    try {

        const education = await Education.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!education) {
            return res.status(404).json({
                success: false,
                message: "Education not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Education updated successfully.",
            data: education
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const deleteEducation = async (req, res) => {
    try {

        const education = await Education.findById(req.params.id);

        if (!education) {
            return res.status(404).json({
                success: false,
                message: "Education not found."
            });
        }

        await education.deleteOne();

        res.status(200).json({
            success: true,
            message: "Education deleted successfully."
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    createEducation,
    getEducations,
    getEducation,
    updateEducation,
    deleteEducation
};