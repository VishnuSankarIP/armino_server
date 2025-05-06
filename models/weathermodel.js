const mongoose=require('mongoose');

const weatherSchema=new mongoose.Schema({
    city:{type:String,required:true,enum: ['Delhi', 'Moscow', 'Paris', 'New York', 'Sydney', 'Riyadh'],},
    temperature:{type:Number,required:true},
    description:{type:String,required:true},
    icon:{type:String,required:true},
    date:{type:Date,required:true}
})


const Weather = mongoose.model('Weather', weatherSchema);
module.exports = Weather;