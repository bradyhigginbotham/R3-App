function ListView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');

	var results = [];

    //Get colleges from database
    var resultSet = db.execute('SELECT * FROM announcements LIMIT 10 ORDER BY updated_at ASC');
    while (resultSet.isValidRow()) {
		results.push({
		    id: resultSet.fieldByName('id'),
			title: resultSet.fieldByName('announcement'),
			state: resultSet.fieldByName('description'),
			hasChild: false,
			height: 40
		});
    	resultSet.next();
    }
    resultSet.close();
	
	var table = Ti.UI.createTableView({
		data: results
	});
	
	self.add(table);
	
	return self;
};

module.exports = ListView;