function DetailView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var lbl = Ti.UI.createLabel({
		text:'Please select an item',
		height:'auto',
		width:'auto',
		color:'#000',
		top: 0
	});
	self.add(lbl);
	
	var festivalLink = Ti.UI.createLabel({
		text: 'Festival Acadienne',
		color: '#0645AD',
		bottom: 10
	});
	self.add(festivalLink);
	
	festivalLink.addEventListener('click', function(){
		var festivalPage = Ti.UI.createWebView({url: 'http://www.festivalsacadiens.com/index1.html'});
		var festivalWindow = Ti.UI.createWindow();
		
		var closeButton = Ti.UI.createButton({title: 'Close'});
		closeButton.addEventListener('click', function(){
			festivalWindow.close();
		});
		
		festivalWindow.rightNavButton = closeButton;
		festivalWindow.add(festivalPage);
		festivalWindow.open({modal: true});
	});
	
	self.addEventListener('itemSelected', function(e) {
		lbl.text = e.name + ', ' + e.day;
	});
	
	return self;
};

module.exports = DetailView;
