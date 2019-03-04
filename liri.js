require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");
var fs = require("fs");

var liriCmd = process.argv[2];
var search = process.argv[3];


// Bands in Town Artist Events 
function concertThis(search){
    axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp").then(
        function(response){

            // console.log("\nArtist Concert Event Information");
            var concertData = [];

            for(var i = 0; i < response.data.length; i++){

                var tourData = response.data[i].venue;
                var m = moment(response.data[i].datetime).format("MM/DD/YYYY");
                concertData = [concertData + "\n" +
                    "Name of Venue: " + tourData.name + "\n" +
                    "Venue location: " + tourData.city + ", " + tourData.region + "\n" +
                    "Date of Event: " + m 
                   + "\n-----------------------------------"

                ]
            }

            console.log("\n------------ARTIST CONCERT INFORMATION---------------" + concertData);
            addText("Concert Event infomation: \n" + concertData + "\n");

        })
        .catch(function(error) {
            if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
            } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            }
            console.log(error.config);
        });
    }

// Spotify 
function spotifyThis(search){

    if(!search){
        search = "The Sign Ace of Base";
    }

    spotify.search({ type: 'track', query: search }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var spotifyData =  data.tracks.items[0];
        var songData = [
            "Artist(s): " + spotifyData.artists[0].name + "\n" +
            "Song Name: " + spotifyData.name + "\n" +
            "Preview Link:  " + spotifyData.preview_url + "\n" +
            "Album: " + spotifyData.album.name + "\n"
        ]

        console.log("\n-------------SONG INFORMATION----------------\n" + songData);

        addText("Song information: \n" + songData + "\n");

        });

}

// OMBD movie 
function movieThis(search){
    if(!search){
        search = "Mr. Nobody";
    }

    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy").then(
        function(response){
            var ombData = response.data;
            var movieData = [
                "Movie Title: " + ombData.Title + "\n" +
                "Release Year: " + ombData.Year + "\n" +
                "IMBD rating: " + ombData.imdbRating + "\n" +
                "Rotten Tomatoes: " + ombData.Ratings[1].Value + "\n" +
                "Country produced: " + ombData.Country + "\n" +
                "Language: " +  ombData.Language + "\n" +
                "Plot: " + ombData.Plot + "\n" +
                "Actors: " + ombData.Actors + "\n" 
            ]

            console.log("\n-------MOVIE INFORMATION--------\n" + movieData);

            addText("Song info: \n" + movieData + "\n");

        })
        .catch(function(error) {
            if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
            } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            }
            console.log(error.config);
        });
}


function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            return console.log(error);
        }

        var dataArray = data.split(",");

        console.log(dataArray);
        if(dataArray[0] === "concert-this"){
            var search = dataArray[1].slice(1, -1);
            concertThis(search);
        } else if (dataArray[0]=== "spotify-this-song"){
            var search = dataArray[1].slice(1, -1);
            spotifyThis(search);
        } else if (dataArray[0]=== "movie-this"){
            var search = dataArray[1].slice(1, -1);
            movieThis(search);
        }
    });
}

function addText(text){
    fs.appendFile("log.txt", text, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Information added to log file");
        }
    });
}

// App commands
switch (liriCmd){
    case "concert-this":
        concertThis(search);
        break;

    case "spotify-this-song":
        spotifyThis(search);
        break;
    
    case "movie-this":
        movieThis(search);
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
    
    default:
            console.log("Sorry - I didn't understand that. Please enter one of the following commands\n"
            + "liri concert-this <artist/band name here> \n" 
            + "liri spotify-this-song <song name here> \n"
            + "liri movie-this <movie name here> \n"
            + "liri do-what-it-says");
            break;
}

