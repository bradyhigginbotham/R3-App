//Detail Window Component Constructor
function DetailWindow(navGroup, e) {
	//load component dependencies
	var DetailView = require('ui/common/presentations/speakers/DetailView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		title: 'Speaker Details',
		layout: 'vertical',
		backButtonTitle: 'Speakers',
		backgroundImage: 'images/bg_bigTex.png',
		navBarHidden: false
	});
		
	//construct UI
	var detailView = new DetailView(navGroup);
	detailView.fireEvent('speakerSelected', e);
	self.add(detailView);
		
	return self;
}

//make constructor function the public component interface
module.exports = DetailWindow;
