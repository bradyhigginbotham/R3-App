function DetailView() {
	var self = Ti.UI.createScrollView({
		layout: 'vertical',
		scrollType: 'vertical'
	});
	
	var certification = Ti.UI.createLabel({
		text: 'Certification Title',
		height:'auto',
		width:'auto',
		color:'#ffffff',
		font: {fontSize: 24, fontWeight: 'bold'},
		top: 10,
		left: 10
	});
	self.add(certification);
	
	var location = Ti.UI.createLabel({
		text: 'Location',
		height: 'auto',
		width: 'auto',
		color:'#ffffff',
		top: 0,
		left: 10
	});
	self.add(location);
	
	var details = Ti.UI.createLabel({
		text: 'Certification Details',
		height:'auto',
		width:'auto',
		color:'#ffffff',
		font: {fontSize: 18, fontWeight: 'bold'},
		top: 20,
		left: 10
	});
	self.add(details);

	self.addEventListener('certificationSelected', function(e) {
		certification.text = e.data.title;
 		location.text = e.data.start + " - " + e.data.end + "\n" + e.data.location;
		details.text = e.data.details;
	});
	
	return self;
};
module.exports = DetailView;