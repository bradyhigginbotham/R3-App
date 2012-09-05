//Floor Plans Window Component Constructor
function FloorPlansWindow(navGroup, osname) {
	var imageHeight = Ti.Platform.displayCaps.platformHeight;
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'F.G. Mouton',
		navBarHidden: false
	});
		

	var homeButton = Ti.UI.createButton({
		title: 'Home'
	});
	self.leftNavButton = homeButton;
	
	homeButton.addEventListener('click', function(){
		navGroup.close(self.tabGroup);
	});
	
	
	//image switcher
	if (osname === 'android'){
		var floorPlans = Ti.UI.createImageView({
			image: '/floorplan/FGMouton.png',
			width: (imageHeight - 100) * 1.875,
			height: imageHeight - (imageHeight * 0.25),
			top: 0,
			left: 0
		});	
	} else {
		var floorPlans = Ti.UI.createImageView({
			image: '/floorplan/FGMouton.png',
			width: (imageHeight - 100) * 1.875,
			height: imageHeight - 100,
			top: 0,
			left: 0
		});
	}

	var scrollView = Titanium.UI.createScrollView({
    	scrollType: 'horizontal',
        contentWidth: floorPlans.width,
        contentHeight: floorPlans.height,
        left:0,
        top:0,          
        showHorizontalScrollIndicator: true,
        showVerticalScrollIndicator:false,
        verticalBounce: false,
        maxZoomScale: 10,
        minZoomScale: 1.0,
//		canScale: true,
        backgroundColor: "white",      
	});  
    scrollView.add(floorPlans);
	self.add(scrollView);
	
	//creating buttons
	var moutonIcon = Ti.UI.createButton({
		title: "F.G. Mouton",
		height: 50,
		width: 100,
		bottom: 10,
		left: 10
	});
	self.add(moutonIcon);

	var moodyIcon = Ti.UI.createButton({
		title: "Moody",
		height: 50,
		width: 100,
		bottom: 10,
		right: 10
	});
	self.add(moodyIcon);
	
	moutonIcon.addEventListener('click', function (){
		floorPlans.image = '/floorplan/FGMouton.png';
		self.title = 'F.G. Mouton';
	});
	
	moodyIcon.addEventListener('click', function (){
		floorPlans.image = '/floorplan/Moody.png';
		self.title = 'B.I. Moody';
	});
	
	self.addEventListener('close', function(){
		self.remove(floorPlans);
		floorPlans = null;
	});
	
	
	return self;
}

//make constructor function the public component interface
module.exports = FloorPlansWindow;