function TabGroup(navGroup){
	var ExhibitorsWindow = require('ui/common/jobfair/exhibitors/ExhibitorsWindow'),
		SponsorsWindow = require('ui/common/jobfair/sponsors/SponsorsWindow');
	
	var exhibitorsWindow = new ExhibitorsWindow(navGroup),
		sponsorsWindow = new SponsorsWindow(navGroup);

	var self = Ti.UI.createTabGroup();
	
	var exhibitorsTab = Ti.UI.createTab({
		title: 'Exhibitors',
		icon: '/icons/tabs/suitcase.png',
		window: exhibitorsWindow
	});
	exhibitorsWindow.parentTab = exhibitorsTab;
	
	var sponsorsTab = Ti.UI.createTab({
		title: 'Sponsors',
		icon: '/icons/tabs/heart.png',
		window: sponsorsWindow
	});
	sponsorsWindow.parentTab = sponsorsTab;
	
	self.addTab(exhibitorsTab);
	self.addTab(sponsorsTab);
		
	return self;
};
module.exports = TabGroup;