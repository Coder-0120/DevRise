const express=require("express");
const router=express.Router();
const {getEducations,getEducation,createEducation,updateEducation,deleteEducation}=require("../controllers/educationController");
const auth = require("../middleware/auth");


router.get("/",getEducations);
router.get("/:id",getEducation);
router.post("/",auth,createEducation);
router.put("/:id",auth,updateEducation);
router.delete("/:id",auth,deleteEducation);

module.exports=router;