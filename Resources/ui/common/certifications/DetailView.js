function DetailView() {
	var siteWindow = Ti.UI.createWindow();
	var closeButton = Ti.UI.createButton({title: 'Close'});
	siteWindow.rightNavButton = closeButton;
	closeButton.addEventListener('click', function(){
		siteWindow.close();
	});
	
	var website = Ti.UI.createWebView({url: ""});
	siteWindow.add(website);

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
	
	var breakdown = Ti.UI.createLabel({
		text: 'Test Breakdown',
		color: '#EFCD2D',
		top: 20,
		left: 10
	});
	self.add(breakdown);

	var overview = Ti.UI.createLabel({
		text: 'Overview',
		height:'auto',
		width:'auto',
		color:'#ffffff',
		font: {fontSize: 18, fontWeight: 'bold'},
		top: 20,
		left: 10
	});
	self.add(overview);

	var details = Ti.UI.createLabel({
		text: 'Certification Details',
		height:'auto',
		width:'auto',
		color:'#ffffff',
		top: 0,
		left: 10
	});
	self.add(details);

	self.addEventListener('certificationSelected', function(e) {
		certification.text = e.data.title + " Fundamentals";
 		location.text = e.data.start + " - " + e.data.end + "\n" + e.data.location;
        website.url = e.data.site;
		details.text = e.data.details;
	});
	
	breakdown.addEventListener('click', function(e){
		if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
			alert("The webpage could not be loaded. Please check your network or data connection.");
		} else {
			siteWindow.open({modal: true});
		}
	});
	
	return self;
};
module.exports = DetailView;