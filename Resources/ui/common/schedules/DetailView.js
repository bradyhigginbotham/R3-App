function DetailView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var lbl = Ti.UI.createLabel({
		text:'Please select an item',
		height:'auto',
		width:'auto',
		color:'#000'
	});
	self.add(lbl);
	
	var festivalLink = Ti.UI.createLabel({
		text: '<a>Festival Acadienne</a>'
	});
	self.add(festivalLink);
	
	festivalLink.addEventListener('click', function(){
		var festivalPage = Ti.UI.createWebView({url: 'http://r3conference.aitp.org/'});
		var festivalWindow = Ti.UI.createWindow();
		festivalWindow.add(festivalPage);
		festivalWindow.open({modal: true});
	});
	
	self.addEventListener('itemSelected', function(e) {
		lbl.text = e.name + ', ' + e.day;
	});
	
	return self;
};

module.exports = DetailView;
