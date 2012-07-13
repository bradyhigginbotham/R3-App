function TabGroup(navGroup){
	var ExhibitorsWindow = require('ui/common/jobfair/exhibitors/ExhibitorsWindow'),
		SponsorsWindow = require('ui/common/jobfair/sponsors/SponsorsWindow');
	
	var exhibitorsWindow = new ExhibitorsWindow(navGroup),
		sponsorssWindow = new SponsorsWindow(navGroup);

	var self = Ti.UI.createTabGroup();
	
	var speakersTab = Ti.UI.createTab({
		title: 'Exhibitors',
		icon: 'KS_nav_ui.png',
		window: exhibitorsWindow
	});
	speakersWindow.parentTab = exhibitorsTab;
	
	var sessionsTab = Ti.UI.createTab({
		title: 'Sponsors',
		icon: 'KS_nav_views.png',
		window: sponsorsWindow
	});
	sessionsWindow.parentTab = sponsorsTab;
	
	self.addTab(exhibitorsTab);
	self.addTab(sponsorsTab);
		
	return self;
};
module.exports = TabGroup;