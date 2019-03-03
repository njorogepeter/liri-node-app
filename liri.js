require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");


function concertThis(artist){
    var artist = process.argv[2];
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response){

            for(var i = 0; i < response.data.length; i++){
                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.city +  ", " + response.data[i].venue.region);
                // console.log(response.data[i].venue.region);
                var m = moment(response.data[i].datetime).format("MM/DD/YYYY, h:mm a").split(", ");
                console.log(m);
            }
            // console.log(response.eventdata.venue.venuedata.city);
            // console.log("date: ", m[0]);
            // console.log("time: ", m[0]);
            
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
    function spotifyThis(song){
        spotify.search({ type: 'track', query: song }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            
        //   console.log(data.tracks.items); 
          console.log(data.tracks.items[0].name); 
          console.log(data.tracks.items[0].artists[0].name); 
          console.log(data.tracks.items[0].preview_url);
          console.log(data.tracks.items[0].album.name); 

          });

    }

    spotifyThis("happy");

    function movieThis(movie){
        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
            function(response){
                console.log("Movie Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMBD rating: " + response.data.Year);



            })
    }
movieThis("avengers");
