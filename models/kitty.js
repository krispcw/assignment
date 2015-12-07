var mongoose = require('mongoose');

var kittySchema = mongoose.Schema({ 
	name: String, 
	birthday: {
		date: {type: Number, require: true, min: 1, max: 31}, 
		month: {type: String,
                	enum: ['Jan','Feb','Mar','Apr','May','Jun',
                       	'Jul','Aug','Sep','Oct','Nov','Dec']},
		year: Number
	},
	age:Number
}); 

module.exports = kittySchema;
