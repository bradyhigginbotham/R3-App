//Colleges Window Component Constructor
function CollegesWindow() {
	//load component dependencies
	var ListView = require('ui/common/ListView'),
		DetailView = require('ui/common/DetailView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	//construct UI
	var listView = new ListView(),
		detailView = new DetailView();
	
	//create list view container
	var listContainerWindow = Ti.UI.createWindow({
		title:'Colleges'
	});
	listContainerWindow.add(listView);
	
	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({
		title:'College Details'
	});
	detailContainerWindow.add(detailView);
	
	//createiOS specific NavGroup UI
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:listContainerWindow
	});
	self.add(navGroup);
	
	//add behavior for master view
	listView.addEventListener('itemSelected', function(e) {
		detailView.fireEvent('itemSelected',e);
		navGroup.open(detailContainerWindow);
	});

	return self;
}

//make constructor function the public component interface
module.exports = CollegesWindow;
