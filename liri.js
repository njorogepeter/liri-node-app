require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");

var liriCmd = process.argv[2];
var search = process.argv[3];





// Bands in Town Artist Events 
function concertThis(search){
    axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp").then(
        function(response){

            console.log("\nArtist Concert Event Information");

            for(var i = 0; i < response.data.length; i++){
                var tourData = response.data[i].venue;
                var m = moment(response.data[i].datetime).format("MM/DD/YYYY, h:mm a").split(", ");
                var concertData = [
                    "Name of Venue: " + tourData.name + "\n" +
                    "Venue location: " + tourData.city + ", " + tourData.region + "\n" +
                    "Date of Event: " + m

                ]
                console.log("------------------------------------\n" + concertData);
            }
        
            
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
        search = "The Sign";
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

        console.log("Information about the song\n--------------------------\n" + songData);
        // console.log(data.tracks.items[0].name); 
        // console.log(data.tracks.items[0].artists[0].name); 
        // console.log(data.tracks.items[0].preview_url);
        // console.log(data.tracks.items[0].album.name); 

        });

}

// OMBD
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

            console.log("About the Movie\n---------------\n" + movieData);


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


