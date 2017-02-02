"use strict";

// 'hello ${name}! will print out the variable name concatonated to the string
/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
 
 var http = require ('http'); // when require is seen, the type will be http.
 var fs = require ('fs');
 
 var port = 2998;
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
				html += '<head><title>Dynamic Page</title><link href="galler.css" rel = "stylesheet" type="text/css"></head>';
				html += '<h1>Hello.</h2> Time is ' + Date.now();
				html += '<body>';
				html += ' <h1>Gallery</h1>';
				html += imageNamesToTags(imageTags).join('');
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
 var server = http.createServer(function(req, res) {
	switch (req.url) {
		case "/gallery":
			serveGallery(req, res);
			break;
		case '/':
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