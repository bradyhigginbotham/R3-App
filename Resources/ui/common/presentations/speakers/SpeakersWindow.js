//Speakers Window Component Constructor
function SpeakersWindow(navGroup) {
	//load component dependencies
	var ListView = require('ui/common/presentations/speakers/ListView'),
		DetailWindow = require('ui/common/presentations/speakers/DetailWindow');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'Speakers',
		navBarHidden: false
	});
		
	//construct UI
	var listView = new ListView();
	
	//create list view container
	var listContainerWindow = Ti.UI.createWindow({
		title:'Speakers'
	});
	self.add(listView);
	
	//add behavior for master view
	listView.addEventListener('speakerSelected', function(e) {		
		var detailWindow = new DetailWindow(self.parentTab, e);
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
module.exports = SpeakersWindow;
