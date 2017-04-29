var theVideo = document.createElement('video');
        
AFRAME.registerComponent('videoplay', {
  schema: {
    url: {type: 'string'},
    playing: {default: false}
  },

  init: function () {
    var self = this;
    data = self.data;
    theVideo.src = data.url;
    data.url = theVideo.src;
    theVideo.load();
    console.log("initializing the video")
    data.playing = 0;
    this.el.addEventListener('referenceframe-statuschanged', function(evt) {
        // update video
        self.updatePlayPause(evt);
    });
  },

  updatePlayPause: function (evt) {
    var playing = this.data.playing;
    if (playing) { 
      console.log("pausing the video");
      theVideo.pause();
      this.data.playing = false;
    }
    else {
      console.log("playing the video");
      if(theVideo.src != this.data.url){
        theVideo.src = this.data.url;
        theVideo.load();
      }
      theVideo.play();
      this.data.playing = true;
      console.log(theVideo.src);
    }  
  }

});