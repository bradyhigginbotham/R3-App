//Home Window Component Constructor
function HomeWindow() {
	//load component dependencies
	var MainView = require('ui/common/MainView'), navGroup = undefined;
	
	// constants
	var iconHeight = 50, iconWidth = 90, iconTop = 10, iconLeft = 10,
		tabColor = 'white', tabHeight = 70, tabWidth = 160;
		
	//create component instance
	var self = Ti.UI.createWindow();
	var mainNavWindow = Ti.UI.createWindow({
		backgroundImage:'images/main.png',
		title: 'Home',
		navBarHidden: true
	});

	// Announcements view
	//var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');
    //var resultSet = db.execute('SELECT * FROM announcements LIMIT 1 ORDER BY id DESC');

	var announcementRow = Ti.UI.createTableViewRow({
		backgroundColor: 'transparent',
		hasChild: true,
		height: 72
	});
	
	var header = Ti.UI.createLabel({
		text: 'Announcements',
		color: '#7C0606',
		font: {fontSize: 24, fontWeight: 'bold'},
		top: 10,
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
		backgroundColor: 'transparent',
		separatorColor: 'transparent',
		top: 145,
		height: 72,
		className: 'announcements'
	});
	announcements.appendRow(announcementRow);

	/*---- Home Icons ----*/
	var eventIcons = Ti.UI.createView({
		backgroundImage: 'NONE',
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
	eventIcons.add(collegesButton);
	
	var schedulesButton = Ti.UI.createButton({
		title: "Schedule",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	})
	eventIcons.add(schedulesButton);
	
	var mapsButton = Ti.UI.createButton({
		title: "Maps",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	})
	eventIcons.add(mapsButton);
	
	var presentationsButton = Ti.UI.createButton({
		title: "Sessions",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	})
	eventIcons.add(presentationsButton);
	
	var competitionsButton = Ti.UI.createButton({
		title: "Competitions",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	})
	eventIcons.add(competitionsButton);
	
	var certificationsButton = Ti.UI.createButton({
		title: "Certifications",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	})
	eventIcons.add(certificationsButton);
	
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
	  showPagingControl: true,
	  pagingControlColor: '#E5EAEF',
	  bottom: 70,
	  height: 150
	});
	
	// tab event listeners
	eventsTab.addEventListener('click', function(){
		scrollableView.scrollToView(eventIcons);
	});
	
	resourcesTab.addEventListener('click', function(){
		scrollableView.scrollToView(resourceIcons);
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
