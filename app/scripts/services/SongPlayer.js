(function() {
     function SongPlayer($rootScope, Fixtures) {
         var SongPlayer = {};
         var currentAlbum = Fixtures.getAlbum();
          
         var getSongIndex = function(song){
             return currentAlbum.songs.indexOf(song);
         }
         
         SongPlayer.currentSong = null
          /**
          * @desc Current playback time (in seconds) of currently playing song
          * @type {Number}
          */
          SongPlayer.currentTime = null;
         
          /**
          * @desc Current volume (scale 0-100)
          * @type {Number}
          */
          SongPlayer.volume = 80;
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
          currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
              preload: true
          });
          
          currentBuzzObject.bind('timeupdate', function() {
             $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
            });
          });

          currentSong = song;
         };
         
         /**
         * @function playSong
         * @desc Plays current song and sets song.playing to true
         * @param {Object} song
         */
         var playSong = function(song) {
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
         SongPlayer.previous = function() {
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

         SongPlayer.next = function() {
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
         
         /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
         SongPlayer.setCurrentTime = function(time) {
             if (currentBuzzObject) {
                 currentBuzzObject.setTime(time);
             }
         };
         
         /**
          * @function setVolume
          * @desc Sets the volume
          * @param {Number} volume
          */
          SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
          };
         
         return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
