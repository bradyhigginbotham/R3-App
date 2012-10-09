//Certification Window Component Constructor
function CertificationsWindow(navGroup) {
	//load component dependencies
	var ListView = require('ui/common/certifications/ListView'),
		DetailView = require('ui/common/certifications/DetailView');
		
	//Create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'MTA Certifications',
		navBarHidden: false
	});
	
	//Construct UI
	var listView = new ListView(),
		detailView = new DetailView();
		
	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({
		title:'Certification Details',
		backgroundImage: 'images/bg_bigTex.png'
	});
	detailContainerWindow.add(detailView);
	
	//add behavior for master view
	listView.addEventListener('certificationSelected', function(e) {
		detailView.fireEvent('certificationSelected',e);
		navGroup.open(detailContainerWindow);
	});
	
	self.add(listView);
	
	return self;
}

//make constructor function the public component interface
module.exports = CertificationsWindow;

