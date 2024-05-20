var express=require('express')
var app=express()
app.use(express.json())
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://deepthi:XzECB1Mdq7c3H6Up@cluster0.gywnnad.mongodb.net/product-review').then(console.log("Connected to Mongo"))
var cors=require("cors")
app.use(cors())


//UserSchema
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    mobileno:{type:Number,required:true},
    password:{type:String,required:true}
});
const User=mongoose.model("user",userSchema);


//ProductSchema
const productSchema=new mongoose.Schema({
    // pimg:{type:String,required:true},
    pname:{type:String,required:true},
    pdesc:{type:String,required:true},
    pspec:{type:String,required:true}
});
const Product=mongoose.model("product",productSchema);


//ReviewSchema
const reviewSchema = new mongoose.Schema({
    rat: { type: Number, required: true }, 
    rew: { type: String, required: true },
  });
const Review=mongoose.model("review",reviewSchema);


//User
app.get("/user",async(req,res)=>{
    const user=await User.find();
    res.json(user);
})

app.post("/user",async(req,res)=>{
    const {name,mobileno,password}=req.body;
    const newUser= new User({name,mobileno,password}); 
    newUser.save();
    res.status(200).json(newUser);
})

app.put("/user/:id",async(req,res)=>{
    let id=req.params.id;
    const  itemtoupdate =await User.findByIdAndUpdate(id,req.body);
    if(!itemtoupdate) return res.status(404).send("No item found");
    res.status(200).json(itemtoupdate)
})

app.delete("/user/:id",async(req,res)=>{
    let id=req.params.id;
    const  itemtodelete =await User.findByIdAndDelete(id,req.body);
    if(!itemtodelete) return res.status(404).send("No item found");
    res.status(200).json(itemtodelete)
})

//Product
app.get("/product",async(req,res)=>{
    const product=await Product.find();
    res.json(product);
})

app.post("/product",async(req,res)=>{
    const {pname,pdesc,pspec}=req.body;
    const newProduct= new Product({pname,pdesc,pspec});
    newProduct.save();
    res.status(200).json(newProduct);
})
app.put("/product/:id",async(req,res)=>{
    let id=req.params.id;
    const  itemtoupdate =await Product.findByIdAndUpdate(id,req.body);
    if(!itemtoupdate) return res.status(404).send("No item found");
    res.status(200).json(itemtoupdate)
})
app.delete("/product/:id",async(req,res)=>{
    let id=req.params.id;
    const  itemtodelete =await Product.findByIdAndDelete(id,req.body);
    if(!itemtodelete) return res.status(404).send("No item found");
    res.status(200).json(itemtodelete)
})

//review
app.get("/review",async(req,res)=>{
    const review=await Review.find();
    res.json(review);
})

app.post("/review",async(req,res)=>{
    const {rat,rew}=req.body;
    const newUser= new Review({rat,rew});
    newUser.save();
    res.status(200).json(newUser);
})

app.put("/review/:id",async(req,res)=>{
    let id=req.params.id;
    const  itemtoupdate =await Review.findByIdAndUpdate(id,req.body);
    if(!itemtoupdate) return res.status(404).send("No item found");
    res.status(200).json(itemtoupdate)
})

app.delete("/review/:id",async(req,res)=>{
    let id=req.params.id;
    const  itemtodelete =await Review.findByIdAndDelete(id,req.body);
    if(!itemtodelete) return res.status(404).send("No item found");
    res.status(200).json(itemtodelete)
})


//Port
app.listen(3000,()=>{
    console.log("Server Started ...")
})