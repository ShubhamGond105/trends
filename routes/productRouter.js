const express = require("express");
const router = express.Router();
const productmodel=require("../models/product model")

const upload = require("../config/multer-config")

router.post("/create",upload.single("image"), async (req, res) => {
try{let{name,price,description,discount,bgColor,panelColor,textColor}=req.body

    let product = await productmodel.create({
        image:req.file.buffer,
        name,   
        price,
        description,
        discount,
        bgColor,
        panelColor,
        textColor
    })
req.flash("success","Product created successfully")
    res.redirect("/admin/admin-login")


    
}catch(error){
    res.status(500).send(error)
}
});
module.exports = router;