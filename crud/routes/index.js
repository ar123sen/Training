var express = require('express');
var router = express.Router();
var usermodel=require('../model/users_model');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { abc1: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', {abc :'akash'});
});
router.get('/form', function(req, res, next) {
  res.render('form');
});
router.get('/add', function(req, res, next) {
  res.render('add');
});
router.post('/add-process', function(req, res, next) {
  console.log(req.body);
  const mybodydata ={
    user_name:req.body.txt1,
    user_mobile:req.body.txt2
  }
  var data =usermodel(mybodydata);
  data.save(function(err)
  {
    if(err)
    {
      console.log("error in insert");
    }else{
      console.log("record added");
      res.render('add');
    }
  })
});

router.post('/form-process', function(req, res, next) {
  var fileobject = req.files.file123;
  var filename = req.files.file123.name;
  fileobject.mv("public/upload/"+filename,function(err){
    if(err) throw err;
    res.send("File Uploaded");
  });
});


router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login-process', function(req, res, next) {
  //Get Value From Textbox
  var a = req.body.txt1;
  //Session Variable Create
  req.session.username = a;
  //Cookie Create
  res.cookie('username',a,{expire : new Date() + 100,httpOnly:true});
  //Check
  console.log( "Sesion Value in Login Process " +  req.session.username);
  //Redirect
  res.redirect('/home');
  
});

router.get('/home', function(req, res, next) {
  //Check Session Variable 
  console.log( "Sesion Value in Home" +  req.session.username);
  if(req.session.username){
    //Get Value from Session
    var user = req.session.username;
    //Render Page with Username
    res.render('home',{myuser:user});
    console.log(req.cookies);
  }else{
    //res.send("<h1>Login Required</h1>");
    res.redirect('/login');
  }
});

router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err){
    res.clearCookie('username');
    res.redirect('/login');
  });
});

  router.get('/display', function(req, res, next) {
    
    usermodel.find(function(err,db_user_data)
    {
      if(err)
      {
        console.log("error in fetch data"+err);
      }else{
        console.log("fetch data" +db_user_data);
        res.render('display',{user_array:db_user_data});
      }
    }).lean();

  });

  


  


router.get('/delete/:id', function(req,res,next)
    {
      var deleteid = req.params.id;
      usermodel.findOneAndDelete(deleteid,function(err,data){
       if(err)
       {
         console.log("error in delete"+err);
       }else{
         console.log("record deleted");
         res.redirect('/display');
       }
     });
  });
  router.get('/edit/:id', function(req,res,next)
    {
      var editid = req.params.id;
      usermodel.findbyid(editid,function(err,data){
       if(err)
       {
         console.log("error in edit"+err);
       }else{
         console.log("record edit"+data);
         res.render('edit',{editdata:data});
       }
     }).lean();
  });

  router.post('/edit/:id', function(req,res,next)
  {
    var editid = req.params.id;
    const mybodydata ={
      user_name:req.body.txt1,
      user_mobile:req.body.txt2
    }
    usermodel.findbyIdAndupdate(editid, mybodydata,function(err,data){
     if(err)
     {
       console.log("error in update"+err);
     }else{
       console.log("record update"+data);
       res.redirect('/display');
     }
   });
});

module.exports = router;
