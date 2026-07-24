const express=require("express");
const router=express.Router();
const {getCertificates,getCertificate,createCertificate,updateCertificate,deleteCertificate}=require("../controllers/certificateController");
const auth = require("../middleware/auth");


router.get("/",getCertificates);
router.get("/:id",getCertificate);
router.post("/",auth,createCertificate);
router.put("/:id",auth,updateCertificate);
router.delete("/:id",auth,deleteCertificate);

module.exports=router;