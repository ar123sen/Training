var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    city_name: String,
    _country:
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'country'
        },
    _state:
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'state'
        },
      
});

module.exports = mongoose.model('city', myschema);