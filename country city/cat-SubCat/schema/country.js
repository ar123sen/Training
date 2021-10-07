var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var myschema=new Schema({
    country_name : String,
    countries : String
});

module.exports=mongoose.model('Country',myschema);