function DetailView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var title = Ti.UI.createLabel({
		text:'Session',
		height:'auto',
		width:'auto',
		color:'#000'
	});
	self.add(title);
	
	var dateLabel = Ti.UI.createLabel({
		text: 'Date of Session',
		height: 'auto',
		width: 'auto',
		top: 10
	});
	self.add(dateLabel);
	
	function formatTime(passedDate){		
		var date = passedDate.replace('/(\+\S+) (.*)/', '$2 $1');
		var newDate = new Date(Date.parse(date)).toLocaleDateString();
		var newTime = new Date(Date.parse(date)).toLocaleTimeString();
		return newDate + ' • ' + newTime.replace(/:[0-9][0-9] (AM|PM) CDT/g, ' $1');
	};
	
	self.addEventListener('itemSelected', function(e) {
		title.text = e.title
 		dateLabel.text = formatTime(e.time);
	});
	
	return self;
};

module.exports = DetailView;
