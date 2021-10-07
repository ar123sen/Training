var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('statecity/index');
});

router.get('/country', function(req, res, next) {
    res.render('country/coun', { title: 'Express' });
  });
  router.post('/coun-process', function(req, res, next) {
    const mybodydata = {
      country_name : req.body.counnm, 
    }
    var data = CountryModel(mybodydata);
  
    data.save(function(err){
      if(err){
        console.log("Error in Add Record" + err);
      }else{
        console.log("Record Added");
        res.send("Record Successfully Added")
      }
    })
    
  });
  router.get('/state', function(req, res, next) {
  
    CountryModel.find(function(err, db_category_array) {
        if (err) {
            console.log("Error in Fetch Data " + err);
          } else {
            //Print Data in Console
            console.log(db_category_array);
            //Render User Array in HTML Table
            res.render('state/ste', { mydata : db_category_array });
            
          }
      });
  //res.render('add-category');
  });
  router.post('/state-process', function(req, res, next) {
    console.log(req.body);
   
    //Create an Array 
    const mybodydata = {
      state_name: req.body.ste,
      _category: req.body._category
     
      }
   
      console.log("Name is "  + req.body.ste);
      console.log("ID is "  + req.body._category);
   
  var data = StateModel(mybodydata);
   
  data.save(function(err) {
      if (err) {
         console.log("Error in Insert Record");
      } else {
          res.send("Data Added")
      }
  })
  
  });
  router.get('/displaystate', function(req, res, next) {
  
    StateModel.find(function(err, db_subcategory_array){
        
        console.log(db_subcategory_array);
  
        if (err) res.json({message: 'There are no posts here.'});
  
        StateModel.find({})
        .populate('_category')
      
          .exec(function(err, db_subcategory_array) {
  
            console.log(db_subcategory_array);
         
            res.render("state/displaystate", { subcategory_array: db_subcategory_array });
          })
      });
   
  });
  router.get('/city', function(req, res, next) {
  
    
      StateModel.find(function(err, db_category_state) {
        if (err) {
            console.log("Error in Fetch Data " + err);
          } else {
                      console.log("aa",db_category_state);
                      
                       
                      CountryModel.find(function(err, db_category_array) {
                        if (err) {
                            console.log("Error in Fetch Data " + err);
                          } else {
                            //Print Data in Console
                            console.log("mm",db_category_array);
                            //Render User Array in HTML Table
                            res.render('city/city', { mydata:db_category_state,mycountry : db_category_array });
                            
                          }
                      });   
          }
      });
      
     
  //res.render('add-category');
  });
  router.post('/city-process', function(req, res, next) {
    console.log(req.body);
   
    //Create an Array 
    const mybodydata = {
      city_name: req.body.cty,
      _category: req.body._category,
      _states:req.body._states
     
      }
   
      console.log("Name is "  + req.body.cty);
      console.log("ID is "  + req.body._category);
      console.log("City Cat is "  + req.body._states);
  var data = CityModel(mybodydata);
   
  data.save(function(err) {
      if (err) {
         console.log("Error in Insert Record");
      } else {
          res.send("Data Added")
      }
  })
  
  });
  router.get('/displaycity', function(req, res, next) {
  
    CityModel.find(function(err, db_subcategory_array){
        
  //      console.log("aman",db_subcategory_array);
  
        if (err) res.json({message: 'There are no posts here.'});
  
         CityModel.find({})
         .populate('_category _states')
      
          .exec(function(err, db_subcategory_array) {
  
             console.log("neema",db_subcategory_array);
         
            res.render("city/displaycity", { subcategory_array: db_subcategory_array });
         })
      });
  });

  module.exports = router;