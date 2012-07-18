//Announcements Window Component Constructor
function AnnouncementsWindow(navGroup) {
	//load component dependencies
	var ListView = require('ui/common/announcements/ListView'),
		DetailView = require('ui/common/announcements/DetailView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'Announcements',
		navBarHidden: false
	});
		
	//construct UI
	var listView = new ListView(),
		detailView = new DetailView();
	
	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({
		title:'Details'
	});
	detailContainerWindow.add(detailView);
	
	//add behavior for master view
	listView.addEventListener('itemSelected', function(e) {
		detailView.fireEvent('itemSelected', e);
		navGroup.open(detailContainerWindow);
	});

	self.add(listView);
	
	return self;
}

//make constructor function the public component interface
module.exports = AnnouncementsWindow;