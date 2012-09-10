function DetailView() {
	var self = Ti.UI.createScrollView({
		layout: 'vertical',
		scrollType: 'vertical'
	});
	
	var college = Ti.UI.createLabel({
		text: 'College',
		height:'auto',
		width:'auto',
		color:'#ffffff',
		font: {fontSize: 24, fontWeight: 'bold'},
		top: 10,
		left: 10
	});
	self.add(college);
	
	var state = Ti.UI.createLabel({
		text: 'State',
		height:'auto',
		width:'auto',
		color:'#ffffff',
		top: 0,
		left: 10
	});
	self.add(state);
	
	self.addEventListener('itemSelected', function(e) {
		college.text = e.data.title;
		state.text = e.data.state;
	});
	
	return self;
};
module.exports = DetailView;