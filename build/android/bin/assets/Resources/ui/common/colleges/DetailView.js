function DetailView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var lbl = Ti.UI.createLabel({
		text:'College',
		height:'auto',
		width:'auto',
		color:'#000'
	});
	self.add(lbl);
	
	self.addEventListener('itemSelected', function(e) {
		lbl.text = e.name + ', ' + e.state;
	});
	
	return self;
};
module.exports = DetailView;