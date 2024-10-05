const mongoose=require ('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/iztend");

const productSchema=mongoose.Schema({
   image: Buffer,
   name: String,
   price: Number,
   discount: {
      type: String,
      default: 0
   },
   bgcolor: String,
   panelcolor: String,
   textcolor:String,

})

module.exports= mongoose.model("product", productSchema);