const express=require("express");
const router=express.Router();
const {createSkill,getSkills,getSkill,updateSkill,deleteSkill}=require("../controllers/skillsController");
const auth = require("../middleware/auth");


router.get("/",getSkills);
router.get("/:id",getSkill);
router.post("/",auth,createSkill);
router.put("/:id",auth,updateSkill);
router.delete("/:id",auth,deleteSkill);

module.exports=router;