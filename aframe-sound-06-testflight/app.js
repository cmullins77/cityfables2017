var soundEntity = document.querySelectorAll('[sound]')


   AFRAME.registerComponent('audioplay',{
		/*
		This function stops and plays all audio in all entities
		when tapping the screen
		*/
		init: function(){
			var self = this.el;
			var sound = self.components.sound;
			sound.volume = 0;
			window.addEventListener('touchstart', function() {
				if(sound.volume == 0){
					sound.playSound();
					sound.volume = 1;
				}
				else if(sound.volume == 1){
					sound.stopSound();
					sound.volume = 0;
				}
			}, false);
		}

	});

   AFRAME.registerComponent('audio-low',{
		/*
		When a vuforia image is activated, the surrounding audio gets reduced to 25%
		*/
		init: function () {
          var self = this;
          var loud = false;
          var playing = true;
          console.log("changing sound audio")

          // for loop to select each sound entity and check volume
		  for(var i = 0; i < soundEntity.length; i++){
			var vol = soundEntity[i].volume;
			if(vol == 1) loud = true;\
			if(vol == 0) playing = false;
		  }

          this.el.addEventListener('referenceframe-statuschanged', function(evt) {
            if(playing) self.changeVolume(evt);
          });

        }

        changeVolume: function (evt) {
          if (loud) { 
          	console.log("turn down the noise");
          	for(var i = 0; i < soundEntity.length; i++){
			  soundEntity[i].volume = .25;
			}
          	loud = false;
          }
          else {
          	console.log("turnip for what");
          	for(var i = 0; i < soundEntity.length; i++){
			  soundEntity[i].volume = 1;
			}
          	loud = true;
 		  }	 
        }

	});