//App Window Component Constructor
function ContactWindow(navGroup) 
{		
	//load dependencies
	var ListView = require('ui/common/about/contact/ListView');
	
	//Create object instance
	var self = Ti.UI.createWindow({
		backgroundImage: 'images/bg_bigTex.png',
		title: 'Contact',
		navBarHidden: false
	});
	
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
module.exports = ContactWindow;

