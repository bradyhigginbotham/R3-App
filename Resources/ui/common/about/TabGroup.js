//About Window Component Constructor
function TabGroup(navGroup) // changed from 'AboutWindow' to 'TabGroup'
{
	var AppWindow = require('ui/common/about/app/AppWindow'),
		ConferenceWindow = require('ui/common/about/conference/ConferenceWindow'),
		ContactWindow = require('ui/common/about/contact/ContactWindow'),
		UllWindow = require('ui/common/about/ull/UllWindow');
		
	var appWindow = new AppWindow(navGroup),
		conferenceWindow = new ConferenceWindow(navGroup),
		contactWindow = new ContactWindow(navGroup),
		ullWindow = new UllWindow(navGroup);
		
	var self = Ti.UI.createTabGroup();
	
	var appTab = Ti.UI.createTab({
		title: 'App',
		icon: '/icons/tabs/info.png',
		window: appWindow
	});
	appWindow.parentTab = appTab;
	
	var conferenceTab = Ti.UI.createTab({
		title: 'Conference',
		icon: '/icons/tabs/star.png',
		window: conferenceWindow
	});
	conferenceWindow.parentTab = conferenceTab;
	
	var contactTab = Ti.UI.createTab({
		title: 'Contacts',
		icon: 'KS_nav_ui.png',
		window: contactWindow
	});
	contactWindow.parentTab = contactTab;
	
	var ullTab = Ti.UI.createTab({
		title: 'UL @ Lafayette',
		icon: 'KS_nav_ui.png',
		window: ullWindow
	});
	UllWindow.parentTab = ullTab;
	
	self.addTab(appTab);
	self.addTab(conferenceTab);
	self.addTab(contactTab);
	self.addTab(ullTab);
	
	function removeAll(){
		// remove all tabs
		self.removeTab(appTab);
		self.removeTab(conferenceTab);
		self.removeTab(contactTab);
		self.removeTab(ullTab);
		
		navGroup.close(self);

		// empty out proxy properties
		appWindow.parentTab = null;
		conferenceWindow.parentTab = null;
		contactWindow.parentTab = null;
		ullWindow.parentTab = null;
		
		appTab.window = null;
		conferenceTab.window = null;
		contactTab.window = null;
		ullTab.window = null;
				
		// null out tabs	
		appTab = null;
		conferenceTab = null;
		contactTab = null;
		ullTab = null;
		
		// null out windows
		appWindow = null;
		conferenceWindow = null;
		contactWindow = null;
		ullWindow = null;
	};
	
	Ti.App.addEventListener('closeAbout', removeAll);
	
	self.addEventListener('close', function(){
		Ti.App.removeEventListener('closeAbout', removeAll);
	});
	
	return self;
};

module.exports = TabGroup;