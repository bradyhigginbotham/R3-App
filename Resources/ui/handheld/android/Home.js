//Home Window Component Constructor
function HomeWindow() {
	//load component dependencies
	var MainView = require('ui/common/MainView'), navGroup = undefined;
	
	// constants
<<<<<<< HEAD
	var iconHeight = 50, iconWidth = 100, iconTop = 10, iconLeft = 10;
=======
	var iconHeight = 50, iconWidth = 90, iconTop = 10, iconLeft = 10,
		tabColor = 'white', tabHeight = 70, tabWidth = '50%';
>>>>>>> 02651f472334519059ec8626cd080c39033d5b63
		
	//create component instance
	var self = Ti.UI.createWindow();
	var mainNavWindow = Ti.UI.createWindow({
<<<<<<< HEAD
		backgroundImage:'images/home_frame.png',
=======
		backgroundImage:'images/main.png',
>>>>>>> 02651f472334519059ec8626cd080c39033d5b63
		title: 'Home',
		navBarHidden: true
	});

<<<<<<< HEAD
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
		text: 'Announcements - Android',
=======
	// Announcements view
	var announcementRow = Ti.UI.createTableViewRow({
		backgroundColor: 'transparent',
		hasChild: true,
		height: 70
	});
	
	var header = Ti.UI.createLabel({
		text: 'Announcements',
>>>>>>> 02651f472334519059ec8626cd080c39033d5b63
		color: '#7C0606',
		font: {fontSize: 24, fontWeight: 'bold'},
		top: 5,
		left: 10,
<<<<<<< HEAD
		height: 25
	});
	var subtitle = Ti.UI.createLabel({
		text: 'LATEST: Most recent announcement.',
		color: '#6A737D',
		font: {fontSize: 12},
		top: 25,
=======
		height: 30
	});
	var subtitle = Ti.UI.createLabel({
		text: 'LATEST - Android: Most recent announcement.',
		color: '#6A737D',
		font: {fontSize: 12},
		top: 30,
>>>>>>> 02651f472334519059ec8626cd080c39033d5b63
		left: 10,
		height: 25
	});
	announcementRow.add(header);
	announcementRow.add(subtitle);
	
	var announcements = Ti.UI.createTableView({
<<<<<<< HEAD
		top: 150,
		height: 60,
=======
		backgroundColor: 'transparent',
		top: '130dp',
		height: '70dp',
>>>>>>> 02651f472334519059ec8626cd080c39033d5b63
		className: 'announcements'
	});
	announcements.appendRow(announcementRow);

	/*---- Home Icons ----*/
<<<<<<< HEAD
	var iconsContainer = Ti.UI.createView({
		backgroundColor: '#E5EAEF',
=======
	var eventIcons = Ti.UI.createView({
		backgroundImage: 'NONE',
>>>>>>> 02651f472334519059ec8626cd080c39033d5b63
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
<<<<<<< HEAD
	iconsContainer.add(collegesButton);
=======
	eventIcons.add(collegesButton);
>>>>>>> 02651f472334519059ec8626cd080c39033d5b63
	
	var schedulesButton = Ti.UI.createButton({
		title: "Schedule",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	})
<<<<<<< HEAD
	iconsContainer.add(schedulesButton);
=======
	eventIcons.add(schedulesButton);
>>>>>>> 02651f472334519059ec8626cd080c39033d5b63
	
	var mapsButton = Ti.UI.createButton({
		title: "Maps",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	})
<<<<<<< HEAD
	iconsContainer.add(mapsButton);
	
	var presentationsButton = Ti.UI.createButton({
		title: "Presentations",
=======
	eventIcons.add(mapsButton);
	
	var presentationsButton = Ti.UI.createButton({
		title: "Sessions",
>>>>>>> 02651f472334519059ec8626cd080c39033d5b63
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	})
<<<<<<< HEAD
	iconsContainer.add(presentationsButton);
=======
	eventIcons.add(presentationsButton);
>>>>>>> 02651f472334519059ec8626cd080c39033d5b63
	
	var competitionsButton = Ti.UI.createButton({
		title: "Competitions",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	})
<<<<<<< HEAD
	iconsContainer.add(competitionsButton);
=======
	eventIcons.add(competitionsButton);
>>>>>>> 02651f472334519059ec8626cd080c39033d5b63
	
	var certificationsButton = Ti.UI.createButton({
		title: "Certifications",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	})
<<<<<<< HEAD
	iconsContainer.add(certificationsButton);
=======
	eventIcons.add(certificationsButton);
>>>>>>> 02651f472334519059ec8626cd080c39033d5b63
	
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
    	
<<<<<<< HEAD
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
	  showPagingControl: false,
	  top: 220,
	  height: 150
	});
	
	tab.addEventListener('click', function(){
		scrollableView.scrollToView(view2);
	});
	
	mainNavWindow.add(scrollableView);
=======
    	// tabs
	var eventsTab = Ti.UI.createButton({
		backgroundImage: 'NONE',
		color: tabColor,
		title: 'Events',
		bottom: 0,
		left: 0,
		height: tabHeight,
		width: tabWidth
	});
	mainNavWindow.add(eventsTab);
	
	var resourcesTab = Ti.UI.createButton({
		backgroundImage: 'NONE',
		color: tabColor,
		title: 'Resources',
		bottom: 0,
		right: 0,
		height: 70,
		height: tabHeight,
		width: tabWidth
	});
	mainNavWindow.add(resourcesTab);
	
	var resourceIcons = Ti.UI.createView({ backgroundImage:'NONE' });
	var label = Ti.UI.createLabel({text: 'Resources'});
	resourceIcons.add(label);
	
	var scrollableView = Ti.UI.createScrollableView({
	  views:[eventIcons,resourceIcons],
	  showPagingControl: false,
	  bottom: '75dp',
	  height: '150dp'
	});
	mainNavWindow.add(scrollableView);
	
	// tab event listeners
	eventsTab.addEventListener('click', function(){
		scrollableView.scrollToView(eventIcons);
	});
	
	resourcesTab.addEventListener('click', function(){
		scrollableView.scrollToView(resourceIcons);
	});
	
>>>>>>> 02651f472334519059ec8626cd080c39033d5b63
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
