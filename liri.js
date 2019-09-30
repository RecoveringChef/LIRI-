require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");





var whatToDo = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

function spotifyThis(input){
    spotify
        .search({ type: 'track', query: input, limit: 4})
        .then(function(response) {
                console.log(JSON.stringify("Artist: " + response.tracks.items[0].artists[0].name, null, 2))
                console.log(JSON.stringify("Song: " + response.tracks.items[0].name, null, 2))
                console.log(JSON.stringify("Album: " + response.tracks.items[0].album.name, null, 2))
                console.log(JSON.stringify(response.tracks.items[0].artists[0].external_urls.spotify , null, 2))
            })
        
        .catch(function (err){
        console.log(err);           
        });
}


function concertThis(){
    
}
function movieThis(){
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + userInput + "&y=&plot=short")
  .then(function (response) {
    console.log(response.data)
    console.log("Title: " + response.data.Title);
    console.log(JSON.stringify("Released:  "+ response.data.Year));
    console.log("IMdB Rating: " + response.data.imdbRating);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);

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

//    case "concert-this":
  //      concertThis();
  //      break;

  //  case "do-what-it-says":
 //      doWhatItSays();
  //      break;
}
