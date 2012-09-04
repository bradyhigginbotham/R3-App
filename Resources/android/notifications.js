/*------- Push Notifications - Android -------*/
function subscribeToNotifications(icon){
	var CloudPush = require('ti.cloudpush'),
	Cloud = require('ti.cloud'),
	deviceToken;

	// Settings
	CloudPush.enabled = true;
	CloudPush.showTrayNotificationsWhenFocused = true;
	CloudPush.focusAppOnPush = false;
	
	grabDeviceToken();
	
	// Device token
	function grabDeviceToken(){
		CloudPush.retrieveDeviceToken({
			success: function deviceTokenSuccess(e) {
				deviceToken = e.deviceToken;
				userLogin();
			},
			error: function deviceTokenError(e) {
				alert('Failed to register for push! ' + e.error);
			}
		});
	}
	
	// User login
	function userLogin(){
		Cloud.Users.login({
			login: 'default',
			password: 'r3AITPconference!'
		}, function (e) {
			if (e.success) {
				registerForPush();
			} else {
				alert('Error: ' +((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}
	
	// Subscribe to channel
	function registerForPush(){
		Cloud.PushNotifications.subscribe({
		    channel: 'r3aitp', // "alert" is channel name
		    device_token: deviceToken,
		    type: 'android'
		}, function (e){
		    if (e.success) {
		       alert('You have subscribed to the R3 Conference notification system!');
				icon.backgroundImage = '/icons/home/unsubscribe.png';
				
				// save property
				var db = Titanium.Database.open('r3.sqlite');
			    db.execute("UPDATE user SET subscribed = 1 WHERE username = 'default'");
			    db.close();
		    }else{
		        alert('Error:' +((e.error && e.message) || JSON.stringify(e)));
		    }
		});
	}
}

function unsubscribeToNotifications(icon){
	var CloudPush = require('ti.cloudpush'),
	Cloud = require('ti.cloud'),
	deviceToken;

	// Settings
	CloudPush.enabled = true;
	CloudPush.showTrayNotificationsWhenFocused = true;
	CloudPush.focusAppOnPush = false;
	
	grabDeviceToken();
	
	// Device token
	function grabDeviceToken(){
		CloudPush.retrieveDeviceToken({
			success: function deviceTokenSuccess(e) {
				deviceToken = e.deviceToken;
				userLogin();
			},
			error: function deviceTokenError(e) {
				alert('Failed to register for push! ' + e.error);
			}
		});
	}
	
	// User login
	function userLogin(){
		Cloud.Users.login({
			login: 'default',
			password: 'r3AITPconference!'
		}, function (e) {
			if (e.success) {
				unregisterForPush();
			} else {
				alert('Error: ' +((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}
	
	function unregisterForPush(){
		Cloud.PushNotifications.unsubscribe({
		    channel: 'r3aitp',
		    device_token: deviceToken,
		    type: 'android'
		}, function (e) {
		    if (e.success) {
		        alert('You have been unsubscribed and will no longer receive conference notifications.');
				icon.backgroundImage = '/icons/home/subscribe.png';
				
				// save property
				var db = Titanium.Database.open('r3.sqlite');
			    db.execute("UPDATE user SET subscribed = 0 WHERE username = 'default'");
			    db.close();
		    } else {
		        alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
		    }
		});
	}
}

// Exports
exports.subscribeToNotifications = subscribeToNotifications;
exports.unsubscribeToNotifications = unsubscribeToNotifications;