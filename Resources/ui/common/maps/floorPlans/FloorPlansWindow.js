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
	
	//creating buttons
		var moutonIcon = Ti.UI.createButton({
		title: "F.G. Mouton",
		height: 50,
		width: 100,
		bottom: 0,
		left: 10
	});
	self.add(moutonIcon);

   		var moodyIcon = Ti.UI.createButton({
		title: "Moody",
		height: 50,
		width: 100,
		bottom: 0,
		right: 10
	});
	self.add(moodyIcon);
	
	//image switcher
		var floorPlans = Ti.UI.createImageView({
		image: '/Resources/floorplan/FGMouton.png',
		width: (Ti.Platform.displayCaps.platformHeight - 100) * 1.875,
		height: Ti.Platform.displayCaps.platformHeight - 100,
		top: 0,
		left: 0
	});
	
	return self;
}

//make constructor function the public component interface
module.exports = FloorPlansWindow;