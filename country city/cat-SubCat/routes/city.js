var express = require('express');
var router = express.Router();
//var CityModel = require('../models/city-model');
var StateModel = require('../schema/state');
var CityModel = require('../schema/city');
var CountryModel = require('../schema/country');

router.get('/',function(req, res, next){
    res.end("respond with resource");
})

router.get('/add',function(req, res, next){
    StateModel.find(function(err, data_state){
        if(err){
            console.log("Error in showing data"+err);
        }else{
            console.log("Successflly show form"+data_state);
            CountryModel.find(function(err, data_country){
                if(err){
                    console.log("Error in country part"+err);
                }else{
                    console.log("city Successfully show"+data_country)
                    res.render('city/add-city',{mydata : data_state,mycountry : data_country});
                }
            })

        }
    })
})

router.post('/add',function(req, res, next){
    console.log(req.body);
    const mybodydata = {
        city_name : req.body.city_name,
        _country : req.body._country,
        _state : req.body._state
    }
    console.log("Name is "  + req.body.cty);
    console.log("ID is "  + req.body._category);
    console.log("City Cat is "  + req.body._states);

    var data = CityModel(mybodydata);
    data.save(function(err, data){
        if(err){
            console.log('Error in adding data'+err);
        }else{
            console.log("Successfully save"+data);
            res.redirect('/city/add');
        }
    })
})

router.get('/display',function(req, res, next){
    CityModel.find(function(err, data){
        console.log("diplay1"+data);
        if(err) res.json({message: 'There are no posts here.'});

    CityModel.find({
        mobile : "Samsung"
    }).populate('_country _state').exec(function(err,data){
        if(err){
            console.log("Error in display");
        }else{
            console.log("Successfully display"+data);
            res.render('city/display-city',{mydata : data});
        }
    })
})
});

// router.get('/display', function(req, res, next) {
//     CityModel.find(function(err, db_subcategory_array){
//       console.log("aman",db_subcategory_array);
//         if(err) res.json({message: 'There are no posts here.'});
//          CityModel.find({})
//          .populate('_country _state').exec(function(err, db_subcategory_array) {
//              console.log("rathod",db_subcategory_array);
//             res.render("city/display-city", { mydata: db_subcategory_array });
//          })
//       });
//   });
module.exports = router;

