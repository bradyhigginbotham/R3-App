//Exhibitors Window Component Constructor
function ExhibitorsWindow(navGroup) {
	//load component dependencies
	var ListView = require('ui/common/jobfair/ListView'),
		DetailView = require('ui/common/jobfair/DetailView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundImage: 'images/bg_bigTex.png',
		title: 'Exhibitors',
		navBarHidden: false
	});
		
	//construct UI
	var listView = new ListView(1),
		detailView = new DetailView();
	
	//create list view container
	var listContainerWindow = Ti.UI.createWindow({
		title:'Exhibitors'
	});
	self.add(listView);
	
	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({
		title:'Exhibitor Details',
		backgroundImage: 'images/bg_bigTex.png'
	});
	detailContainerWindow.add(detailView);
	
	//add behavior for master view
	listView.addEventListener('itemSelected', function(e) {
		detailView.fireEvent('itemSelected',e);
		self.parentTab.open(detailContainerWindow);
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
module.exports = ExhibitorsWindow;