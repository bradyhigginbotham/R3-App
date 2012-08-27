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
	if (isTablet) { // tablets
		if (osname === 'android') {
			MainWindow = require('ui/tablet/android/Home');
		} else {
			MainWindow = require('ui/tablet/ipad/Home');
		}
	}
	else {
		if (osname === 'android') { // phones
			HomeWindow = require('ui/handheld/android/Home');
		}
		else {
			HomeWindow = require('ui/handheld/iphone/Home');
		}
	}

	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');
    var resultSet = db.execute('SELECT COUNT(*) AS rows FROM announcements WHERE read = 0');
	Titanium.UI.iPhone.appBadge = resultSet.fieldByName('rows');
	resultSet.close();
	
	// lengthen splash screen display time
	setTimeout(function(){
		new HomeWindow(osname).open();	
	}, 2000);
})();