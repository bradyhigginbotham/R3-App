function ListView()
{
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	var title = Ti.UI.createLabel({
		text: 'Please feel free to call any of the following people if you have questions:',
		height:'auto',
		width:'auto',
		top: 10
	});
	self.add(title);
	
	var appDetails = Ti.UI.createLabel({
		text: 'Dustin Rowland \n  Cell: 361-249-6553\n  Email: DustinRowland12@gmail.com\n\nBrady Higginbotham\n  Cell:\n  Email:\n\nJoe Joe\n  Cell:\n  Email',
		height: 'auto',
		width: 'auto',
		top: 55,
		left: 15,
		right: 15
	});
		
		
	self.add(appDetails);
	
	return self;
}

module.exports = ListView;