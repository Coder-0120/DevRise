const express=require("express");
const router=express.Router();
const {getProject,postProject,updateProject,deleteProject}=require("../controllers/projectController");
const auth = require("../middleware/auth");


router.get("/",getProject);
router.get("/:id",getProject);
router.post("/",auth,postProject);
router.put("/:id",updateProject);
router.delete("/:id",deleteProject);

module.exports=router;