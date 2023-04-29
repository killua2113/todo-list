const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");

const date = require(__dirname + "/date.js");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));


//mongoose 

mongoose.connect("mongodb://127.0.0.1:27017/todolist",{ useNewUrlParser: true });
const itemschema=mongoose.Schema({
  name:String
});

const Item= new  mongoose.model("Item", itemschema);
//


//
app.get("/",(req,res)=>{
  const day = date.getDate();
  Item.find()
  .then(result =>{
    res.render("list",{data:result , today:day});
  })
 
})


//POST METHOD
app.post("/",(req, res) => {
  const todoTask = new Item({
  name:req.body.newItem
  });
   todoTask.save().then(result =>{res.redirect("/"); })
   });


//POST DELETE
app.post("/delete",(req,res)=>{
  
  Item.findByIdAndDelete(req.body.checkbox).then(()=>{res.redirect("/");})
  .catch((err)=>{res.redirect("/");});
})



app.listen(4000, function() {console.log("Server started on port 4000")});
