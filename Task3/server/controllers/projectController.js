const Project = require("../models/Project");

const createProject = async (req, res) => {
    try {
        const {
            title,
            description,
            github,
            liveDemo,
            techStack,
            image,
            featured,
            order
        } = req.body;

        if (!title || !description || !github || !techStack) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        const project = await Project.create({
            title,
            description,
            github,
            liveDemo,
            techStack,
            image,
            featured,
            order
        });

        res.status(201).json({
            success: true,
            message: "Project created successfully.",
            data: project
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

const getProjects = async (req, res) => {
    try {

        const projects = await Project.find().sort({ order: 1 });
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

const getProject = async (req, res) => {
    try {

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found."
            });
        }

        res.status(200).json({
            success: true,
            data: project
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

const updateProject = async (req, res) => {
    try {

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found."
            });
        }

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Project updated successfully.",
            data: updatedProject
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

const deleteProject = async (req, res) => {
    try {

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found."
            });
        }

        await project.deleteOne();

        res.status(200).json({
            success: true,
            message: "Project deleted successfully."
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

module.exports = {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject
};