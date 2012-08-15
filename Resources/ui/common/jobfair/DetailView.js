function DetailView() {
	// sponsor website
	var siteWindow = Ti.UI.createWindow();
	var closeButton = Ti.UI.createButton({title: 'Close'});
	siteWindow.rightNavButton = closeButton;
	closeButton.addEventListener('click', function(){
		siteWindow.close();
	});
	
	var website = Ti.UI.createWebView({url: ''});
	siteWindow.add(website);

	var self = Ti.UI.createView({
		backgroundColor:'white',
		layout: 'vertical',
		top: 20,
		left: 15,
		right: 15,
		height: '90%',
		borderRadius: 10
	});
		
	self.addEventListener('itemSelected', function(e) {
        name.text = e.data.title;
        siteWindow.title = e.data.title;
        site.text = e.data.site;
        website.url = e.data.site;
        details.text = e.data.details;
	});
	
	var name = Ti.UI.createLabel({
		text:'Sponsor',
		top: 10,
		left: 10
	});
	self.add(name);
	
	var site = Ti.UI.createLabel({
		text: 'Website',
		color: 'blue',
		top: 0,
		left: 10
	});
	self.add(site);

	var details = Ti.UI.createLabel({
		text: 'Sponsor Details',
		top: 20,
		left: 10
	});
	self.add(details);

	site.addEventListener('click', function(e){		
		siteWindow.open({modal: true});
	});
		
	return self;
};

module.exports = DetailView;