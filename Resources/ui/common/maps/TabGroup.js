function TabGroup(navGroup){
	var MapsWindow = require('ui/common/maps/campusMap/MapsWindow'),
		FloorPlansWindow = require('ui/common/maps/floorPlans/FloorPlansWindow'),
		SearchWindow = require('ui/common/maps/search/SearchWindow');
	
	var mapsWindow = new MapsWindow(navGroup),
	    floorPlansWindow = new FloorPlansWindow(navGroup),
		searchWindow = new SearchWindow(navGroup);

	var self = Ti.UI.createTabGroup();
	
	var mapsTab = Ti.UI.createTab({
		title: 'Campus Map',
		icon: '/icons/tabs/pin.png',
		window: mapsWindow
	});
	mapsWindow.parentTab = mapsTab;
	
	var floorPlansTab = Ti.UI.createTab({
		title: 'Floor Plans',
		icon: '/icons/tabs/building.png',
		window: floorPlansWindow
	});
	floorPlansWindow.parentTab = floorPlansTab;
	
	var searchTab = Ti.UI.createTab({
		title: 'Search',
		icon: (Ti.Platform.osname === 'android') ? 'icons/tabs/search.png' : Ti.UI.iPhone.SystemIcon.SEARCH,
		window: searchWindow
	});
	searchWindow.parentTab = searchTab;	
	
	self.addTab(mapsTab);
	self.addTab(floorPlansTab);
	self.addTab(searchTab);
	
	Ti.App.addEventListener('annotationSelected', function(e){
		self.setActiveTab(mapsTab);
	});
	
	self.addEventListener('close', function(){
		Ti.App.removeEventListener('annotationSelected', function(e){
			self.setActiveTab(mapsTab);
		});
	});
		
	return self;
};
module.exports = TabGroup;