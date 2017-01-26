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
			res.setheader("Contet-Type", "image/jpeg"); // tells browser what the data is
			res.end(body); // browser will now display data
	 }); 
	 
 }
 var server = http.createServer(function(req, res) {
	switch (req.url) {
		
		case "/chess":
			serveImage('chess.jpg', req, res);
			break;
		case "/fern.jpeg":
			serveImage('fern.jpg', req, res);
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