<h1>LIRI-Node-App
 
LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.


The app takes the following commands and searches Spotify for songs, Bands in Town for concerts, and OMDB for movies.

  * concert-this
  * spotify-this-song
  * movie-this
  * do-what-it-says
 
 Each command renders back the respective information associated with its command.
 
 <h2>Example
 
 node liri spotify-this-song happy
 
 displays in the terminal and is also appended to the log.txt file.
 
 showcase video of the Liri APP
 
 
 APIs used: BandsInTown, Spotify, Open Movie Database
 NPM used: axios, spotify-node-api, fs, moment, dotenv
