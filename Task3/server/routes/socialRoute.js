const express=require("express");
const router=express.Router();
const {createSocial,getSocial,updateSocial,deleteSocial}=require("../controllers/socialController");
const auth = require("../middleware/auth");


router.get("/",getSocial);
router.post("/",auth,createSocial);
router.put("/:id",auth,updateSocial);
router.delete("/:id",auth,deleteSocial);

module.exports=router;