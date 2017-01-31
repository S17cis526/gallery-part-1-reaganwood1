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
 function serveImage(filename, req, res) {
	 fs.readFile('images/' + filename, function(err, body){
		 
		 if (err){
			 console.error(err);
			 res.statusCode = 500;
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
	var gHtml = imageNames.map(function(fileName){
		return ' <img src="' + fileName + '" alt="a fishing ace at work">'
		}).join('');// takes a function thats going to be called, and populates a new array
			var html = '<!doctype html>'
				html += '<head><title>Dynamic Page</title><link href="galler.css" rel = "stylesheet" type="text/css"></head>';
				html += '<h1>Hello.</h2> Time is ' + Date.now();
				html += '<body>';
				html += ' <h1>Gallery</h1>';
				html += gHtml;
				html += '</body>';
				res.setHeader('Content-Type', 'text/html');
			res.end(html);
			break;
		case "/chess":
			
			serveImage('chess.jpg', req, res);
			break;
		case "/fern":
			serveImage('fern.jpg', req, res);
			break;
		case "/ace":
			serveImage('ace.jpg', req, res);
			break;
		case '/galler.css':
			res.setHeader('Content-Type', 'text/css');
			res.end(stylesheet);
			break;
		default:
			res.statusCode = 404;
			res.statusMessage = "Not found";
			res.end(); // can only call this once
	}
	
 });

 server.listen(port, function() {
	 
	 console.log("listening on Port " + port);
 });