//App Window Component Constructor
function AppWindow(navGroup) 
{		
	//load dependencies
	var ListView = require('ui/common/about/app/ListView');
	
	//Create object instance
	var self = Ti.UI.createWindow({
		backgroundImage: 'images/bg_bigTex.png',
		title: 'App Overview',
		navBarHidden: false
	})
	
	var listView = new ListView();	
	
	self.add(listView);
	
	var homeButton = Ti.UI.createButton({
		title: 'Home'
	});
	self.leftNavButton = homeButton;
	
	homeButton.addEventListener('click', function(){
		Ti.App.fireEvent('closeAbout');
	});

	function removeIt(){
		self.remove(listView);
		listView = null;
		self.leftNavButton = null;
		homeButton = null;
	};
	
	Ti.App.addEventListener('closeAbout', removeIt);
	
	self.addEventListener('close', function(){
		Ti.App.removeEventListener('closeAbout', removeIt);
	});
	
	return self;
}

//make constructor function the public component interface
module.exports = AppWindow;

