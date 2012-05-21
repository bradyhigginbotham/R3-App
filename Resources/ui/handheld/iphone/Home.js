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

	var collegesButton = Ti.UI.createButton({
		title: "Colleges",
		height: 50,
		width: 100
	})
	mainNavWindow.add(collegesButton);
	
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
    
   	collegesButton.addEventListener('click', function(e){
		var CollegesWindow = require('windows/CollegesWindow');
		var collegesWindow = new CollegesWindow(navGroup);
		navGroup.open(collegesWindow, {animated:true});
	})
	
	return self;
}

//make constructor function the public component interface
module.exports = HomeWindow;
