function DetailView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var lbl = Ti.UI.createLabel({
		text:'Announcement',
		height:'auto',
		width:'auto',
		color:'#000',
		top: 10
	});
	self.add(lbl);
	
	self.addEventListener('itemSelected', function(e) {
		lbl.text = e.data.title;
	});
	
	return self;
};
module.exports = DetailView;