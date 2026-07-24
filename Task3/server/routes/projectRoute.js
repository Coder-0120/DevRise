const express=require("express");
const router=express.Router();
const {getProjects,getProject,createProject,updateProject,deleteProject}=require("../controllers/projectController");
const auth = require("../middleware/auth");


router.get("/",getProjects);
router.get("/:id",getProject);
router.post("/",auth,createProject);
router.put("/:id",updateProject);
router.delete("/:id",deleteProject);

module.exports=router;