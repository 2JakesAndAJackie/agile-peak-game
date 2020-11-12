window.attachEvent("onload", fn); {
  const {Howl, Howler} = require('howler');
  
  let sound = new Howl({
      src: ['../assets/music/02 Says.m4a', '02 Says.webm'],
      html5: true,
	    loop: true,
    });
     
    sound.play();
  }


