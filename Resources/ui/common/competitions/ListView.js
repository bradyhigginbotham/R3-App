function ListView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');

	var results = [], header = '';

    //Get competitions from database
    var resultSet = db.execute('SELECT * FROM competitions ORDER BY date ASC');
    while (resultSet.isValidRow()) {
    	if(header != resultSet.fieldByName('date')) { // new state
    		header = resultSet.fieldByName('date')
			results.push({
			    id: resultSet.fieldByName('id'),
				competition: resultSet.fieldByName('competition'),
				day: resultSet.fieldByName('day'),
				date: resultSet.fieldByName('date'),
				description: resultSet.fieldByName('description'),
				schedule_id: resultSet.fieldByName('schedule_id'),
				hasChild: true,
				header: header,
				height: 40
			});
		} else{
			results.push({
                id: resultSet.fieldByName('id'),
				competition: resultSet.fieldByName('competition'),
				day: resultSet.fieldByName('day'),
				date: resultSet.fieldByName('date'),
				description: resultSet.fieldByName('description'),
				hasChild: true,
				height: 40
			});			
		}
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