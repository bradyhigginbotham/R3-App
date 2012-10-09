/*------- Push Notifications - iPhone -------*/
function subscribeToNotifications(icon, latest){
	// Loading...
	var loading = Titanium.UI.createActivityIndicator({
		height: 50,
		width: 50,
		message: 'Subscribing...',
		style: Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
	});
	loading.show();

	var Cloud = require('ti.cloud'),
		deviceToken;
		
	userLogin();
	
	// User login
	function userLogin(){
		Cloud.Users.login({
		    login: 'default',
		    password: 'r3AITPconference!'
		}, function (e) {
			if (e.success) {
				var user = e.users[0];
				grabDeviceToken();
		    } else {
				loading.hide();
				loading = null;
				alert('Failed to register for push notifications! Please check your network or data connection.');
		    }
		});
	}
	
	// Device token
	function grabDeviceToken(){
		Titanium.Network.registerForPushNotifications({
		    types: [
		        Titanium.Network.NOTIFICATION_TYPE_BADGE,
		        Titanium.Network.NOTIFICATION_TYPE_ALERT,
		        Titanium.Network.NOTIFICATION_TYPE_SOUND
		    ],
			success: function(e){
			    deviceToken = e.deviceToken;
			    registerForPush();
			},
			error: function(e){
				loading.hide();
				loading = null;
				alert('Failed to register device for push notifications! Please check your network or data connection.');
			},
			callback: function(e){
				var data = JSON.stringify(e.data);
				alert('Message received. Please check the announcements.');
				var notification = JSON.parse(data);
				latest.text = "Latest: " + notification.alert;
				
				// save notification to database
				var db = Titanium.Database.open('r3.sqlite');
			    db.execute("INSERT INTO announcements (title, announcement, read) VALUES ('" + notification.title + "', '" + notification.alert + "', 0)");
			    db.close();
				Ti.UI.iPhone.appBadge = Ti.UI.iPhone.getAppBadge() + 1;
			}
		});
	}
	
	// Subscribe to channel
	function registerForPush(){
		Cloud.PushNotifications.subscribe({
		    channel: 'r3aitp',
		    device_token: deviceToken,
		    type:'ios',
		}, function (e) {
		    if (e.success) {
				loading.hide();
				loading = null;

				alert('You have subscribed to the R3 Conference notification system!');
				icon.backgroundImage = '/icons/home/unsubscribe.png';
				
				// save property
				var db = Titanium.Database.open('r3.sqlite');
			    db.execute("UPDATE user SET subscribed = 1 WHERE username = 'default'");
			    db.close();
		    } else {
				loading.hide();
				loading = null;
				alert('Failed to register for push notifications! Please check your network or data connection.');
		    }
		});
	}
}

function unsubscribeToNotifications(icon){
	// Loading...
	var loading = Titanium.UI.createActivityIndicator({
		height: 50,
		width: 50,
		message: 'Unsubscribing...',
		style: Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
	});
	loading.show();

	var Cloud = require('ti.cloud'),
		deviceToken;
		
	userLogin();
	
	// User login
	function userLogin(){
		Cloud.Users.login({
		    login: 'default',
		    password: 'r3AITPconference!'
		}, function (e) {
			if (e.success) {
				var user = e.users[0];
				grabDeviceToken();
		    } else {
				loading.hide();
				loading = null;
				alert('Failed to unsubscribe to push notifications! Please check your network or data connection.');
		    }
		});
	}
	
	// Device token
	function grabDeviceToken(){
		Titanium.Network.registerForPushNotifications({
		    types: [
		        Titanium.Network.NOTIFICATION_TYPE_BADGE,
		        Titanium.Network.NOTIFICATION_TYPE_ALERT,
		        Titanium.Network.NOTIFICATION_TYPE_SOUND
		    ],
			success: function(e){
			    deviceToken = e.deviceToken;
			    registerForPush();
			},
			error: function(e){
				loading.hide();
				loading = null;
				alert('Failed to unsubscribe to push notifications! Please check your network or data connection.');
			}
		});
	}
	
	// Subscribe to channel
	function registerForPush(){
		Cloud.PushNotifications.unsubscribe({
		    channel: 'r3aitp',
		    device_token: deviceToken,
		    type:'ios',
		}, function (e) {
		    if (e.success) {
				loading.hide();
				loading = null;

		        alert('You have been unsubscribed and will no longer receive conference notifications.');
				icon.backgroundImage = '/icons/home/subscribe.png';
				
				// save property
				var db = Titanium.Database.open('r3.sqlite');
			    db.execute("UPDATE user SET subscribed = 0 WHERE username = 'default'");
			    db.close();
		    } else {
				loading.hide();
				loading = null;
				alert('Failed to unsubscribe to push notifications! Please check your network or data connection.');
		    }
		});
	}
}
exports.subscribeToNotifications = subscribeToNotifications;
exports.unsubscribeToNotifications = unsubscribeToNotifications;