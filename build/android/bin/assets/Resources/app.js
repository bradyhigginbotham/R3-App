/*
 * Single Window Application Template:
 * A basic starting point for your application.  Mostly a blank canvas.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var MainWindow;
	if (isTablet) {
		MainWindow = require('ui/tablet/ApplicationWindow');
	}
	else {
		if (osname === 'android') {
			MainWindow = require('ui/handheld/android/Home');
		}
		else {
			MainWindow = require('ui/handheld/iphone/Home');
<<<<<<< HEAD
		}
=======
		}	
>>>>>>> 02651f472334519059ec8626cd080c39033d5b63
	}
	
	Titanium.UI.iPhone.appBadge = 2;
	
	// lengthen splash screen display time
	setTimeout(function(){
		new MainWindow().open();	
	}, 1000);
})();
