/*------- Push Notifications - iPhone -------*/
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
			alert("Login successfully");
			grabDeviceToken();
	    } else {
	        alert("Error :"+e.message);
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
		    alert("deviceToken = "+deviceToken);
		    registerForPush();
		},
		error: function(e){
		    alert("Device Token Error: "+e.message);
		},
		callback: function(e){
		    alert("Push notification received"+JSON.stringify(e.data));
		}
	});
}

// Subscribe to channel
function registerForPush(){
	Cloud.PushNotifications.subscribe({
	    channel: 'r3aitp',
	    type:'ios',
	    device_token: deviceToken
	}, function (e) {
	    if (e.success) {
	        alert('Success :'+((e.error && e.message) || JSON.stringify(e)));
	    } else {
	        alert('Error:' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

