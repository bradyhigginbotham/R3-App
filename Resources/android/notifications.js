/*------- Push Notifications - Android -------*/
function subscribeToNotifications(){
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
		    }else{
		        alert('Error:' +((e.error && e.message) || JSON.stringify(e)));
		    }
		});
	}
}

function unsubscribeToNotifications(){
	Cloud.PushNotifications.unsubscribe({
	    channel: 'r3aitp',
	    device_token: deviceToken,
	    type: 'android'
	}, function (e) {
	    if (e.success) {
	        alert('You have been unsubscribed and will not longer receive conference notifications.');
	    } else {
	        alert('Error:\\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

// Exports
exports.subscribeToNotifications = subscribeToNotifications;
exports.unsubscribeToNotifications = unsubscribeToNotifications;