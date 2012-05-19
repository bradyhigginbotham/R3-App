//Home Window Component Constructor
function HomeWindow() {
	//load component dependencies
	var MainView = require('ui/common/MainView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
	
	var mainNavWindow = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'Home',
		navBarHidden: true
	})

/*		
	//construct UI
	var main = new MainView();
	self.add(main);
*/

	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window: mainNavWindow
	})
	self.add(navGroup);

	var collegesButton = Ti.UI.createButton({
		title: "Colleges",
		height: 50,
		width: 100
	})
	mainNavWindow.add(collegesButton);
	
	collegesButton.addEventListener('click', function(e){
		var CollegesWindow = require('windows/CollegesWindow');
		var collegesWindow = new CollegesWindow();
		navGroup.open(collegesWindow, {animated:true});
	})
	
	return self;
}

//make constructor function the public component interface
module.exports = HomeWindow;
