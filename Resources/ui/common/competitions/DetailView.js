function DetailView()
{
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var competition = Ti.UI.createLabel({
		text: 'Competition Title',
		height:'auto',
		width:'auto',
		top: 10
	});
	self.add(competition);
	
	var date = Ti.UI.createLabel({
		text: 'Competition Date',
		height: 'auto',
		width: 'auto',
		top: 30
	});
	self.add(date);	
	
	self.addEventListener('competitionSelected', function(e) {
		competition.text = e.data.title;
		
		var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');
	
		var resultSet = db.execute('SELECT * FROM schedules WHERE id = ?', e.data.schedule_id);
	    while (resultSet.isValidRow()) {
			date.text = resultSet.fieldByName('day') + ', ' + resultSet.fieldByName('date');
	    	resultSet.next();
	    }
	    resultSet.close();
	});
	
	return self;
};
module.exports = DetailView;