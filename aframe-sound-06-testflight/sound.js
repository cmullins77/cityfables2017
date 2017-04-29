// --------- Variables for Sound -----------------------
	
	// selects ALL entities with sound on document
	var soundEntity = document.querySelectorAll('[sound]');
	var soundLength = soundEntity.length;
	// variable that keeps track if sound is turned ON or OFF (default OFF)
	var soundOn = false;
	var loud = true;

	/*
	This event listener stops and plays all audio in all entities
	when tapping the screen. Sound is off by default.
	*/

	window.addEventListener('touchstart', function(evt) {
		console.log('Screen was tapped');
		if(soundOn){
			for(var i = 0; i < soundLength; i++){
				soundEntity[i].components.sound.stopSound();
			}
			soundOn = false;
			console.log('All sound is stopped');
		}
		else if(!soundOn){
			for(var i = 0; i < soundLength; i++){
				soundEntity[i].components.sound.playSound();
			}
			soundOn = true;
			console.log('All sound is started');
		}
	}, false);

	/* 
		AUDIOPLAY is a component that simply handles the volume of the audio
		It's recommended to attach the audio play to each A-Frame entity in order
		to control and manipulate the different properties of the 'sound' component.
		For now, it only allows for the adjustment of the volume
	*/

	AFRAME.registerComponent('audioplay',{

		init: function(){
			this.data.maxlevel = this.el.getAttribute('sound').volume;
		},
		
		volumeUp: function(){
			this.el.setAttribute('sound','volume', this.data.maxlevel);
		},

		volumeDown: function(r){
			this.el.setAttribute('sound','volume', this.data.maxlevel*r);
		}

	});
	
	/*
		The LOWAUDIO tag will reduce the audio of every entity that has an AUDIOPLAY tag.
		This will happen when the vuforia image is FOUND. It will reduce to 15% by default.
		When the user looks away from the vuforia image (LOST), it will return surrounding audio back to normal.
		defined in 'sound.js'
	*/

	AFRAME.registerComponent('lowaudio', {
		//When a vuforia image is activated, the surrounding audio gets reduced to 15%
		schema: {
			ratio: {default: 0.15}
		},

		init: function () {
			var self = this;
			this.el.addEventListener('referenceframe-statuschanged', function(evt) {
				self.changeVolume();
			});
		},

        changeVolume: function (){
        	// turn volume down when looking at frame 
        	if(loud){
        		for(var i = 0; i < soundLength; i++){
        			soundEntity[i].components.audioplay.volumeDown(this.data.ratio);
        		}
        		loud = false;
        	}
        	// turn volume up when looking away from frame 
        	else if(!loud){
        		for(var i = 0; i < soundLength; i++){
        			soundEntity[i].components.audioplay.volumeUp();
        		}
        		loud = true;
        	}
        }
	});