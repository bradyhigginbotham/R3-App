//Home Window Component Constructor
function HomeWindow() {
	//load component dependencies
	var MainView = require('ui/common/MainView'), navGroup = undefined;
		
	//create component instance
	var self = Ti.UI.createWindow();
	var mainNavWindow = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'Home',
		navBarHidden: true
	});

/*		
	//construct UI
	var main = new MainView();
	self.add(main);
*/

	/*---- Home Icons ----*/
	var collegesButton = Ti.UI.createButton({
		title: "Colleges",
		height: 50,
		width: 100
	})
	mainNavWindow.add(collegesButton);
	
	var schedulesButton = Ti.UI.createButton({
		title: "Schedule",
		height: 50,
		width: 100,
		top: 20
	})
	mainNavWindow.add(schedulesButton);
	
	var mapsButton = Ti.UI.createButton({
		title: "Maps",
		height: 50,
		width: 100,
		bottom: 20
	})
	mainNavWindow.add(mapsButton);
	
	
	/*---- Icon EventListeners ----*/
	collegesButton.addEventListener('click', function(e){
		var CollegesWindow = require('ui/common/colleges/CollegesWindow');
		var collegesWindow = new CollegesWindow(navGroup);
		navGroup.open(collegesWindow, {animated:true});
	});
	
	schedulesButton.addEventListener('click', function(e){
		var SchedulesWindow = require('ui/common/schedules/SchedulesWindow');
		var schedulesWindow = new SchedulesWindow(navGroup);
		navGroup.open(schedulesWindow, {animated:true});
	});
	
	mapsButton.addEventListener('click', function(e){
		var MapsWindow = require('ui/common/maps/MapsWindow');
		var mapsWindow = new MapsWindow();
		navGroup.open(mapsWindow, {animated:true});
	});
	
    // handle cross-platform navigation
    if (Ti.Platform.osname == 'android') {
        navGroup = {
            open: function (win, obj) {
                win.open(obj);
            },
            close: function (win, obj) {
                win.close(obj);
            }
        };
        self = mainNavWindow;
        self.exitOnClose = true;
        mainNavWindow = null;
    } else {
		navGroup = Ti.UI.iPhone.createNavigationGroup({
			window: mainNavWindow
		});
		self.add(navGroup);
    }
	
	return self;
}

//make constructor function the public component interface
module.exports = HomeWindow;
