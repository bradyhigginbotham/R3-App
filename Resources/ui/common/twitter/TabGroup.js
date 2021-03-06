function TabGroup(navGroup){
	var ConferenceWindow = require('ui/common/twitter/conference/ConferenceWindow'),
		HashtagsWindow = require('ui/common/twitter/hashtags/HashtagsWindow'),
		osname = Ti.Platform.osname, height = Ti.Platform.displayCaps.platformHeight;
		
	
	var conferenceWindow = new ConferenceWindow(navGroup, osname, height),
		hashtagsWindow = new HashtagsWindow(navGroup, osname, height);
		
		
	var self = Ti.UI.createTabGroup();
	
	var conferenceTab = Ti.UI.createTab({
		title: 'Conference Feed',
		icon: 'icons/tabs/at_twitter.png',
		window: conferenceWindow
	});
	conferenceWindow.parentTab = conferenceTab;

	var hashtagsTab = Ti.UI.createTab({
		title: '#R3AITP',
		icon: 'icons/tabs/hashtag_twitter.png',
		window: hashtagsWindow
	});
	hashtagsWindow.parentTab = hashtagsTab;
	
	self.addTab(conferenceTab);
	self.addTab(hashtagsTab);	
	
	self.addEventListener('close', function(){		
		self.removeTab(conferenceTab);
		self.removeTab(hashtagsTab);

		conferenceTab.window = null;
		hashtagsTab.window = null;
	});
	
	return self;
};

module.exports = TabGroup;