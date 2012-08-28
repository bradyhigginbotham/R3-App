//Scheduls Window Component Constructor
function SchedulesWindow(navGroup, osname) {
	//load component dependencies
	var ListView = require('ui/common/schedules/ListView')
		DetailWindow = require('ui/common/schedules/DetailWindow');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'Conference Schedule',
		navBarHidden: false
	});
		
	//construct UI
	var listView = new ListView();
	
	//create list view container
	var listContainerWindow = Ti.UI.createWindow({
		title:'Conference Schedule'
	});
	self.add(listView);
	
	//add behavior for master view
	listView.addEventListener('itemSelected', function(e) {
		var detailWindow = new DetailWindow(navGroup, e);
		navGroup.open(detailWindow);
	});
			
	return self;
}

//make constructor function the public component interface
module.exports = SchedulesWindow;