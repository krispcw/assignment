var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var MONGODBURL = 'mongodb://krispcw.cloudapp.net:27017/test';

var restaurantSchema = require('./models/restaurant');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/:att/:att_value', function(req,res) {


	var criteria = {};
	criteria[req.params.att] = req.params.att_value;
	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		
		Restaurant.find(criteria,function(err,results){
			
			if (err) {
				res.status(500).json(err);
				throw err
			}
			if (results.length > 0) {
				res.status(200).json(results);
			}
			else {
				res.status(200).json({message: 'No matching document'});
			}
			db.close();
			
		});
	});
});


/*app.get('/restaurant/name/:x', function(req,res) {
	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		//Kitten.find({name: new RegExp(req.params.x)},function(err,results){
		Restaurant.find({name: req.params.x},function(err,results){
			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				db.close();
				console.log('Found: ',results.length);
				res.json(results);
			}
		});
	});
});

app.get('/restaurant/cuisine/:x', function(req,res) {
	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		//Kitten.find({name: new RegExp(req.params.x)},function(err,results){
		Restaurant.find({cuisine: req.params.x},function(err,results){
			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				db.close();
				console.log('Found: ',results.length);
				res.json(results);
			}
		});
	});
});

app.get('/restaurant_id/:id', function(req,res) {
	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		//Kitten.find({name: new RegExp(req.params.x)},function(err,results){
		Restaurant.find({restaurant_id: req.params.id},function(err,results){
			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				db.close();
				console.log('Found: ',results.length);
				res.json(results);
			}
		});
	});
});*/

app.delete('/:att/:att_value',function(req,res) {

	var criteria = {};
	criteria[req.params.att] = req.params.att_value;

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		 Restaurant.remove(criteria,function(err,results){
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		
       		db.close();
			res.status(200).json({message: 'delete done', id: req.params.id});
    	});
    });
});


app.post('/',function(req,res) {
	//console.log(req.body);
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://krispcw.cloudapp.net:27017/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var rObj = {};
		rObj.address = {};
		rObj.address.building = req.body.building;
		rObj.address.street = req.body.street;
		rObj.address.zipcode = req.body.zipcode;
		rObj.address.coord = [];
		rObj.address.coord.push(req.body.lon);
		rObj.address.coord.push(req.body.lat);
		rObj.borough = req.body.borough;
		rObj.cuisine = req.body.cuisine;
		
		rObj.grades=[];
		var grade0={};
		if(req.body.date!=null){
		grade0.date = req.body.date;
		}

		if(req.body.grade!=null){
		grade0.grade = req.body.grade;
		}

		if(req.body.score!=null){
		grade0.score = parseInt(req.body.score);
		}

		if(req.body.date!=null||req.body.grade!=null||req.body.score!=null){
		rObj.grades.push(grade0);
		}

		if(req.body.name!=null){
		rObj.name = req.body.name;
		}
		
		if(req.body.restaurant_id!=null){
		rObj.restaurant_id = req.body.restaurant_id;
		}
		


		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		var r = new Restaurant(rObj);
		//console.log(r);
		r.save(function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant created!')
       		db.close();
			res.status(200).json({message: 'insert done', id: r._id});
    	});
    });
});

/*app.get('/kitty/age/:x', function(req,res) {
	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Kitten = mongoose.model('Kitten', kittySchema);
		//Kitten.find({name: new RegExp(req.params.x)},function(err,results){
		Kitten.find({age: req.params.x},function(err,results){
			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				db.close();
				console.log('Found: ',results.length);
				res.json(results);
			}
		});
	});
});

app.get('/kitty/month/:x', function(req,res) {
	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Kitten = mongoose.model('Kitten', kittySchema);
		//Kitten.find({name: new RegExp(req.params.x)},function(err,results){
		Kitten.find({'birthday.month': req.params.x},function(err,results){
			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				db.close();
				console.log('Found: ',results.length);
				res.json(results);
			}
		});
	});
});

app.get('/kitty/birthday/:attrib/:attrib/:attrib_value', function(req,res) {
	var criteria = {};
	criteria["birthday."+req.params.attrib] = req.params.attrib_value;

	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Kitten = mongoose.model('Kitten', kittySchema);
		Kitten.find(criteria,function(err,results){
			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				db.close();
				console.log('Found: ',results.length);
				res.json(results);
			}
		});
	});
});
*/
app.put('/:att/:att_value/grade', function(req,res) {

	var criteria = {};
	criteria[req.params.att]=req.params.att_value;
	var updated = {};
	var gradea = {};
	gradea.grade = req.body.grade;
		gradea.date = req.body.date;
		gradea.score= parseInt(req.body.score);

	updated["grades"]=gradea;
	
	console.log(updated);
	
	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		
		Restaurant.update(criteria,{$push:updated},function(err){

			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				
				console.log("update successful");
				res.status(200).json({message: 'updated'})
				db.close();
				res.end('Done',200);
			}
		});
	});
});



app.post('/restaurant/name', function(req,res) {
	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		var k = new Restaurant(req.body);
		k.save(function(err,results){
			if (err) {
				res.end(err.message,500);
			}
			else {
				db.close();
				res.end('Done',200);
			}
		});
	});
});

/*app.put('/kitty/:name/:attrib/:attrib_value', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib] = req.params.attrib_value;

	console.log(criteria);
	
	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Kitten = mongoose.model('Kitten', kittySchema);
		Kitten.update({name:req.params.name},{$set:criteria},function(err){
			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				db.close();
				res.end('Done',200);
			}
		});
	});
});
*/
app.listen(process.env.PORT || 8099);
