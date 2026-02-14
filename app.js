 const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override"); 
const ejsMate = require("ejs-mate");
const { log } = require("console");
const port = 3000;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


main()
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
//   console.log("Mongo host:", mongoose.connection.host);
// console.log("Mongo port:", mongoose.connection.port);
// console.log("Mongo DB:", mongoose.connection.name);
}

app.get("/", (req, res) => {
  res.send("hii i am root");
});

//index route
app.get("/listings",async(req,res)=>{
 const allListings = await Listing.find({});
//  console.log(allListings);
 res.render("./listings/index.ejs",{allListings});
  });

  
   //new listing
 app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs");
 });


 //show route
 app.get("/listings/:id",async(req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs",{listing});
 });

 //edit   route
 app.get("/listings/:id/edit",async(req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
 });
//update route 
 app.put("/listings/:id", async(req,res)=>{
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);
  
 });

 app.post("/listings",async (req,res)=>{
 const newListing = new Listing(req.body.listing);
 await newListing.save();
 res.redirect("/listings");
 });

 //deleteroute

 app.delete("/listings/:id",async(req,res)=>{
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
 });



// app.get("/testListing", async(req,res)=>{
// let sampleListing = new Listing({
//   title: "My New Villa",
//   description: "By the beach",
//   price: 1200,
//   location: "jaipur, Rajasthan",
//   country: "India",
// });
// await sampleListing.save();
// console.log("sample was saved");
// res.send("Success");
// });

app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});