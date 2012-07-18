function TabGroup(navGroup){
	var SpeakersWindow = require('ui/common/presentations/speakers/SpeakersWindow'),
		SessionsWindow = require('ui/common/presentations/sessions/SessionsWindow');
	
	var speakersWindow = new SpeakersWindow(navGroup),
		sessionsWindow = new SessionsWindow(navGroup);

	var self = Ti.UI.createTabGroup();
	
	var speakersTab = Ti.UI.createTab({
		title: 'Speakers',
		icon: 'KS_nav_ui.png',
		window: speakersWindow
	});
	speakersWindow.parentTab = speakersTab;
	
	var sessionsTab = Ti.UI.createTab({
		title: 'Sessions',
		icon: 'KS_nav_views.png',
		window: sessionsWindow
	});
	sessionsWindow.parentTab = sessionsTab;
	
	self.addTab(speakersTab);
	self.addTab(sessionsTab);
		
	return self;
};
module.exports = TabGroup;