//Colleges Window Component Constructor
function CollegesWindow(navGroup) {
	//load component dependencies
	var ListView = require('ui/common/colleges/ListView'),
		DetailView = require('ui/common/colleges/DetailView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'Colleges',
		navBarHidden: false
	});
		
	//construct UI
	var listView = new ListView(),
		detailView = new DetailView();
	
	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({
		title:'College Details',
		backgroundImage: 'images/bg_bigTex.png'
	});
	detailContainerWindow.add(detailView);
	
	//add behavior for master view
	listView.addEventListener('itemSelected', function(e) {
		detailView.fireEvent('itemSelected',e);
		navGroup.open(detailContainerWindow);
	});
	
	self.add(listView);
	
	return self;
}

//make constructor function the public component interface
module.exports = CollegesWindow;
