//Home Window Component Constructor
function HomeWindow() {
	//load component dependencies
	var MainView = require('ui/common/MainView'), navGroup = undefined;
	
	// constants
	var iconHeight = 50, iconWidth = 100, iconTop = 10, iconLeft = 10;
		
	//create component instance
	var self = Ti.UI.createWindow();
	var mainNavWindow = Ti.UI.createWindow({
		backgroundImage:'images/home_frame.png',
		title: 'Home',
		navBarHidden: true
	});

/*		
	//construct UI
	var main = new MainView();
	self.add(main);
*/

	// Announcements view
	var announcementRow = Ti.UI.createTableViewRow({
		background: 'transparent',
		hasChild: true,
		height: 60
	});
	
	var header = Ti.UI.createLabel({
		text: 'Announcements',
		color: '#7C0606',
		font: {fontSize: 24, fontWeight: 'bold'},
		top: 5,
		left: 10,
		height: 25
	});
	var subtitle = Ti.UI.createLabel({
		text: 'LATEST: Most recent announcement.',
		color: '#6A737D',
		font: {fontSize: 12},
		top: 25,
		left: 10,
		height: 25
	});
	announcementRow.add(header);
	announcementRow.add(subtitle);
	
	var announcements = Ti.UI.createTableView({
		top: 150,
		height: 60,
		className: 'announcements'
	});
	announcements.appendRow(announcementRow);

	/*---- Home Icons ----*/
	var iconsContainer = Ti.UI.createView({
		backgroundColor: '#E5EAEF',
		top: 0,
		height: 150,
		layout: 'horizontal'
	})
	var collegesButton = Ti.UI.createButton({
		title: "Colleges",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	})
	iconsContainer.add(collegesButton);
	
	var schedulesButton = Ti.UI.createButton({
		title: "Schedule",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	})
	iconsContainer.add(schedulesButton);
	
	var mapsButton = Ti.UI.createButton({
		title: "Maps",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	})
	iconsContainer.add(mapsButton);
	
	var presentationsButton = Ti.UI.createButton({
		title: "Presentations",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	})
	iconsContainer.add(presentationsButton);
	
	var competitionsButton = Ti.UI.createButton({
		title: "Competitions",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	})
	iconsContainer.add(competitionsButton);
	
	var certificationsButton = Ti.UI.createButton({
		title: "Certifications",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	})
	iconsContainer.add(certificationsButton);
	
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
	
	presentationsButton.addEventListener('click', function(e){
		var TabGroup = require('ui/common/presentations/TabGroup');
		var tabGroup = new TabGroup(navGroup);
		navGroup.open(tabGroup);
	});
	
	competitionsButton.addEventListener('click', function(e){
		var TabGroup = require('ui/common/competitions/CompetitionsWindow');
		var tabGroup = new TabGroup(navGroup);
		navGroup.open(tabGroup);
	});	
	certificationsButton.addEventListener('click', function(e){
		var TabGroup = require('ui/common/certifications/CertificationsWindow');
		var tabGroup = new TabGroup(navGroup);
		navGroup.open(tabGroup);
	})
    	
	var tab = Ti.UI.createButton({
		title: 'Resources',
		bottom: 10,
		left: 150
	});
	mainNavWindow.add(tab);
	
	var view2 = Ti.UI.createView({ backgroundColor:'#246' });
	var label = Ti.UI.createLabel({text: 'View 2'});
	view2.add(label);
	
	var scrollableView = Ti.UI.createScrollableView({
	  views:[iconsContainer,view2],
	  showPagingControl: true,
	  top: 220,
	  height: 150
	});
	
	tab.addEventListener('click', function(){
		scrollableView.scrollToView(view2);
	});
	
	mainNavWindow.add(scrollableView);
    mainNavWindow.add(announcements);
    
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
