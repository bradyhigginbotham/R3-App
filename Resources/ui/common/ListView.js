function ListView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var db = Titanium.Database.install('db/r3.sqlite','r3');

	var results = [];

    //Get colleges from database
    var resultSet = db.execute('SELECT * FROM colleges ORDER BY name ASC');
    while (resultSet.isValidRow()) {
		results.push({
		    id: resultSet.fieldByName('id'),
			title: resultSet.fieldByName('name'),
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