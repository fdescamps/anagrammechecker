/**
 *.
 *“Write a function to determine if two strings are anagrams of each other.”
 */
var split = require("split");
var Transform = require("stream").Transform;
var util = require("util");
var fs = require('fs');

process.stdin.setEncoding("utf8"); // convert bytes to utf8 characters



util.inherits(ProblemStream, Transform); // inherit Transform
function ProblemStream () {
  Transform.call(this, { "objectMode": true }); // invoke Transform's constructor
}

ProblemStream.prototype._transform = function ( line, encoding, processed ) {
  var twowords = line.split( ',' );
  this.push( twowords );
  processed(); // we're done processing the current line
};




util.inherits(SolutionStream, Transform);
function SolutionStream () {
  Transform.call(this, { "objectMode": true });
}

SolutionStream.prototype._transform = function ( problem, encoding, processed ) {
  var solution = solve( problem );
  this.push( ( problem.join(' anagramme de ') ) + ' = ' + solution + '\n' );//when you push just a basic false the stream ends... WTF????.join('') + '\r\n'
  processed();
  function solve ( problem ) {
    var areAnagramme = false;
    if( null===problem || problem.length !==2 ){
      areAnagramme = false;
    }
    if( problem[0].length === problem[1].length ){
      areAnagramme = false;
    }
    if( problem[0].split('').sort().join('').localeCompare( problem[1].split('').sort().join('') ) === 0 ){
      areAnagramme = true;
    }
    return areAnagramme;
  }
};




util.inherits(FormatStream, Transform);
function FormatStream () {
  Transform.call(this, { "objectMode": true });
}
FormatStream.prototype._transform = function ( solution, encoding, processed ) {
  this.push( solution );
  processed();
};



console.log( "KATA 2 : Write a function to determine if two strings are anagrams of each other." );
fs.createReadStream( "anagramme-data-fat.txt" )
  .pipe( split() )
  .pipe( new ProblemStream() )
  .pipe( new SolutionStream() )
  .pipe( new FormatStream() )
  .pipe( process.stdout );
