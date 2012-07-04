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
			schedule_id: resultSet.fieldByName('schedule_id'),
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
		self.fireEvent('itemSelected', {
			data: e.rowData
		//	schedule_id: e.rowData.schedule_id
		});
	});
	
	return self;
};

module.exports = ListView;