function TabGroup(navGroup){
	var ConferenceWindow = require('ui/common/twitter/conference/ConferenceWindow'),
		HashtagsWindow = require('ui/common/twitter/hashtags/HashtagsWindow'),
		osname = Ti.Platform.osname, height = Ti.Platform.displayCaps.platformHeight;
		
	
	var conferenceWindow = new ConferenceWindow(navGroup, osname, height),
		hashtagsWindow = new HashtagsWindow(navGroup, osname, height);
		
		
	var self = Ti.UI.createTabGroup();
	
	var conferenceTab = Ti.UI.createTab({
		title: 'Conference Feed',
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
	
	function removeAll(){
		// remove all tabs
		self.removeTab(conferenceTab);
		self.removeTab(hashtagsTab);

		navGroup.close(self);

		// empty out proxy properties
		conferenceWindow.parentTab = null;
		hashtagsWindow.parentTab = null;

		conferenceTab.window = null;
		hashtagsTab.window = null;
				
		// null out tabs	
		conferenceTab = null;
		hashtagsTab = null;
		
		// null out windows
		conferenceWindow = null;
		hashtagsWindow = null;
	};
	
	Ti.App.addEventListener('closeTwitter', removeAll);
	
	self.addEventListener('close', function(){
		Ti.App.removeEventListener('closeTwitter', removeAll);
	});
	
	return self;
};

module.exports = TabGroup;