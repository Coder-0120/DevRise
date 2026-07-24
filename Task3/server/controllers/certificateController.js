const Certificate = require("../models/Certificate");

const createCertificate = async (req, res) => {
    try {

        const certificate = await Certificate.create(req.body);

        res.status(201).json({
            success: true,
            message: "Certificate added successfully.",
            data: certificate
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getCertificates = async (req, res) => {
    try {

        const certificates = await Certificate.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: certificates.length,
            data: certificates
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getCertificate = async (req, res) => {
    try {

        const certificate = await Certificate.findById(req.params.id);

        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found."
            });
        }

        res.status(200).json({
            success: true,
            data: certificate
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const updateCertificate = async (req, res) => {
    try {

        const certificate = await Certificate.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Certificate updated successfully.",
            data: certificate
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const deleteCertificate = async (req, res) => {
    try {

        const certificate = await Certificate.findById(req.params.id);

        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found."
            });
        }

        await certificate.deleteOne();

        res.status(200).json({
            success: true,
            message: "Certificate deleted successfully."
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    createCertificate,
    getCertificates,
    getCertificate,
    updateCertificate,
    deleteCertificate
};