//Sessions Window Component Constructor
function SessionsWindow(navGroup, osname) {
	//load component dependencies
	var ListView = require('ui/common/presentations/sessions/ListView'),
		DetailWindow = require('ui/common/presentations/sessions/DetailWindow');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'Sessions',
		navBarHidden: false
	});
		
	//construct UI
	var listView = new ListView(osname);
	
	//create list view container
	var listContainerWindow = Ti.UI.createWindow({
		title:'Sessions'
	});
	self.add(listView);
	
	//add behavior for master view
	listView.addEventListener('sessionSelected', function(e) {
		var detailWindow = new DetailWindow(self.parentTab, e, osname);
		self.parentTab.open(detailWindow);
	});
	
	var homeButton = Ti.UI.createButton({
		title: 'Home'
	});
	self.leftNavButton = homeButton;
	
	homeButton.addEventListener('click', function(){
		navGroup.close(self.tabGroup);
	});
	
	return self;
}

//make constructor function the public component interface
module.exports = SessionsWindow;
