function ListView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');

	var results = [];

    //Get competitions from database
    var resultSet = db.execute('SELECT * FROM competitions ORDER BY competition ASC');
    while (resultSet.isValidRow()) {
		results.push({
            // id: resultSet.fieldByName('rowid'),
			title: resultSet.fieldByName('competition'), // must be 'title' for competition name to show in list
			details: resultSet.fieldByName('details'),
			start: formatTime(resultSet.fieldByName('start')),
			end: formatTime(resultSet.fieldByName('end')),
			sponsor_id: resultSet.fieldByName('sponsor_id'),
			location: resultSet.fieldByName('location'),
			hasChild: true,
			height: 40
		});			
    	resultSet.next();
    }
    resultSet.close();
	
	var table = Ti.UI.createTableView({
		data: results
	});
	
	self.add(table);
	
	
	//add behavior
	table.addEventListener('click', function(e) {
		self.fireEvent('competitionSelected', {
			data: e.rowData
		});
	});
	
	function formatTime(passedDate){		
		var date = passedDate.replace('/(\+\S+) (.*)/', '$2 $1');
		//var newDate = new Date(Date.parse(date)).toLocaleDateString();
		var newTime = new Date(Date.parse(date)).toLocaleTimeString();
		return newTime.replace(/:[0-9][0-9] (AM|PM) CDT/g, ' $1');
	};
	
	return self;
};

module.exports = ListView;