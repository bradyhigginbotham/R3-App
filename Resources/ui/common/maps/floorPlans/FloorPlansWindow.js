//Sessions Window Component Constructor
function SessionsWindow(navGroup) {
	//load component dependencies
	var ListView = require('ui/common/maps/floorPlans/ListView'),
		DetailView = require('ui/common/maps/floorPlans/DetailView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'Sessions',
		navBarHidden: false
	});
		
	//construct UI
	var listView = new ListView(),
		detailView = new DetailView();
	
	//create list view container
	var listContainerWindow = Ti.UI.createWindow({
		title:'Floor Plans'
	});
	self.add(listView);
	
	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({
		title:'Images'
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
module.exports = FloorPLansWindow;