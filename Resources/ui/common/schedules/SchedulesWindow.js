//Scheduls Window Component Constructor
function SchedulesWindow(navGroup) {
	//load component dependencies
	var ListView = require('ui/common/schedules/ListView'),
		DetailView = require('ui/common/schedules/DetailView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'Conference Schedule',
		navBarHidden: false
	});
		
	//construct UI
	var listView = new ListView(),
		detailView = new DetailView();
	
	//create list view container
	var listContainerWindow = Ti.UI.createWindow({
		title:'Conference Schedule'
	});
	self.add(listView);
	
	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({
		title:'Schedule Details',
		layout: 'vertical',
		backButtonTitle: 'Schedule'
	});
	detailContainerWindow.add(detailView);
	
	//add behavior for master view
	listView.addEventListener('itemSelected', function(e) {
		detailView.fireEvent('itemSelected',e);
		detailContainerWindow.title = e.name;
		navGroup.open(detailContainerWindow);
	});
		
	return self;
}

//make constructor function the public component interface
module.exports = SchedulesWindow;
