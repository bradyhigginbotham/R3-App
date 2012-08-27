function ListView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');
	var results = [];
	
    //Get certifications from database
    var resultSet = db.execute('SELECT * FROM certifications ORDER BY name ASC');
    while (resultSet.isValidRow())
    {
    	results.push
    	({
    		id: resultSet.fieldByName('id'),
    		title: resultSet.fieldByName('name'), // must be 'title' for certification name to appear in list
    		details: resultSet.fieldByName('details'),
    		room_num: resultSet.fieldByName('room_num'),
   			schedule_id: resultSet.fieldByName('schedule_id'),
    		hasChild: true,
    		height: 40
        });
    	
    	resultSet.next();	
    };
    
	resultSet.close();

	var table = Ti.UI.createTableView({
		data: results
	});
	
	self.add(table);
	
	
	//add event listener
	table.addEventListener('click', function(e) {
		self.fireEvent('certificationSelected', {
			data:e.rowData				
		});
	});
	
	return self;
};

module.exports = ListView;