function ListView()
{
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	var title = Ti.UI.createLabel({
		text: 'This conference is all about fun!',
		height:'auto',
		width:'auto',
		top: 10
	});
	self.add(title);
	
	var appDetails = Ti.UI.createLabel({
		text: 'YOLO!!!',
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