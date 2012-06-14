//Certification Window Component Constructor
function CertificationsWindow(navgroup) 
{
	//load component dependencies
	var ListView = require('ui/common/certifications/ListView.js'),
		DetailView = require('ui/common/certifications/DetailView.js');
		
	//Create object instance
	var self = Ti.UI.createWindow
	({
		backgroundColor:'#ffffff',
		title: 'Certifications',
		navBarHidden: false
	})
	
	//Construct UI
	var listView = new ListView,
		detailView = new DetailView;
		
	//Create list view container
	var listContainerWindow = Ti.UI.createWindow
	
	
	
	
}
