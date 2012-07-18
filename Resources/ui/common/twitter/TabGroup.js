function TabGroup(navGroup)
{
	var ConferenceWindow = require('ui/common/twitter/conference/ConferenceWindow'),
		HashtagsWindow = require('ui/common/twitter/hashtags/HashtagsWindow');
		
	
	var conferenceWindow = new ConferenceWindow(navGroup),
		hashtagsWindow = new HashtagsWindow(navGroup);
		
		
	var self = Ti.UI.createTabGroup();
	
	var conferenceTab = Ti.UI.createTab({
		title: 'Conference Feeds',
		icon: 'KS_nav_ui.png',
		window: conferenceWindow
	});
	conferenceWindow.parentTab = conferenceTab;
	
	var hashtagsTab = Ti.UI.createTab({
		title: '#R3AITP',
		icon: 'KS_nav_ui.png',
		window: hashtagsWindow
	});
	hashtagsWindow.parentTab = hashtagsTab;
	
	self.addTab(conferenceTab);
	self.addTab(hashtagsTab);
	
	return self;
};

module.exports = TabGroup;