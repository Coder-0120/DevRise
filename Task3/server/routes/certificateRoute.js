const express=require("express");
const router=express.Router();
const {getcertificates,postcertificates,updatecertificates,deletecertificates}=require("../controllers/certificateController");
const auth = require("../middleware/auth");


router.get("/",getcertificates);
router.get("/:id",getcertificates);
router.post("/",auth,postcertificates);
router.put("/:id",auth,updatecertificates);
router.delete("/:id",auth,deletecertificates);

module.exports=router;