const Skill = require("../models/Skills");

// Create Skill Category
const createSkill = async (req, res) => {
    try {

        const { category, skills } = req.body;

        if (!category || !skills) {
            return res.status(400).json({
                success: false,
                message: "Category and skills are required."
            });
        }

        const existingCategory = await Skill.findOne({ category });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category already exists."
            });
        }

        const skill = await Skill.create({
            category,
            skills
        });

        res.status(201).json({
            success: true,
            message: "Skill category created successfully.",
            data: skill
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


// Get All Skill Categories
const getSkills = async (req, res) => {
    try {

        const skills = await Skill.find();

        res.status(200).json({
            success: true,
            count: skills.length,
            data: skills
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


// Get Single Skill Category
const getSkill = async (req, res) => {
    try {

        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill category not found."
            });
        }

        res.status(200).json({
            success: true,
            data: skill
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


// Update Skill Category
const updateSkill = async (req, res) => {
    try {

        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill category not found."
            });
        }

        const updatedSkill = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Skill category updated successfully.",
            data: updatedSkill
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


// Delete Skill Category
const deleteSkill = async (req, res) => {
    try {

        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill category not found."
            });
        }

        await skill.deleteOne();

        res.status(200).json({
            success: true,
            message: "Skill category deleted successfully."
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


module.exports = {
    createSkill,
    getSkills,
    getSkill,
    updateSkill,
    deleteSkill
};