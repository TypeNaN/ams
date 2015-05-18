var express			= require('express')
	, app			= express()
	, server		= require('http').createServer(app)
	, path			= require('path')
	, multer		= require('multer')
	, fs			= require('fs');

app.set('port', 8000);
app.use('/',express.static(path.join(__dirname, '/public')));
app.use(multer({
	dest: __dirname + '/public/uploads',
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
app.post('/uploads',function(req, res){
	if(done){
		res.status(200).send('OK');
		res.end();
	}
});
server.listen(app.get('port'), function(){
	console.log('✔ Server running on port %d in %s mode', app.get('port'), app.get('env'));
});
