const express = require("express");
const router = express.Router();
const adminmodel = require("../models/admin model");
const productModel = require("../models/product model");

if(process.env.NODE_ENV=="development"){
    router.post("/create", async  (req, res) => {
        let admin = await adminmodel.find();
        if(admin.length>0)return res.send(503).send("Yoou don't have permission to do this")

            let{fullName,email,password}= req.body;
         let createdAdmin=await adminmodel.create({
                fullName,
                email,
                password

            })
            res.status(201).send(createdAdmin);
});

}
 
router.get("/admin-login", (req, res) => {
    let success=req.flash("success")
    res.render("addproducts",{success} );
});







module.exports = router;
