function DetailView(navGroup, e, osname) {
	var table = undefined, sessions = [];
	
	var self = Ti.UI.createScrollView({
		layout: 'vertical',
		scrollType: 'vertical'
	});
	
	var speaker = Ti.UI.createLabel({
		text:'Speaker',
		height:'auto',
		width:'auto',
		color:'#ffffff',
		font: {fontSize: 24, fontWeight: 'bold'},
		top: 10,
		left: 10
	});
	self.add(speaker);
	
	var position = Ti.UI.createLabel({
		text:'Position',
		height:'auto',
		width:'auto',
		color:'#ffffff',
		top: 0,
		left: 10
	});
	self.add(position);
	
	var table = Ti.UI.createTableView({
		backgroundImage: 'NONE',
		backgroundColor: 'white',
		top: 20,
		height: 40
	});
	self.add(table);
	
	var bio = Ti.UI.createLabel({
		text:'Bio',
		height:'auto',
		width:'auto',
		color:'#ffffff',
		top: 5,
		left: 10
	});
	self.add(bio);
	
	function listSessions(id){
		var db = Titanium.Database.open('r3.sqlite');
	
		var resultSet = db.execute('SELECT * FROM sessions WHERE speaker_id = ?', id);
	    while (resultSet.isValidRow()) {
			sessions.push({
			    id: resultSet.fieldByName('id'),
				title: resultSet.fieldByName('title'),
				details: resultSet.fieldByName('details'),
				start: formatTime(resultSet.fieldByName('start')),
				end: formatTime(resultSet.fieldByName('end')),
				speaker_id: resultSet.fieldByName('speaker_id'),
				location: resultSet.fieldByName('location'),
				hasChild: true,
				className: 'session',
				height: 40
			});
	    	resultSet.next();
	    }
	    resultSet.close();
	    db.close();

	    sessions[0].header = "Sessions";
		table.data = sessions;
	    table.height = table.height + (sessions.length * 40);
		
		table.addEventListener('click', function(e){
			self.fireEvent('sessionItemSelected', {
				data: e.rowData
			});
		});
	}
	
	function addTeamBios(){
		// names and titles
		var bradyTitle = Ti.UI.createLabel({text: 'Brady Higginbotham', color: '#ffffff', font:{fontSize: 16, fontWeight: 'bold'}, top: 10, left: 10});
		var josephTitle = Ti.UI.createLabel({text: 'Joseph Mouton', color: '#ffffff', font:{fontSize: 16, fontWeight: 'bold'}, top: 10, left: 10});
		var dustinTitle = Ti.UI.createLabel({text: 'Dustin Rowland', color: '#ffffff', font:{fontSize: 16, fontWeight: 'bold'}, top: 10, left: 10});
		var gabbyTitle = Ti.UI.createLabel({text: 'Gabrielle Richard', color: '#ffffff', font:{fontSize: 16, fontWeight: 'bold'}, top: 10, left: 10});
		var allenTitle = Ti.UI.createLabel({text: 'Allen Latour', color: '#ffffff', font:{fontSize: 16, fontWeight: 'bold'}, top: 10, left: 10});
		
		// bios
		var brady = "Brady is a graduating senior at the University of Louisiana at Lafayette in Management " +
					"Information Systems. As the project leader for the Region 3 app, Brady was in charge of directing the " +
					"team throughout the development process and overseeing the completion of various app features, " +
					"including the conference schedule and notification systems, as well as maintaining cross-compatibility " +
					"and publication to the platform markets. He is the Webmaster for UL's AITP and ACM student chapters " +
					"and has developed multiple web applications for local and statewide clients. Brady was part of the " +
					"Best Student Team at this year's Cajun Codefest and continues to offer web and mobile solutions to " +
					"individuals and businesses alike.";
		var bradyBio = Ti.UI.createLabel({text: brady, color: '#ffffff', left: 10});
		
		var joseph = "Joseph Mouton is currently a junior at the University of Louisiana at Lafayette majoring in Business " +
					 "Informatics. He also holds the office of Secretary for the university's student AITP chapter, is a student " +
					 "member of the Association of Computing Machinery, and enjoys soccer, football, and gaming. As " +
					 "a co-developer of the Region 3 app, Joseph is responsible for the job fair, competition, and map " +
					 "features, including the annotation markings and search functionality. He also led the way in testing the " +
					 "application on iOS devices, including assuring compatibility with the recently released iOS 6 platform.";
		var josephBio = Ti.UI.createLabel({text: joseph, color: '#ffffff', left: 10});
		
		var dustin = "Dustin Rowland is also a junior at UL Lafayette studying Systems Administration. He is the social " +
					 "developer of the group and is responsible for the Twitter and Facebook features of the mobile app, " +
					 "as well as the About section. He was also the lead tester for Android devices, aiding in resolving bugs " +
					 "and graphical issues stemming from multiple device resolutions and screen sizes. Dustin is involved in " +
					 "karate, playing the guitar, and is hoping to one day become the Systems Administrator for a reputable " +
					 "company.";
		var dustinBio = Ti.UI.createLabel({text: dustin, color: '#ffffff', left: 10});
		
		var gabby = "Gabrielle Richard is originally from New Orleans, Louisiana and is now a senior in Information " +
					"Management Systems at UL Lafayette . Gabrielle is Vice President of the student chapter and official " +
					"designer of the R3 Conference mobile app. Her ultimate career goal is to end up as a Web Project " +
					"Manager, but in the meantime she is aspiring to become a Webmaster, Consultant, and/or Web " +
					"Designer. This is Gabrielle's first mobile app she has designed to go along with a variety of personal and " +
					"client websites in her graphical portfolio. \“It was a new and challenging experience, and has inspired me " +
					"to look beyond web design and delve a little into mobile application design as well.\” - Gabrielle";
		var gabbyBio = Ti.UI.createLabel({text: gabby, color: '#ffffff', left: 10});

		var allen = "Allen Latour is the UL Lafayette AITP Student Chapter President. He consulted with the app " +
					"development team in various tasks ranging from what features to include, app layout, the user interface, " +
					"backend logic and testing and has been an active member of the UL Lafayette chapter for several " +
					"years. He currently holds a Bachelor’s degree in Management Information Systems from the University " +
					"of Louisiana at Lafayette where he was a member of Phi Kappa Phi Honor Society, the University’s " +
					"Honors Program, and graduated as the Outstanding Graduate of the B.I. Moody III College of Business " +
					"Administration in May 2011. Currently Allen is pursuing a Masters in Business Administration while " +
					"working as the Assistant Manager of the Information Systems and Multimedia Labs department of the " +
					"University of Louisiana at Lafayette’s College of Business.";
		var allenBio = Ti.UI.createLabel({text: allen, color: '#ffffff', left: 10});
		
		self.add(bradyTitle);
		self.add(bradyBio);
		self.add(josephTitle);
		self.add(josephBio);
		self.add(dustinTitle);
		self.add(dustinBio);
		self.add(gabbyTitle);
		self.add(gabbyBio);
		self.add(allenTitle);
		self.add(allenBio);
	}
	
	self.addEventListener('speakerSelected', function(e) {
		speaker.text = e.data.title;
		position.text = e.data.position;
		bio.text = e.data.bio;
		
		listSessions(e.data.id);
		
		if (e.data.id == 6) { // mobile team
			addTeamBios();
		}
	});
	
	self.addEventListener('sessionItemSelected', function(e){
		var SessionView = require('ui/common/presentations/sessions/DetailView');
		
		var sessionView = new SessionView(navGroup, e, osname);
		sessionView.fireEvent('sessionSelected', e);
		
		var sessionWindow = Ti.UI.createWindow({
			title: 'Session Details',
			backButtonTitle: 'Back',
			backgroundImage: 'images/bg_bigTex.png'
		});
		sessionWindow.add(sessionView);
		navGroup.open(sessionWindow);		
	});
	
	function formatTime(passedDate){
		if(osname === "android"){
			var newTime = new Date(Date.parse(passedDate));
			var tempHour = newTime.getHours();
			if (tempHour > 12) {
				tempHour = tempHour - 12;
				newTime = newTime.toLocaleTimeString().replace(/:[0-9][0-9]$/, " PM");
			} else if (tempHour == 12) {
				newTime = newTime.toLocaleTimeString().replace(/:[0-9][0-9]$/, " PM");
			} else {
				newTime = newTime.toLocaleTimeString().replace(/:[0-9][0-9]$/, " AM");
			}
			newTime = newTime.replace(/[0-9][0-9]/i, tempHour.toString());
			return newTime;
		} else {
			var date = passedDate.replace('/(\+\S+) (.*)/', '$2 $1');
			//var newDate = new Date(Date.parse(date)).toLocaleDateString();
			var newTime = new Date(Date.parse(date)).toLocaleTimeString();
			return newTime.replace(/:[0-9][0-9] (AM|PM) CDT/g, ' $1');
		}
	};
		
	return self;
};

module.exports = DetailView;
