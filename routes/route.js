const express=require('express')
const router=new express.Router()
const weatherController=require('../controller/weathercontroller')

router.get('/weather/:city',weatherController.fetchAndSaveWeather);
router.get('/history', weatherController.getWeatherHistory);


module.exports=router