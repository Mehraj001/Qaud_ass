const mongoose=require("mongoose");

const Schema=new mongoose.Schema({
    name:String,
    last:String,
    buy:String,
    sell:String,
    volume:String,
    base_unit:String
})

const Model=mongoose.model('API-data',Schema);
module.exports=Model;