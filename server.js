"use strict";

// 'hello ${name}! will print out the variable name concatonated to the string
/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
 
 var http = require ('http'); // when require is seen, the type will be http.
 var fs = require ('fs');
 var url = require('url');
 var port = 2998;
 var config = JSON.parse(fs.readFileSync('config.json')); // looks in config.json for file

 var stylesheet = fs.readFileSync('galler.css');
 var imageNames = ['ace.jpg', 'bubble.jpg', 'chess.jpg', 'fern.jpg', 'mobile.jpg'];
 function getImageNames(callback) {
	 
	 fs.readdir('images/', function(err, fileNames){
		 if (err) {
			 callback(err, undefined);
		 } else {
			 
			 callback(undefined, fileNames);
		 }
	 });
 }
 function buildGallery(imageTags) {
			
			var html = '<!doctype html>';
				html += '<head><title>'+ config.title +'</title><link href="galler.css" rel = "stylesheet" type="text/css"></head>';
				html += '<body>';
				html += ' <h1>' + config.title +'</h1>';
				html += ' <form>';
				html += ' <input type="text" name="title">';
				html += ' <input type="submit" value="Change Gallery Title">';
				html += imageNamesToTags(imageTags).join('');
				html += ' <form action="" method="POST" enctype="multipart/form-data">';
				html += ' <input type="file" name"image">';
				html += ' <input type="submit" value="Upload Image">';
				html += '</form>';
				html += '<h1>Hello.</h1> Time is ' + Date.now();
				html += '</body>';
			return html;
			
 }
 
 function serveGallery(req, res) {
	 getImageNames(function(err, imageNames) {
		 if (err) {
			 console.err(err);
			 res.statusCode = 500;
			 res.statusMessage = 'Server error';
			 res.end();
			 return;
		 }
		 res.setHeader('Content-Type', 'text/html');
		 res.end(buildGallery(imageNames));
	 });
	 
 }
 function imageNamesToTags(fileNames) {
	 
	 return fileNames.map(function(fileName) {
		 
		 return '<img src="' + fileName + '"" alt="' + fileName + '">';
	 });
	 
 }
 function serveImage(filename, req, res) {
	 fs.readFile('images/' + filename, function(err, body){
		 
		 if (err){
			 console.error(err);
			 res.statusCode = 404;
			 res.statusMessage = "whoops";
			 res.end("Silly me");
			 return;
		 }
		 
	 // stores binary date of image data
			res.setHeader("Contet-Type", "image/jpeg"); // tells browser what the data is
			res.end(body); // browser will now display data
	 }); 
	 
 }
 
 function uploadImage(req, res){
	 var body='';;
	 req.on('error', function(){
		res.statusCode = 500;
		res.end();		
	 });
	 req.on('data',  function(){
		 body += data;
	 });
	 req.on('end', function() {
		 fs.writeFile('filename', data, function(){
			 if (err) {
				 
				 console.error(err);
				 res.statusCode = 500;
				 res.end();
				 return;
			 }
			 serveGallery(req, res);
		 });
		 
	 });
 }
 var server = http.createServer(function(req, res) {
	 
	 var urlParts = url.parse(req.url);
	 if (urlParts.query) {
		 
		 var matches = /title=(.+)($|&)/.exec(urlParts.query);
		 if(matches && matches[1]){
			 config.title = decodeURIComponent(matches[1]);
			 fs.writeFile('config.json', JSON.stringify(config));
			 //title = matches[1];
		 }
	 }
	switch (urlParts.pathname) {
		case '/':
		case "/gallery":
		if (req.method == 'GET') {
			serveGallery(req, res);
		}else if (req.method == 'POST') {
			uploadPicture(req, res);
		}
			break;
		case '/galler.css':
			res.setHeader('Content-Type', 'text/css');
			res.end(stylesheet);
			break;
		default:
			serveImage(req.url, req, res);
	}
	
 });

 server.listen(port, function() {
	 
	 console.log("listening on Port " + port);
 });