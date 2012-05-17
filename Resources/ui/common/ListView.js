function ListView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var db = Titanium.Database.install('weather.sqlite','weather');

	var results = [];

    //Get colleges from database
    var resultSet = db.execute('SELECT * FROM cities');
    while (resultSet.isValidRow()) {
		results.push({
		    id: resultSet.fieldByName('id'),
			title: resultSet.fieldByName('city'),
			//state: resultSet.fieldByName('state'),
			hasChild: true
		});
    	resultSet.next();
    }
    resultSet.close();
	
	var table = Ti.UI.createTableView({
		data:results
	});
	
	self.add(table);
	
	//add behavior
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			name:e.rowData.title,
			state:e.rowData.state
		});
	});
	
	return self;
};

module.exports = ListView;