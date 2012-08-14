//Home Window Component Constructor
function HomeWindow() {
	//load component dependencies
	var MainView = require('ui/common/MainView'), navGroup = undefined;
	
	// constants
	var iconHeight = 64, iconWidth = 64, iconTop = 10, iconLeft = 10, middleLeft = 50,
		tabColor = 'white', tabHeight = 70, tabWidth = 160;
		
	//create component instance
	var self = Ti.UI.createWindow();
	var mainNavWindow = Ti.UI.createWindow({
		backgroundImage:'images/main_updated.png',
		title: 'Home',
		navBarHidden: true
	});

	// Announcements view
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');
    var resultSet = db.execute('SELECT * FROM announcements ORDER BY id DESC LIMIT 1');
	
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
		text: 'LATEST: ' + resultSet.fieldByName('announcement'),
		color: '#6A737D',
		font: {fontSize: 12},
		top: 28,
		left: 10,
		height: 40
	});
	announcementRow.add(header);
	announcementRow.add(subtitle);
	
	var announcements = Ti.UI.createTableView({
		backgroundColor: 'transparent',
		separatorColor: 'transparent',
		top: 137,
		height: 72,
		className: 'announcements'
	});
	announcements.appendRow(announcementRow);
	
	announcements.addEventListener('click', function(){
		var AnnouncementsWindow = require('ui/common/announcements/AnnouncementsWindow');
		var announcementsWindow = new AnnouncementsWindow(navGroup);
		navGroup.open(announcementsWindow, {animated:true});
	});

	/*---- Icon Views ----*/
	var eventIcons = Ti.UI.createView({
		//backgroundImage: 'NONE',
		backgroundColor: 'red',
		top: 0,
		height: 156,
		layout: 'horizontal'
	});
	
	var resourceIcons = Ti.UI.createView({
		backgroundImage: 'NONE',
		top: 0,
		height: 156,
		layout: 'horizontal'
	});	

	/*---- Event Icons ----*/
	var schedulesIcon = Ti.UI.createButton({
		title: "Schedule",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	eventIcons.add(schedulesIcon);
	
	var presentationsIcon = Ti.UI.createButton({
		title: "Sessions",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	eventIcons.add(presentationsIcon);
	
	var competitionsIcon = Ti.UI.createButton({
		title: "Contests",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	eventIcons.add(competitionsIcon);
	
	var certificationsIcon = Ti.UI.createButton({
		title: "Certs",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	eventIcons.add(certificationsIcon);
	
	var jobFairIcon = Ti.UI.createButton({
		title: "Job Fair",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	eventIcons.add(jobFairIcon);
	
	var festivalIcon = Ti.UI.createButton({
		title: "Festival",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	eventIcons.add(festivalIcon);
	
	/*---- Resource Icons ----*/
	var mapsIcon = Ti.UI.createButton({
		backgroundImage: '/icons/maps_64.png',
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	resourceIcons.add(mapsIcon);
	
	var photosIcon = Ti.UI.createButton({
		backgroundImage: '/icons/photos_64.png',
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: middleLeft
	});
	resourceIcons.add(photosIcon);
	
	var facebookIcon = Ti.UI.createButton({
		backgroundImage: '/icons/facebook_round_64.png',
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: middleLeft
	});
	resourceIcons.add(facebookIcon);
	
	var collegesIcon = Ti.UI.createButton({
		backgroundImage: '/icons/colleges_64.png',
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	resourceIcons.add(collegesIcon);
	
	var aboutIcon = Ti.UI.createButton({
		title: 'About',
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: middleLeft
	})
	resourceIcons.add(aboutIcon);
	
	var twitterIcon = Ti.UI.createButton({
		backgroundImage: '/icons/twitter_round_64.png',
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: middleLeft
	});
	resourceIcons.add(twitterIcon);
	
	/*---- Icon EventListeners ----*/
	collegesIcon.addEventListener('click', function(e){
		var CollegesWindow = require('ui/common/colleges/CollegesWindow');
		var collegesWindow = new CollegesWindow(navGroup);
		navGroup.open(collegesWindow, {animated:true});
	});
	
	schedulesIcon.addEventListener('click', function(e){
		var SchedulesWindow = require('ui/common/schedules/SchedulesWindow');
		var schedulesWindow = new SchedulesWindow(navGroup);
		navGroup.open(schedulesWindow, {animated:true});
	});
	
	mapsIcon.addEventListener('click', function(e){
<<<<<<< HEAD
		var MapsWindow = require('ui/common/maps/TabGroup');
		var mapsWindow = new MapsWindow();
		navGroup.open(mapsWindow, {animated:true});
=======
		var TabGroup = require('ui/common/maps/TabGroup');
		var tabGroup = new TabGroup();
		navGroup.open(tabGroup, {animated:true});
>>>>>>> ef231390aa5ae323624b580a4b2d9fbd94d3dae0
	});
	
	presentationsIcon.addEventListener('click', function(e){
		var TabGroup = require('ui/common/presentations/TabGroup');
		var tabGroup = new TabGroup(navGroup);
		navGroup.open(tabGroup);
	});
	
	competitionsIcon.addEventListener('click', function(e){
		var CompetitionsWindow = require('ui/common/competitions/CompetitionsWindow');
		var competitionsWindow = new CompetitionsWindow(navGroup);
		navGroup.open(competitionsWindow);
	});	
	certificationsIcon.addEventListener('click', function(e){
		var CertificationsWindow = require('ui/common/certifications/CertificationsWindow');
		var certificationsWindow = new CertificationsWindow(navGroup);
		navGroup.open(certificationsWindow);
	});
	photosIcon.addEventListener('click', function(e){
		var PhotosWindow = require('ui/common/photos/PhotosWindow');
		var photosWindow = new PhotosWindow();
		navGroup.open(photosWindow, {animated:true});
	});
	aboutIcon.addEventListener('click', function(e){
		var TabGroup = require('ui/common/about/TabGroup');
		var tabGroup = new TabGroup(navGroup);
		navGroup.open(tabGroup);
		tabGroup = null;
	});
	jobFairIcon.addEventListener('click', function(e){
		var TabGroup = require('ui/common/jobfair/TabGroup');
		var tabGroup = new TabGroup(navGroup);
		navGroup.open(tabGroup);
	});
	twitterIcon.addEventListener('click', function(e){
		var TabGroup = require('ui/common/twitter/TabGroup');
		var tabGroup = new TabGroup(navGroup);
		navGroup.open(tabGroup);   	
	});
    	
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
	
	var scrollableView = Ti.UI.createScrollableView({
		views:[eventIcons,resourceIcons],
		showPagingControl: false,
		pagingControlColor: '#E5EAEF',
		bottom: 70,
		height: 156
	});
	
	// tab event listeners
	eventsTab.addEventListener('click', function(){
		scrollableView.scrollToView(eventIcons);
	});
	
	resourcesTab.addEventListener('click', function(e){
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
