var express = require('express');
var router = express.Router();
var Usersmodel=require('../schema/country')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add-country', function(req, res, next) {
  Usersmodel.find(function(err, db_users_array) {
      if (err) {
          console.log("Error in Add Country " + err);
        } 
        else 
        {
          //Print Data in Console
          console.log(db_users_array);    
          res.render('add-country',{ user_array : db_users_array });
        }
    });
});

//Add Form Processing using Post Method 
router.post('/add-country', function(req, res, next) {
  console.log(req.body);
  //Create an Array 
  const mybodydata = {
    country_name:req.body.country_name,
    countries:req.body.countries,
}
var data = Usersmodel(mybodydata);
data.save(function(err) {
    if (err) {
       console.log("Error in Insert country");
    } else {
        res.redirect('/add-country');
    }
  });
});

//display user data 
router.get('/display-country', function(req, res, next) {
  Usersmodel.find(function(err, db_users_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_users_array);
        //Render User Array in HTML Table
        res.render('display-country', { user_array : db_users_array });
      }
  });
});


//Delete User By ID
router.get('/delete/:id', function(req, res) {
  Usersmodel.findByIdAndDelete(req.params.id, function(err, project) {
      if (err) {
        console.log("Error in Record Delete " + err);
          res.redirect('/display-country');
      } else {
        console.log(" country Deleted ");
          res.redirect('/display-country');
      }
  });
});

//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {
  console.log(req.params.id);
  Usersmodel.findById(req.params.id, function(err, db_users_array) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
          console.log(db_users_array);
          res.render('edit-country', { user_array: db_users_array });
      }
  });
});

//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {
  console.log("Edit ID is"+ req.params.id);
  const mybodydata = {
    country_name:req.body.country_name,
    countries:req.body.countries,
  }
 Usersmodel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
      if (err) {
          console.log("Error in Record Update");
          res.redirect('/display-country');
      } else {
        
          res.redirect('/display-country');
      }
  });
});


module.exports = router;
