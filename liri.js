require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");





var whatToDo = process.argv[2];
var userInput = process.argv[3];

function spotifyThis(input){
    spotify
        .search({ type: 'track', query: input, limit: 1})
        .then(function(response) {
                console.log(JSON.stringify(response.tracks.items[0].artists[0].name, null, 2))
                console.log(JSON.stringify(response.tracks.items[0].name, null, 2))
                console.log(JSON.stringify(response.tracks.items[0].album.name, null, 2))
                console.log(JSON.stringify(response.tracks.items[0].artists[0].external_urls.spotify , null, 2))
            })
        
        .catch(function (err){
        console.log(err);           
        });
}


function concertThis(){
    
}
function movieThis(){
    axios.get("http://www.omdbapi.com/?apikey=trilogy&s=" + userInput)
  .then(function (response) {
    // handle success
    console.log(response.data.Search[0]);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
 
    
    
}
function doWhatItSays(){
    
}

switch(whatToDo){
    case "spotify-this":
        spotifyThis(userInput);
        break;


    case "movie-this":
        movieThis();
        break;

    case "concert-this":
        movieThis();
        break;

    case "do-what-it-says":
       doWhatItSays();
        break;
}
