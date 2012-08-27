function DetailView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var lbl = Ti.UI.createLabel({
		text:'Speaker',
		height:'auto',
		width:'auto',
		color:'#000',
		top: 10,
		left: 10
	});
	self.add(lbl);
	
	self.addEventListener('itemSelected', function(e) {
		lbl.text = e.name + '\n' + e.position;
	});
	
	return self;
};

module.exports = DetailView;
