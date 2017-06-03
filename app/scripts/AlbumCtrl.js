(function() {
     function AlbumCtrl() {
      this.albums.push(angular.copy(albumPicasso));
     }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl', AlbumCtrl);
})();
