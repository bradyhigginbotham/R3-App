function ListView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var db = Titanium.Database.install('db/r3.sqlite','r3');

	var results = [];

    //Get schedules from database
    var resultSet = db.execute('SELECT * FROM schedules');
    while (resultSet.isValidRow()) {
		results.push({
		    id: resultSet.fieldByName('id'),
			title: resultSet.fieldByName('date') + ", 2012",
			day: resultSet.fieldByName('day'),
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
			name:e.rowData.title,
			day:e.rowData.day,
			id:e.rowData.id
		});
	});
	
	return self;
};

module.exports = ListView;