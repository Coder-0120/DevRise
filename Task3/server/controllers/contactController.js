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

const getAllContact=async(req,res)=>{
    try{
        const contacts=await Contact.find().sort({
            createdAt:-1
        });
        return res.status(201).json({
            success:true,
            data:contacts
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error in fetching all contacts"
        })
    }
}
const deltecontact=async(req,res)=>{
    try{
        const {id}=req.params;
        const contact=await Contact.findById(id);
        if(!contact){
            return res.status(400).json({
                success:false,
                message:"contact not exist for this id"
            })
        };
        await Contact.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Deleted Successfully"
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error in deleting contact"
        });
    }
}
module.exports = {createContact,getAllContact,deltecontact};