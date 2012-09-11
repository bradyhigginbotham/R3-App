function ListView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');

	var results = [];

    //Get colleges from database
    var resultSet = db.execute('SELECT * FROM announcements ORDER BY id DESC LIMIT 10');
    while (resultSet.isValidRow()) {
		results.push({
		    id: resultSet.fieldByName('id'),
			title: (!resultSet.fieldByName('read')) ? "*" + resultSet.fieldByName('title') : resultSet.fieldByName('title'),
			defaultTitle: resultSet.fieldByName('title'),
			announcement: resultSet.fieldByName('announcement'),
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
			data:e.rowData
		});
		
		// update title
		e.source.title = e.source.defaultTitle;
	});
	
	return self;
};

module.exports = ListView;