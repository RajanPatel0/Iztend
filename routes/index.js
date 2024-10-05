const express= require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModel= require("../models/productmodel");
const userModel = require("../models/usermodel");

router.get("/", function(req,res){
   let error = req.flash("error");
   res.render("index",{error, loggedin: false});
});

router.get("/shop", isLoggedin,async function(req,res){
   let products =await productModel.find();
   // let products = req.flash("products");
   let success=req.flash("success");
   res.render("shop",{products , success});
});

router.get("/cart", isLoggedin,async function(req,res){
   let user = await userModel.findOne({email:req.user.email}).populate("cart");

   // const bill = Number(user.cart.price)+20 -Number(user.cart.discount);
   // Calculate the total bill
   let bill = 0;

   if (user.cart.length > 0) {
       user.cart.forEach(item => {
           const itemPrice = Number(item.price) || 0;
           const itemDiscount = Number(item.discount) || 0;
           const platformFee = 20;

           // Calculate item total (price - discount + platform fee)
           bill += (itemPrice - itemDiscount + platformFee);
       });
   }

   res.render("cart", {user, bill});
});


// router.get("/addtocart/:id", isLoggedin, async function(req,res){
//    let user = await userModel.findOne({email: req.user.email});
//    user.cart.push(req.params.id);
//    await user.save();
//    req.flash("success", "Added To Cart");
//    res.redirect("/shop");
// });

router.get("/addtocart/:id", isLoggedin, async function(req, res) {
   let user = await userModel.findOne({ email: req.user.email });
   let product = await productModel.findById(req.params.id); // Fetch the product by its ID

   if (product) {
       user.cart.push(product._id); // Push product ID to the user's cart array
       await user.save(); // Save the updated user
       req.flash("success", "Added To Cart");
   } else {
       req.flash("error", "Product not found");
   }

   res.redirect("/shop");
});

// router.get("/owner", function(req,res){
//     let error = req.flash("error");
//     req.flash("Log In First As Owner");
//     res.render("admin",{error});
//  });

router.get("/admin", function(req, res) {
    let success = req.flash("success");
    res.render("createproducts",{success});
 });

module.exports = router;