/*------- Push Notifications - Android -------*/
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
			alert('Device Token: ' + e.deviceToken);
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
			alert("login success");
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
	       alert('Subscribed for Push Notification!');
	    }else{
	        alert('Error:' +((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}