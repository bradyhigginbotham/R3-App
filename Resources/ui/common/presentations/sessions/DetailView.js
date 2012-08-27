function DetailView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var details = Ti.UI.createLabel({
		text: 'Details',
		height: 'auto',
		width: 'auto',
		top: 10,
		left: 10
	});
	self.add(details);
	
	var time = Ti.UI.createLabel({
		text: 'Time of Session',
		height: 'auto',
		width: 'auto',
		top: 50,
		left: 10
	});
	self.add(time);
	
	self.addEventListener('sessionSelected', function(e) {
 		details.text = e.data.details;
 		time.text = "Time:\n" + e.data.start + " - " + e.data.end;
	});
	
	return self;
};

module.exports = DetailView;
