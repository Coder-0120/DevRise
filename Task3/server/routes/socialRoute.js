const express=require("express");
const router=express.Router();
const {getsocial,postsocial,updatesocial,deletesocial}=require("../controllers/socialController");
const auth = require("../middleware/auth");


router.get("/",getsocial);
router.post("/",auth,postsocial);
router.put("/:id",auth,updatesocial);
router.delete("/:id",auth,deletesocial);

module.exports=router;