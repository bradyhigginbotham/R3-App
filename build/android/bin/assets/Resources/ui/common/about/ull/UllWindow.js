//App Window Component Constructor
function UllWindow(navGroup) 
{		
	//load dependencies
	var ListView = require('ui/common/about/ull/ListView');
	
	//Create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'App Overview',
		navBarHidden: false
	})
	
	var listView = new ListView();	
	
	self.add(listView);
	
	return self;
}

//make constructor function the public component interface
module.exports = UllWindow;

