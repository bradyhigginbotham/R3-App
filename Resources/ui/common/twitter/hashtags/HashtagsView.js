function HashtagsView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var conferenceTweet = Ti.UI.createLabel({
		text: 'Tweet Details',
		height:'auto',
		width:'auto',
		top: 20,
		left: 15,
		right: 15,
		bottom: 5
	});
	self.add(conferenceTweet);
	
	var user = Ti.UI.createLabel({
		text: 'Posted By',
		height: 'auto',
		width: 'auto',
		top: 110,
		left: 15,
		right: 15,
		bottom: 5
	});
	self.add(user);	
	
	var date = Ti.UI.createLabel({
		text: 'Tweet Date',
		height: 'auto',
		width: 'auto',
		top: 130,
		left: 15,
		right: 15,
	});
	self.add(date);
	
	
	self.addEventListener('itemSelected', function(e) {
		conferenceTweet.text = e.data.tweet;
		user.text = 'Posted by: ' + e.data.user;
		date.text = 'Date: ' + e.data.date;
		
	});
	
	return self;
	
};

module.exports = HashtagsView;
