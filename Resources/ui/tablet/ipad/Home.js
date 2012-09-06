//Home Window Component Constructor - iPhone
function HomeWindow(osname) {
	//load component dependencies
	var navGroup = undefined;
	
	// constants
	var iconHeight = 122, iconWidth = 106, iconTop = 30, iconLeft = 50, middleLeft = 170,
		tabColor = 'white', tabHeight = 155, tabWidth = '50%';
		
	//create component instance
	var self = Ti.UI.createWindow();
	var mainNavWindow = Ti.UI.createWindow({
		backgroundImage:'images/main.png',
		title: 'Home',
		navBarHidden: true
	});

	// Announcements view
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');
    var resultSet = db.execute('SELECT * FROM announcements ORDER BY id DESC LIMIT 1');
	
	var announcementRow = Ti.UI.createTableViewRow({
		backgroundColor: 'transparent',
		hasChild: true,
		height: 153
	});
	
	var header = Ti.UI.createLabel({
		text: 'Announcements',
		color: '#7C0606',
		font: {fontSize: 42, fontWeight: 'bold'},
		top: 10,
		left: 30,
		height: 90
	});
	var subtitle = Ti.UI.createLabel({
		text: 'LATEST: ' + resultSet.fieldByName('announcement'),
		color: '#6A737D',
		font: {fontSize: 24},
		top: 60,
		left: 30,
		height: 70
	});
	announcementRow.add(header);
	announcementRow.add(subtitle);
	
	var announcements = Ti.UI.createTableView({
		backgroundColor: 'transparent',
		separatorColor: 'transparent',
		top: 264,
		height: 153,
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
		backgroundImage: 'NONE',
		top: 0,
		height: 370,
		layout: 'horizontal'
	});
	
	var resourceIcons = Ti.UI.createView({
		backgroundImage: 'NONE',
		top: 0,
		height: 370,
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
	var user = db.execute("SELECT * FROM user WHERE username = 'default'");
	var subscribed = user.fieldByName('subscribed');
	
	var subscribeIcon = Ti.UI.createButton({
		backgroundImage: '/icons/home/subscribe.png',
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
		tabGroup = null;
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
		var PhotosWindow = require('ui/common/photos/PhotosWindow');
		var photosWindow = new PhotosWindow();
		navGroup.open(photosWindow, {animated:true});
	});
	aboutIcon.addEventListener('click', function(){
		var TabGroup = require('ui/common/about/TabGroup');
		var tabGroup = new TabGroup(navGroup);
		navGroup.open(tabGroup);
		tabGroup = null;
	});
	jobFairIcon.addEventListener('click', function(){
		var TabGroup = require('ui/common/jobfair/TabGroup');
		var tabGroup = new TabGroup(navGroup);
		navGroup.open(tabGroup);
	});
	festivalIcon.addEventListener('click', function(){
		var festivalPage = Ti.UI.createWebView({url: 'http://www.festivalsacadiens.com/index1.html'});
		var festivalWindow = Ti.UI.createWindow({
			title: 'Festival Acadiens 2012',
			navBarHidden: false
		});
		festivalWindow.add(festivalPage);
		navGroup.open(festivalWindow);
	});
	twitterIcon.addEventListener('click', function(){
		var TabGroup = require('ui/common/twitter/TabGroup');
		var tabGroup = new TabGroup(navGroup);
		navGroup.open(tabGroup);   	
	});
	subscribeIcon.addEventListener('click', function(){
		var Notifications = require('notifications');
		
		// get stored 'subscribed' property
		var user = db.execute("SELECT * FROM user WHERE username = 'default'");
		var subscribed = user.fieldByName('subscribed');

		// check if subscribed
		if (subscribed){
			Notifications.unsubscribeToNotifications(subscribeIcon);
		} else {
			Notifications.subscribeToNotifications(subscribeIcon);
		}
	});
	facebookIcon.addEventListener('click', function(){
		var facebookPage = Ti.UI.createWebView({url: 'https://www.facebook.com/AITPRegion3StudentConference'});
		var facebookWindow = Ti.UI.createWindow({
			title: 'R3 Facebook',
			navBarHidden: false
		});
		facebookWindow.add(facebookPage);
		navGroup.open(facebookWindow);
	});
    	
    // tabs
	var eventsTab = Ti.UI.createButton({
		backgroundImage: 'NONE',
		color: tabColor,
		title: 'Events',
		bottom: 0,
		left: 0,
		height: tabHeight,
		width: tabWidth,
		font: {fontSize: 36}
	});
	mainNavWindow.add(eventsTab);
	
	var resourcesTab = Ti.UI.createButton({
		backgroundImage: 'NONE',
		color: tabColor,
		title: 'Resources',
		bottom: 0,
		right: 0,
		height: tabHeight,
		width: tabWidth,
		font: {fontSize: 36}
	});
	mainNavWindow.add(resourcesTab);
	
	var scrollableView = Ti.UI.createScrollableView({
		views:[eventIcons,resourceIcons],
		showPagingControl: true,
		pagingControlHeight: 70,
		pagingControlColor: 'transparent',
		bottom: 155,
		height: 370
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

	return self;

}

//make constructor function the public component interface
module.exports = HomeWindow;
