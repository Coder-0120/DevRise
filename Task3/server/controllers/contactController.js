const contact=require("../models/contact");
const createContact=async(req,res)=>{
    try{
        const {name,email,subject,message}=req.body;
        await contact.create({
            name,
            email,
            subject,
            message
        });
        res.status(201).json({ message: "Contact created successfully" });
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports=createContact;