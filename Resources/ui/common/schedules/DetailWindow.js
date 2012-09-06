//Detail Window Component Constructor
function DetailWindow(navGroup, e) {
	//load component dependencies
	var DetailView = require('ui/common/schedules/DetailView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		title: e.data.day,
		layout: 'vertical',
		backButtonTitle: 'Schedule',
		backgroundColor:'#ffffff',
		navBarHidden: false
	});
		
	//construct UI
	var detailView = new DetailView();
	detailView.fireEvent('itemSelected', e);
	self.add(detailView);
	
	detailView.addEventListener('scheduleItemSelected', function(e){
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
		/*	case "cert":
				var CertificationView = require('ui/common/certifications/DetailView');
				
				certificationView = new CertificationView();
				certificationView.fireEvent('certificationSelected', e);
				var certificationWindow = Ti.UI.createWindow({
					title: e.data.title,
					backButtonTitle: 'Back'
				});
				certificationWindow.add(certificationView);
				navGroup.open(certificationWindow); */
			case "session":
				var SessionView = require('ui/common/presentations/sessions/DetailView');
				
				sessionView = new SessionView();
				sessionView.fireEvent('sessionSelected', e);
				var sessionWindow = Ti.UI.createWindow({
					title: e.data.title,
					backButtonTitle: 'Back'
				});
				sessionWindow.add(sessionView);
				navGroup.open(sessionWindow);
		}		
	});
		
	return self;
}

//make constructor function the public component interface
module.exports = DetailWindow;
