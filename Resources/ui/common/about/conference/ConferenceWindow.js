//App Window Component Constructor
function ConferenceWindow(navGroup) 
{		
	//load dependencies
	var ListView = require('ui/common/about/conference/ListView');
	
	//Create object instance
	var self = Ti.UI.createWindow({
		backgroundImage: 'images/bg_bigTex.png',
		title: 'R3 Conference',
		navBarHidden: false
	})
	
	var listView = new ListView();	
	
	self.add(listView);
	
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
module.exports = ConferenceWindow;

