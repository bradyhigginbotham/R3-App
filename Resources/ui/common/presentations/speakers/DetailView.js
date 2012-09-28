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
	
	self.addEventListener('speakerSelected', function(e) {
		speaker.text = e.data.title;
		position.text = e.data.position;
		bio.text = e.data.bio;
		
		listSessions(e.data.id);	    
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
