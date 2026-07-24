const express=require("express");
const router=express.Router();
const {getAbout,updateAbout,postAbout,deleteAbout}=require("../controllers/aboutController");
const auth = require("../middleware/auth");


router.get("/",getAbout);
router.put("/",auth,updateAbout);
router.post("/",auth,postAbout);
router.delete("/",auth,deleteAbout);

module.exports=router;