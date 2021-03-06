//Home Window Component Constructor - iPhone
function HomeWindow(osname) {
	//load component dependencies
	var navGroup = undefined;
	
	// constants
	var iconHeight = 74, iconWidth = 64, iconTop = 5, iconLeft = 10, middleLeft = 50,
		tabColor = 'white', tabSelectedColor = '#A5B5C4', tabActiveColor = '#79FAFB', tabHeight = 70, tabWidth = 160;
		
	//create component instance
	var self = Ti.UI.createWindow();
	var mainNavWindow = Ti.UI.createWindow({
		backgroundImage:'images/main.png',
		title: 'Home',
		navBarHidden: true
	});

	// Announcements view
	var db = Titanium.Database.open('r3.sqlite');
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
		top: 121,
		height: 72,
		className: 'announcements'
	});
	announcements.appendRow(announcementRow);
	
	announcements.addEventListener('click', function(){
		var AnnouncementsWindow = require('ui/common/announcements/AnnouncementsWindow');
		var announcementsWindow = new AnnouncementsWindow(navGroup, osname);
		navGroup.open(announcementsWindow, {animated:true});
	});
	
	// close database
	resultSet.close();
	db.close();

	/*---- Icon Views ----*/
	var eventIcons = Ti.UI.createView({
		backgroundImage: 'NONE',
		top: 0,
		height: 172,
		layout: 'horizontal'
	});
	
	var resourceIcons = Ti.UI.createView({
		backgroundImage: 'NONE',
		top: 0,
		height: 172,
		layout: 'horizontal'
	});	

	/*---- Event Icons ----*/
	var schedulesIcon = Ti.UI.createButton({
		backgroundImage: "/icons/home/schedule.png",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	eventIcons.add(schedulesIcon);
	
	var presentationsIcon = Ti.UI.createButton({
		backgroundImage: "/icons/home/sessions.png",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: middleLeft
	});
	eventIcons.add(presentationsIcon);
	
	var competitionsIcon = Ti.UI.createButton({
		backgroundImage: "/icons/home/competitions.png",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: middleLeft
	});
	eventIcons.add(competitionsIcon);
	
/*	var certificationsIcon = Ti.UI.createButton({
		backgroundImage: "/icons/home/certifications.png",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	eventIcons.add(certificationsIcon);
*/
	
	var jobFairIcon = Ti.UI.createButton({
		backgroundImage: "/icons/home/briefcase.png",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	eventIcons.add(jobFairIcon);
	
	var festivalIcon = Ti.UI.createButton({
		backgroundImage: "/icons/home/festival.png",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: middleLeft
	});
	eventIcons.add(festivalIcon);
	
	// get stored 'subscribed' property
	var db = Titanium.Database.open('r3.sqlite');
	var user = db.execute("SELECT * FROM user WHERE username = 'default'");
	var subscribed = user.fieldByName('subscribed');
	user.close();
	db.close();
	
	var subscribeIcon = Ti.UI.createButton({
		backgroundImage: (subscribed) ? '/icons/home/unsubscribe.png' : '/icons/home/subscribe.png',
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: middleLeft
	});
	eventIcons.add(subscribeIcon);
	
	/*---- Resource Icons ----*/
	var mapsIcon = Ti.UI.createButton({
		backgroundImage: '/icons/home/maps.png',
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	resourceIcons.add(mapsIcon);
	
	var photosIcon = Ti.UI.createButton({
		backgroundImage: '/icons/home/camera.png',
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: middleLeft
	});
	resourceIcons.add(photosIcon);
	
	var twitterIcon = Ti.UI.createButton({
		backgroundImage: '/icons/home/twitter.png',
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: middleLeft
	});
	resourceIcons.add(twitterIcon);
	
	var collegesIcon = Ti.UI.createButton({
		backgroundImage: '/icons/home/colleges.png',
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	resourceIcons.add(collegesIcon);
	
	var aboutIcon = Ti.UI.createButton({
		backgroundImage: '/icons/home/about.png',
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: middleLeft
	})
	resourceIcons.add(aboutIcon);
	
	var facebookIcon = Ti.UI.createButton({
		backgroundImage: '/icons/home/facebook.png',
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: middleLeft
	});
	resourceIcons.add(facebookIcon);
	
	/*---- Icon EventListeners ----*/
	collegesIcon.addEventListener('click', function(){
		var CollegesWindow = require('ui/common/colleges/CollegesWindow');
		var collegesWindow = new CollegesWindow(navGroup);
		navGroup.open(collegesWindow, {animated:true});
	});
	schedulesIcon.addEventListener('click', function(){
		var SchedulesWindow = require('ui/common/schedules/SchedulesWindow');
		var schedulesWindow = new SchedulesWindow(navGroup);
		navGroup.open(schedulesWindow, {animated:true});
	});
	mapsIcon.addEventListener('click', function(){
		var TabGroup = require('ui/common/maps/TabGroup');
		var tabGroup = new TabGroup(navGroup);
		navGroup.open(tabGroup);
	});
	presentationsIcon.addEventListener('click', function(){
		var TabGroup = require('ui/common/presentations/TabGroup');
		var tabGroup = new TabGroup(navGroup);
		navGroup.open(tabGroup);
	});
	
	competitionsIcon.addEventListener('click', function(){
		var CompetitionsWindow = require('ui/common/competitions/CompetitionsWindow');
		var competitionsWindow = new CompetitionsWindow(navGroup);
		navGroup.open(competitionsWindow);
	});	
/*	certificationsIcon.addEventListener('click', function(){
		var CertificationsWindow = require('ui/common/certifications/CertificationsWindow');
		var certificationsWindow = new CertificationsWindow(navGroup);
		navGroup.open(certificationsWindow);
	}); */
	photosIcon.addEventListener('click', function(){
		var PhotosWindow = require('ui/common/photos/iphone/PhotosWindow');
		var photosWindow = new PhotosWindow();
		navGroup.open(photosWindow, {animated:true});
	});
	aboutIcon.addEventListener('click', function(){
		var TabGroup = require('ui/common/about/TabGroup');
		var tabGroup = new TabGroup(navGroup);
		navGroup.open(tabGroup);
	});
	jobFairIcon.addEventListener('click', function(){
		var TabGroup = require('ui/common/jobfair/TabGroup');
		var tabGroup = new TabGroup(navGroup);
		navGroup.open(tabGroup);
	});
	festivalIcon.addEventListener('click', function(){
		if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
			alert("The webpage could not be loaded. Please check your network or data connection.");
		} else {
			var festivalPage = Ti.UI.createWebView({url: 'http://www.festivalsacadiens.com/index1.html'});
			var festivalWindow = Ti.UI.createWindow({
				title: 'Festival Acadiens 2012',
				navBarHidden: false
			});
			festivalWindow.add(festivalPage);
			navGroup.open(festivalWindow);
		}
	});
	twitterIcon.addEventListener('click', function(){
		var TabGroup = require('ui/common/twitter/TabGroup');
		var tabGroup = new TabGroup(navGroup);
		navGroup.open(tabGroup);   	
	});
	subscribeIcon.addEventListener('click', function(){
		var Notifications = require('notifications');
		
		// get stored 'subscribed' property
		var db = Titanium.Database.open('r3.sqlite');
		var user = db.execute("SELECT * FROM user WHERE username = 'default'");
		var subscribed = user.fieldByName('subscribed');
		db.close();

		// check if subscribed
		if (subscribed){
			Notifications.unsubscribeToNotifications(subscribeIcon);
		} else {
			Notifications.subscribeToNotifications(subscribeIcon, subtitle);
		}
	});
	facebookIcon.addEventListener('click', function(){
		if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
			alert("The webpage could not be loaded. Please check your network or data connection.");
		} else {
			var facebookPage = Ti.UI.createWebView({url: 'https://www.facebook.com/AITPRegion3StudentConference'});
			var facebookWindow = Ti.UI.createWindow({
				title: 'R3 Facebook Page',
				navBarHidden: false
			});
			facebookWindow.add(facebookPage);
			navGroup.open(facebookWindow);
		}
	});
    	
    // tabs
	var eventsTab = Ti.UI.createButton({
		backgroundImage: 'NONE',
		color: tabColor,
		selectedColor: tabSelectedColor,
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
		selectedColor: tabSelectedColor,
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
		showPagingControl: true,
		pagingControlHeight: 18,
		pagingControlColor: 'transparent',
		bottom: 70,
		height: 172
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
    
    // handle iPhone navigation
	navGroup = Ti.UI.iPhone.createNavigationGroup({
		window: mainNavWindow
	});
	self.add(navGroup);

	// update database when app resumes
	var dbSync = function(){
		var Update = require('db/update');
		Update.syncLocalDatabase();
	};
	Ti.App.addEventListener('resumed', dbSync);
	
	self.addEventListener('close', function(){
		Ti.App.removeEventListener('resumed', dbSync);
	});
	
	self.addEventListener('open', dbSync);

	return self;

}

//make constructor function the public component interface
module.exports = HomeWindow;