
// keys and modules
require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

//global variables - AKA user inputs
var whatToDo = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

//spotify func to call for song/artist data and display what we want out of it
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
};

//movie func to call omdb for movie data and display what we want out of it
function movieThis(){
  axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + userInput + "&y=&plot=short")
.then(function (response) {
  //console.log(response.data)
  console.log("Title: " + response.data.Title);
  console.log("Released:  "+ response.data.Year);
  console.log("IMdB Rating: " + response.data.imdbRating);
  console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
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
};

//bands in town call to get show info and display what we want
function concertThis(){
  axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
  .then(function (response){
//console.log(response.data);


if(response.data.length == 0){
  console.log("Nothing happening. Try again later, maybe?")
}
  
else {

  for(var i = 0; i < response.data.length; i++){
    var concertData =[
  "Bands: "+ response.data[i].lineup,
  "Venue: " + response.data[i].venue.name,
  "Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region,  
  "Date: " + moment(response.data[i].datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYY, h:mm A'),
  "   "
].join("\n");
   console.log(concertData)
  }
  
  }
  
})
}

//func to take inoput from linked text file and perform that as a command in place of argv
function doWhatItSays(){
  fs.readFile("random.txt", "utf8", function(err, data){
      if(err){
          console.log(err)
      } 
      
      else {
        var fromTxt = data.split(",")
        
      };
    }
  )
  }

  //switch to tell what functions to call based on user input argv[2]
switch(whatToDo){
    case "spotify-this":
        spotifyThis(userInput);
        break;


    case "movie-this":
        movieThis(userInput);
        break;

    case "concert-this":
        concertThis(userInput);
        break;

    case "do-what-it-says":
      doWhatItSays();
       break;
}
