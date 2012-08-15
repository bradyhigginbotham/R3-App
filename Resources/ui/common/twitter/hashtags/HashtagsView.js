function HashtagsView() {
	var self = Ti.UI.createView({
		backgroundColor:'white',
		layout: 'vertical',
		top: 20,
		left: 15,
		right: 15,
		height: '90%',
		borderRadius: 10
	});
	
	var firstRow = Ti.UI.createView({
		top: 0,
		left: 0,
		height: '20%'
	});
	var secondRow = Ti.UI.createView({
		top: 0,
		left: 0,
		height: '30%'
	});
	var thirdRow = Ti.UI.createView({
		top: 0,
		left: 0,
		height: '20%'
	});
	
	var avatar = Ti.UI.createImageView({
		image: '',
		top: 10,
		left: 10
	});
	firstRow.add(avatar);
	
	var user = Ti.UI.createLabel({
		text: 'User',
		height: 'auto',
		width: 'auto',
		top: 10,
		left: 70
	});
	firstRow.add(user);

	var username = Ti.UI.createLabel({
		text: 'Username',
		height: 'auto',
		width: 'auto',
		top: 30,
		left: 70
	});
	firstRow.add(username);
		
	var conferenceTweet = Ti.UI.createLabel({
		text: 'Tweet Details',
		height:'auto',
		width:'auto',
		top: 10,
		left: 10,
		right: 10
	});
	secondRow.add(conferenceTweet);	
	
	var date = Ti.UI.createLabel({
		text: 'Tweet Date',
		height: 'auto',
		width: 'auto',
		top: 10,
		left: 10,
		right: 10,
	});
	thirdRow.add(date);
	
	
	self.addEventListener('itemSelected', function(e) {
		conferenceTweet.text = e.data.tweet;
		user.text = e.data.user;
		username.text = '@' + e.data.username;
		date.text = 'Posted Date:\n' + parseTwitterDate(e.data.date);
		avatar.image = e.data.avatar;
	});
	
	self.add(firstRow);
	self.add(secondRow);
	self.add(thirdRow);
	
	return self;
	
	function parseTwitterDate(twitterDate){		
		var date = twitterDate.replace('/(\+\S+) (.*)/', '$2 $1');
		var newDate = new Date(Date.parse(date)).toLocaleDateString();
		var newTime = new Date(Date.parse(date)).toLocaleTimeString();
		return newDate + ' • ' + newTime.replace('CDT', '');
	};
	
};

module.exports = HashtagsView;
