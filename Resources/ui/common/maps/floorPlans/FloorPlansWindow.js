//Floor Plans Window Component Constructor
function FloorPlansWindow() {

		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'Sessions',
		navBarHidden: false
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
module.exports = FloorPlansWindow;