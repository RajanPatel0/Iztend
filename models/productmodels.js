const mongoose=require ('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/iztend");

const productSchema=mongoose.Schema({
   fullname: String,
   email: String,
   password: String,
   cart: {
      type: Array,
      default:[]
   },
   orders:{
      type: Array,
      default:[]
   },
   isadmin: Boolean,
   contact: Number,
   image: String,
   name: String,
   discount: {
      type: String,
      default: 0
   },
   bgcolor: String,
   panelcolor: String,
   textcolor:String,

})

module.exports= mongoose.model("product", productSchema);