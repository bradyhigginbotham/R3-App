function ListView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');
	var results = [], header = "";
	
    //Get certifications from database
    var resultSet = db.execute('SELECT * FROM certifications ORDER BY header DESC, name ASC');
    while (resultSet.isValidRow()){
    	if(header != resultSet.fieldByName('header')) { // new cert
    		header = resultSet.fieldByName('header');
	    	results.push({
	    		id: resultSet.fieldByName('id'),
	    		title: resultSet.fieldByName('name'), // must be 'title' for certification name to appear in list
				site: resultSet.fieldByName('site'),
	    		details: resultSet.fieldByName('details'),
				start: formatTime(resultSet.fieldByName('start')),
				end: formatTime(resultSet.fieldByName('end')),
	    		location: resultSet.fieldByName('location'),
	   			schedule_id: resultSet.fieldByName('schedule_id'),
	    		hasChild: true,
				header: header,
	    		height: 40
	        });
		} else {
			results.push({
	    		id: resultSet.fieldByName('id'),
	    		title: resultSet.fieldByName('name'), // must be 'title' for certification name to appear in list
				site: resultSet.fieldByName('site'),
	    		details: resultSet.fieldByName('details'),
				start: formatTime(resultSet.fieldByName('start')),
				end: formatTime(resultSet.fieldByName('end')),
	    		location: resultSet.fieldByName('location'),
	   			schedule_id: resultSet.fieldByName('schedule_id'),
	    		hasChild: true,
	    		height: 40
			});
		}
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
	
	function formatTime(passedDate){
		var newTime = new Date(Date.parse(passedDate));
		var tempHour = newTime.getHours();
		if (tempHour > 12) {
			tempHour = tempHour - 12;
			newTime = newTime.toLocaleTimeString().replace(/:[0-9][0-9]$/, " PM");
		} else if (tempHour == 12) {
			newTime = newTime.toLocaleTimeString().replace(/:[0-9][0-9]$/, " PM");
		} else {
			newTime = newTime.toLocaleTimeString().replace(/:[0-9][0-9]$/, " AM");
		}
		newTime = newTime.replace(/[0-9][0-9]/i, tempHour.toString());
		return newTime;
	}
	
	return self;
};

module.exports = ListView;