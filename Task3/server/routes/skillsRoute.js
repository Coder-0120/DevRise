const express=require("express");
const router=express.Router();
const {getSkills,postSkills,updateSkills,deleteSkills}=require("../controllers/skillsController");
const auth = require("../middleware/auth");


router.get("/",getSkills);
router.get("/:id",getSkills);
router.post("/",auth,postSkills);
router.put("/:id",auth,updateSkills);
router.delete("/:id",auth,deleteSkills);

module.exports=router;