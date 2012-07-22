//Sessions Window Component Constructor
function SearchWindow() {
	//load component dependencies
	var ListView = require('ui/common/maps/search/ListView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'Search',
		navBarHidden: false
	});
		
	//construct UI
	var listView = new ListView();
	
	//create list view container
	var listContainerWindow = Ti.UI.createWindow({
		title:'Search'
	});
	self.add(listView);
		
	//add behavior for master view
	listView.addEventListener('itemSelected', function(e){
		Ti.App.fireEvent('annotationSelected', {
			title: e.title
		});
	});
	
	var homeButton = Ti.UI.createButton({
		title: 'Home'
	});
	self.leftNavButton = homeButton;
	
	homeButton.addEventListener('click', function(){
		navGroup.close(self.tabGroup);
	});
	
	return self;
}

//make constructor function the public component interface
module.exports = SearchWindow;