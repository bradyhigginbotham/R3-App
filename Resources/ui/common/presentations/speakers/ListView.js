function ListView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');

	var results = [];

    //Get colleges from database
    var resultSet = db.execute('SELECT * FROM speakers ORDER BY name ASC');
    while (resultSet.isValidRow()) {
		results.push({
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
	
	var table = Ti.UI.createTableView({
		data: results
	});
	
	self.add(table);
	
	//add behavior
	table.addEventListener('click', function(e) {
		self.fireEvent('speakerSelected', {
			data: e.rowData
		});
	});
	
	return self;
};

module.exports = ListView;