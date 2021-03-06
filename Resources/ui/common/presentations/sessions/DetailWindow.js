//Detail Window Component Constructor
function DetailWindow(navGroup, e, osname) {
	//load component dependencies
	var DetailView = require('ui/common/presentations/sessions/DetailView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		title: 'Session Details',
		layout: 'vertical',
		backButtonTitle: 'Sessions',
		backgroundImage: 'images/bg_bigTex.png',
		navBarHidden: false
	});
		
	//construct UI
	var detailView = new DetailView(navGroup, "", osname);
	detailView.fireEvent('sessionSelected', e);
	self.add(detailView);
		
	return self;
}

//make constructor function the public component interface
module.exports = DetailWindow;
