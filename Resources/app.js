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
		width = Ti.Platform.displayCaps.platformWidth,
		HomeWindow, navGroup;
		
	// Install database
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 999));
	
	if (isTablet) { // tablets
		if (osname === 'android') {
			HomeWindow = require('ui/tablet/android/Home');
		} else {
			HomeWindow = require('ui/tablet/ipad/Home');
		}
	}
	else {
		if (osname === 'android') { // phones
			// handle Android navigation
			var NavigationController = require('NavigationController'),
			navGroup = new NavigationController();
			HomeWindow = require('ui/handheld/android/Home');
		}
		else {
			HomeWindow = require('ui/handheld/iphone/Home');
		}
	}
	
	// lengthen splash screen display time
	if (osname === 'android'){
		setTimeout(function(){
			navGroup.open(new HomeWindow(navGroup, osname));	
		}, 2000);
	} else {
		setTimeout(function(){
			new HomeWindow().open(osname);	
		}, 2000);		
	}
	
	//Push Notifications
	if(osname === 'android'){
		var CloudPush = require('ti.cloudpush');
		CloudPush.addEventListener('callback', function (evt) {
	        var notification = JSON.parse(evt.payload);
			var db = Titanium.Database.open('r3.sqlite');
		    db.execute("INSERT INTO announcements (title, announcement, read) VALUES ('" + notification.android.title + "', '" + notification.android.alert + "', 0)");
		    db.close();
	    });
	} else {
	//	Ti.include('iphone/notifications.js');
	};

})();