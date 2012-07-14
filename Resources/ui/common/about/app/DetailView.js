function DetailView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var app = Ti.UI.createLabel({
		text: 'App Information',
		height:'auto',
		width:'auto',
		top: 10
	});
	self.add(app);
	
	var appDetails - Ti.UI.createLabel({
		text: 'This is what the app is all about',
		height: 'auto',
		width: 'auto'
		})


module.exports = DetailView;
