(function() {
     function SongPlayer(Fixtures) {
         var SongPlayer = {};
         var currentAlbum = Fixtures.getAlbum();
          
         var getSongIndex = function(song){
             return currentAlbum.songs.indexOf(song);
         }
         // Raj: Don't get, not defined - see belown how currentSong is declared
         songPlayer.currentSong = Null
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
          var currentBuzzObject = null;

          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
          var setSong = function(song) {
          if (currentBuzzObject) {
              currentBuzzObject.stop();
              currentSong.playing = null;
          }
          //Ask Raj about format
          currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
              preload: true
          });

          currentSong = song;
         };
     /**
     * @function playSong
     * @desc Plays current song and sets song.playing to true
     * @param {Object} song
     */
     var playSong = function(song) {
            // Ask Raj about the currentBuzzObject
            currentBuzzObject.play();
            song.playing = true;
     };
     /**
      * @function stopSong
      * @desc Stop a song
      * @param {Object} song
     */
     var stopSong = function(song) {
        currentBuzzObject.stop();
        song.playing = null;
     };
         
     SongPlayer.play = function(song) {
         song = song || SongPlayer.currentSong;
         if (currentSong !== song) {
             setSong(song);
             currentBuzzObject.play();    
         } else if (currentSong === song) {
             if (currentBuzzObject.isPaused()) {
                 //currentBuzzObject.play();
                 playSong(song);
             }
         }              
     };
     /**
     * @function pause
     * @desc Pauses current song
     * @param {Object} song
     */
     SongPlayer.pause = function(song) {
         song = song || SongPlayer.currentSong;
         currentBuzzObject.pause();
         song.playing = false;
     };
        
      /**
     * @function previous
     * @desc Skips to previous song
     * @param {Object} song
     */ 
     Songplayer.previous = function() {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
         currentSongIndex--;
         
         if (currentSongIndex < 0) {
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
         } else {
             var song = currentAlbum.songs[currentSongIndex];
             setSong(song);
             playSong(song);
         }
     };
         
     Songplayer.next = function() {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
         currentSongIndex++;
          
         var lastSongIndex = CurrentAlbum.songs.length -1;
         
         if (currentSongIndex < lastSongIndex) {
             stopSong(SongPlayer.currentSong);
         } else {
             var song = currentAlbum.songs[currentSongIndex];
             setSong(song);
             playSong(song);
         }
     };
         
         return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
