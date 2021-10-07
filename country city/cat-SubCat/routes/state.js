var express = require('express');
var router = express.Router();

//Call User Database Model
var CategoryModel = require('../schema/state');
var countryModel = require('../schema/country');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/add', function(req, res, next) {
    countryModel.find(function(err,data){
        if (err) {
            console.log("Error in Insert Record");
         } else {
             res.render('state/add-state',{state_array:data});
             //res.send(JSON.stringify({ "flag": 1, "name": "success" })) ;
         }  
    })
});

//Add Form Processing using Post Method 
router.post('/add', function(req, res, next) {
    console.log(req.body);
    //Create an Array 
    const mybodydata = {
      state_name: req.body.state_name,
      _country: req.body._country
  }
  var data = CategoryModel(mybodydata);
  data.save(function(err) {
      if (err) {
         console.log("Error in Insert Record");
      } else {
          res.render('state/add-state');
          //res.send(JSON.stringify({ "flag": 1, "name": "success" })) ;
      }
  })
});
 
//display category
router.get('/display', function(req, res, next) {
    CategoryModel.find(function(err, db_users_array) {
    if (err) res.json({message: 'There are no posts here.'});
    CategoryModel.find({})
    .populate('_country')
  
      .exec(function(err, db_state_array) {

        console.log(db_state_array);
     
        res.render("state/display-state", { subcategory_array: db_state_array });
      })
        res.render('state/display-state',{ user_array : db_users_array });  
      
  });
 
});

//Delete User By ID
router.get('/delete/:id', function(req, res) {
    CategoryModel.findByIdAndDelete(req.params.id, function(err, project) {
      if (err) {
        console.log("Error in Record Delete " + err);
          res.redirect('/state/display');
      } else {
        console.log(" Record Deleted ");
          res.redirect('/state/display');
      }
  });
});

//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {
    console.log(req.params.id);
    CategoryModel.findById(req.params.id, function(err, db_category_array) {
        if (err) {
            console.log("Edit Fetch Error " + err);
        } else {
            console.log(db_category_array);
  
            res.render('state/edit-state', { category_array: db_category_array });
        }
    });
});

//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {
    console.log("Edit ID is"+ req.params.id);
    const mybodydata = {
      state_name: req.body.state_name 
    }
    CategoryModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
        if (err) {
            console.log("Error in Record Update");
            res.redirect('/state/display-state');
        } else {
          // res.send(JSON.stringify({ "flag": 1, "name": "success" })) ;
             res.redirect('/state/display');
        }
    });
  });
  


module.exports = router;
