//Scheduls Window Component Constructor
function SchedulesWindow(navGroup) {
	//load component dependencies
	var ListView = require('ui/common/schedules/ListView'),
		DetailView = require('ui/common/schedules/DetailView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'Conference Schedule',
		navBarHidden: false
	});
		
	//construct UI
	var listView = new ListView(),
		detailView = new DetailView();
	
	//create list view container
	var listContainerWindow = Ti.UI.createWindow({
		title:'Conference Schedule'
	});
	self.add(listView);
	
	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({
		title:'Schedule Details',
		layout: 'vertical',
		backButtonTitle: 'Schedule'
	});
	detailContainerWindow.add(detailView);
	
	//add behavior for master view
	listView.addEventListener('itemSelected', function(e) {
		detailView.fireEvent('itemSelected',e);
		detailContainerWindow.title = e.data.title;
		navGroup.open(detailContainerWindow);
	});
	
	detailContainerWindow.addEventListener('scheduleItemSelected', function(e){
		switch(e.data.type){
			case "contest":
				var CompetitionView = require('ui/common/competitions/DetailView');
				
				competitionView = new CompetitionView();
				competitionView.fireEvent('competitionSelected', e);
				var competitionWindow = Ti.UI.createWindow({
					title: e.data.title,
					backButtonTitle: 'Back'
				});
				competitionWindow.add(competitionView);
				navGroup.open(competitionWindow);
				break;
			case "cert":
				var CertificationView = require('ui/common/certifications/DetailView');
				
				certificationView = new CertificationView();
				certificationView.fireEvent('certificationSelected', e);
				var certificationWindow = Ti.UI.createWindow({
					title: e.data.title,
					backButtonTitle: 'Back'
				});
				certificationWindow.add(certificationView);
				navGroup.open(certificationWindow);
		//	case "session":
		}		
	});
		
	return self;
}

//make constructor function the public component interface
module.exports = SchedulesWindow;
