function DetailView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var lbl = Ti.UI.createLabel({
		text:'Competitions',
		height:'auto',
		width:'auto',
		color:'#000'
	});
	self.add(lbl);
	
};

module.exports = DetailView;