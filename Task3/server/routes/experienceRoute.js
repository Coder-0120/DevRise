const express=require("express");
const router=express.Router();
const {getexperience,postexperience,updateExperience,delteExperience}=require("../controllers/experienceController");
const auth = require("../middleware/auth");


router.get("/",getexperience);
router.get("/:id",getexperience);
router.post("/",auth,postexperience);
router.put("/:id",auth,updateExperience);
router.delete("/:id",auth,delteExperience);

module.exports=router;