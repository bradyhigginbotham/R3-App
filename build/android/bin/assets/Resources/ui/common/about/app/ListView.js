function ListView(){
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	var title = Ti.UI.createLabel({
		text: 'App Information',
		height:'auto',
		width:'auto',
		top: 10
	});
	self.add(title);
	
	var appDetails = Ti.UI.createLabel({
		text: 'This is what the app is all about',
		height: 'auto',
		width: 'auto',
		top: 40,
		left: 15,
		right: 15
	});
	
	self.add(appDetails);
	
	return self;
}

module.exports = ListView;