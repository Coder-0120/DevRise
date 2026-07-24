const express=require("express");
const router=express.Router();
const {createContact,getAllContact,deltecontact}=require("../controllers/contactController");
const auth = require("../middleware/auth");


router.post("/",createContact);
router.get("/getAll",auth,getAllContact);
router.delete("/delete/:id",auth,deltecontact);

module.exports=router;