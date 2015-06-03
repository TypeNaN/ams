var config			= require('./config')
	, express		= require('express')
	, app			= express()
	, server		= require('http').createServer(app)
	, path			= require('path')
	, multer		= require('multer')
	, mongojs		= require('mongojs')
	, imagemagick	= require('imagemagick-native')
	, fs			= require('fs');

var upload_done = false;
var db = mongojs(config.db.db);
var db_print = db.collection(config.db.collection);

app.set('port', config.port);
app.use('/', express.static(path.join(__dirname, config.path.root)));
app.use(multer({
	dest: config.path.uploads,
	rename: function (fieldname, filename, req, res) {
		return Date.now() + '_' + filename.replace(/\W+/g, '_').toLowerCase();
	},
	onParseEnd: function (req, next) {
		upload_done = true;
		next();
	},
	onError: function (error, next) {
		console.log(error);
		next(error);
	}
}));
app.get('/', function(req, res){
	res.sendFile('index.html');
});
app.route('/uploads').get(function(req, res) {
	res.send('Get /uploads');
});
app.route('/uploads').post(function(req, res) {
	var data = JSON.parse(req.body.data);
	db_print.insert({
		file: req.files.file.name,
		customer: data.customer.name,
		contact: data.customer.contact,
		type: data.customer.type,
		mat: data.customer.mat,
		option: data.customer.option,
		width: data.customer.width,
		height: data.customer.height,
		amount: data.customer.amount,
		comment: data.customer.comment,
		urgently: data.customer.urgently,
		date: data.customer.date,
		status: data.customer.status
	});
	function isEXT(check){
		for(i = 0; i < config.check.extension.length; i++){
			if(check.match(config.check.extension[i])){
				return config.check.extension[i];
			}
		}
		return false;
	}
	if(upload_done){
		var ext = isEXT(req.files.file.extension);
		if(ext){
			imagemagick.convert({
				srcData: fs.readFileSync(req.files.file.path),
				width: 916,
				height: 576,
				resizeStyle: 'aspectfit', // is the default, aspectfill, or 'aspectfit' or 'fill'
			}, function (err, result) {
				if (err) throw err;
				fs.writeFile(__dirname + '/public/views/' + req.files.file.name, result, function (err) {
					if (err) throw err;
					console.log('view image \'s saved!');
				});
				imagemagick.convert({
					srcData: result,
					width: 80,
					height: 80,
					resizeStyle: 'aspectfill', // is the default, aspectfill, or 'aspectfit' or 'fill'
					gravity: 'Center' // optional: position crop area when using 'aspectfill'
				}, function (err, result) {
					if (err) throw err;
					fs.writeFile(__dirname + '/public/thumbnails/' + req.files.file.name, result, function (err) {
						if (err) throw err;
						console.log('thumb image \'s saved!');
					});
				});
			});
		}
		res.status(200).send('OK');
		res.end();
	}
});
server.listen(app.get('port'), function(){
	console.log('✔ Server running on port %d in %s mode', app.get('port'), app.get('env'));
});
