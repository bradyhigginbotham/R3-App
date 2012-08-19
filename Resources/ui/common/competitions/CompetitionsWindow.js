//Competitions Window Component Constructor
function CompetitionsWindow(navGroup) {
	//load component dependencies 
	var ListView = require('ui/common/competitions/ListView'),
		DetailView = require('ui/common/competitions/DetailView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'Competitions',
		navBarHidden: false
	});

    //construct UI
	var listView = new ListView(),
		detailView = new DetailView();
	
    //create list view container
	var listContainerWindow = Ti.UI.createWindow({
		title:'Competitions'
	});
	self.add(listView);
	
	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({
		title:'Competition Details'
	});
	detailContainerWindow.add(detailView);	
	
	//add behavior for master view
	listView.addEventListener('competitionSelected', function(e) {
		detailView.fireEvent('competitionSelected',e);
		navGroup.open(detailContainerWindow);
	});
	
	return self;
}

//make constructor function the public component interface
module.exports = CompetitionsWindow;

