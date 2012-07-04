//Announcements Window Component Constructor
function AnnouncementsWindow(navGroup) {
	//load component dependencies
	var ListView = require('ui/common/announcements/ListView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'Announcements',
		navBarHidden: false
	});
		
	//construct UI
	var listView = new ListView();
	self.add(listView);
	
	return self;
}

//make constructor function the public component interface
module.exports = AnnouncementsWindow;