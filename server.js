"use strict";

// 'hello ${name}! will print out the variable name concatonated to the string
/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
 
 var http = require ('http'); // when require is seen, the type will be http.
 var port = 3000;
 
 var server = http.createServer((req, res) =>{
	res.end("OK");
 });

 server.listen(port, () => {
	 
	 console.log("listening on Port " + port);
 });