const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

main()
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async() => {
    await Listing.deleteMany({});
   initdata.data = initdata.data.map((obj)=> ({...obj, owner: "69a27efbaa423526471278b8"}));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized"); 
}

initDB();