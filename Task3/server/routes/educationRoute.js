const express=require("express");
const router=express.Router();
const {geteducation,posteducation,updateEducation,deleteEducation}=require("../controllers/educationController");
const auth = require("../middleware/auth");


router.get("/",geteducation);
router.get("/:id",geteducation);
router.post("/",auth,posteducation);
router.put("/:id",auth,updateEducation);
router.delete("/:id",auth,deleteEducation);

module.exports=router;