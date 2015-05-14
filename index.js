var config			= require('./config')
	, express		= require('express')
	, app			= express()
	, server		= require('http').createServer(app)
	, path			= require('path')
	, multer		= require('multer')
	, mongojs		= require('mongojs');

var db = mongojs(config.db.db);
var db_print = db.collection(config.db.collection);

app.set('port', config.site.port);
app.use('/',express.static(path.join(__dirname, config.site.root)));
app.use(multer({
	dest: config.site.uploads,
	rename: function (fieldname, filename, req, res) {
		return Date.now() + '_' + filename.replace(/\W+/g, '_').toLowerCase();
	},
	onParseEnd: function (req, next) {
		done = true;
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
app.route('/uploads')
	.get(function(req, res) {res.send('Get /uploads');})
	.post(function(req, res) {upload_post(req,res);})

var upload_post = function(req, res){
	if(upload_done){
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
		res.status(200).send('OK');
		res.end();
		console.log("####################################################################################");
	}
};

server.listen(app.get('port'), function(){
	console.log('✔ Server running on port %d in %s mode', app.get('port'), app.get('env'));
});
