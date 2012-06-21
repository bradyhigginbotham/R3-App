//Certification Window Component Constructor
function CertificationsWindow(navgroup) 
{
	//load component dependencies
	var ListView = require('ui/common/certifications/ListView'),
		DetailView = require('ui/common/certifications/DetailView');
		
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
		
	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({
		title:'College Details'
	});
	detailContainerWindow.add(detailView);
	
	//add behavior for master view
	listView.addEventListener('itemSelected', function(e)
	{
		detailView.fireEvent('itemSelected', e);
		navGroup.open(detailContainerWindow);
	});
	
	self.add(listView);
	
	return self;

}

//make constructor function the public component interface
module.exports = CertificationsWindow;

