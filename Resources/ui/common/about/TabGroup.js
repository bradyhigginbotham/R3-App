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
		title: 'R3 App',
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
		title: 'Contact',
		icon: '/icons/tabs/phone.png',
		window: contactWindow
	});
	contactWindow.parentTab = contactTab;
	
	var ullTab = Ti.UI.createTab({
		title: 'UL @ Lafayette',
		icon: '/icons/tabs/ull.png',
		window: ullWindow
	});
	UllWindow.parentTab = ullTab;
	
	self.addTab(appTab);
	self.addTab(conferenceTab);
	self.addTab(contactTab);
	self.addTab(ullTab);
		
	self.addEventListener('close', function(){		
		self.removeTab(appTab);
		self.removeTab(conferenceTab);
		self.removeTab(contactTab);
		self.removeTab(ullTab);

		appTab.window = null;
		conferenceTab.window = null;
		contactTab.window = null;
		ullTab.window = null;
	});
	
	return self;
};

module.exports = TabGroup;