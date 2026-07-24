const express=require("express");
const router=express.Router();
const {getExperiences,getExperience,createExperience,updateExperience,deleteExperience}=require("../controllers/experienceController");
const auth = require("../middleware/auth");


router.get("/",getExperiences);
router.get("/:id",getExperience);
router.post("/",auth,createExperience);
router.put("/:id",auth,updateExperience);
router.delete("/:id",auth,deleteExperience);

module.exports=router;