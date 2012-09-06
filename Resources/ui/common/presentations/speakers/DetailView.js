function DetailView() {
	var self = Ti.UI.createView({
		backgroundImage: 'images/bg_bigTex.png',
		backgroundColor: 'transparent'
	});
	
	var lbl = Ti.UI.createLabel({
		text:'Speaker',
		height:'auto',
		width:'auto',
		color:'#ffffff',
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
