//Certification Window Component Constructor
function CertificationsWindow(navGroup) 
{
	//load component dependencies
	var ListView = require('ui/common/about/app/ListView'),
		
	//Create object instance
	var self = Ti.UI.createWindow
	({
		backgroundColor:'#ffffff',
		title: 'App Overview',
		navBarHidden: false
	})
	
	//Construct UI
	var listView = new ListView();
		
	return self;
}

//make constructor function the public component interface
module.exports = CertificationsWindow;

