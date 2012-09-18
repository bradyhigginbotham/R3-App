function DetailView(navGroup, e, osname) {
	var table = undefined, speakers = [];

	var self = Ti.UI.createScrollView({
		layout: 'vertical',
		scrollType: 'vertical'
	});
	
	var session = Ti.UI.createLabel({
		text: 'Title of Session',
		height: 'auto',
		width: 'auto',
		color:'#ffffff',
		font: {fontSize: 24, fontWeight: 'bold'},
		top: 10,
		left: 10		
	});
	self.add(session);
	
	var time = Ti.UI.createLabel({
		text: 'Time of Session',
		height: 'auto',
		width: 'auto',
		color:'#ffffff',
		top: 0,
		left: 10
	});
	self.add(time);
	
	var table = Ti.UI.createTableView({
		backgroundImage: 'NONE',
		top: 20,
		height: 40
	});
	self.add(table);

	var details = Ti.UI.createLabel({
		text: 'Details',
		height: 'auto',
		width: 'auto',
		color:'#ffffff',
		top: 10,
		left: 10
	});
	self.add(details);
	
	function listSpeakers(speaker_id){
		var db = Titanium.Database.open('r3.sqlite');
	
		var resultSet = db.execute('SELECT * FROM speakers WHERE id = ?', speaker_id);
	    while (resultSet.isValidRow()) {
			speakers.push({
			    id: resultSet.fieldByName('id'),
				title: resultSet.fieldByName('name'),
				position: resultSet.fieldByName('title'),
				bio: resultSet.fieldByName('bio'),
				hasChild: true,
				className: 'speaker',
				height: 40
			});
	    	resultSet.next();
	    }
	    resultSet.close();
	    db.close();

	    speakers[0].header = "Speaker";
		table.data = speakers;
	    table.height = table.height + (speakers.length * 40);
		
		table.addEventListener('click', function(e){
			self.fireEvent('speakerItemSelected', {
				data: e.rowData
			});
		});
	}
	
	self.addEventListener('sessionSelected', function(e) {
 		session.text = e.data.title;
 		time.text = e.data.start + " - " + e.data.end + ",\n" + e.data.location;
 		details.text = e.data.details;
 		
 		if (e.data.speaker_id){
			listSpeakers(e.data.speaker_id);
		} else {
			table.height = 0;
		}
	});
	
	self.addEventListener('speakerItemSelected', function(e){
		var SpeakerView = require('ui/common/presentations/speakers/DetailView');
		
		var speakerView = new SpeakerView(navGroup, e, osname);
		speakerView.fireEvent('speakerSelected', e);
		
		var speakerWindow = Ti.UI.createWindow({
			title: 'Speaker Details',
			backButtonTitle: 'Back',
			backgroundImage: 'images/bg_bigTex.png'
		});
		speakerWindow.add(speakerView);
		navGroup.open(speakerWindow);		
	});
	
	return self;
};

module.exports = DetailView;
