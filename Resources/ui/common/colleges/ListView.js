function ListView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');

	var results = [], header = "";

    //Get colleges from database
    var resultSet = db.execute('SELECT * FROM colleges ORDER BY state ASC');
    while (resultSet.isValidRow()) {
    	if(header != resultSet.fieldByName('state')) { // new state
    		header = resultSet.fieldByName('state')
			results.push({
			    id: resultSet.fieldByName('id'),
				title: resultSet.fieldByName('name'),
				state: resultSet.fieldByName('state'),
				hasChild: true,
				header: header,
				height: 40
			});
		} else{
			results.push({
			    id: resultSet.fieldByName('id'),
				title: resultSet.fieldByName('name'),
				state: resultSet.fieldByName('state'),
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
		});
	});
	
	return self;
};

module.exports = ListView;