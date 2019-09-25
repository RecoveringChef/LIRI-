require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");





var whatToDo = process.argv[2];
var userInput = process.argv[3];

function spotifyThis(input){
    spotify
        .search({ type: 'track', query: input, limit: 1})
        .then(function(response) {
                console.log(JSON.stringify(response.tracks.items[0].artist,name, null, 2))
            }
          )
        
        .catch(function (err){
        console.log(err);           
        });
};


function concertThis(){
    
}
function movieThis(){
    
}
function doWhatItSays(){
    
}
/*
switch(){
    case "spotify-this-song":
        spotifyThis();
        break;
}
switch(){
    case "movie-this":
        concertThis();
        break;
}
switch(){
    case "concert-this":
        movieThis();
        break;
}
switch(){
    case "do-what-it-says":
       doWhatItSays();
        break;
}
*/