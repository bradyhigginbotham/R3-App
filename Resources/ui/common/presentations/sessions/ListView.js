function ListView(osname) {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');

	var results = [];

    //Get colleges from database
    var resultSet = db.execute('SELECT * FROM sessions ORDER BY title ASC');
    while (resultSet.isValidRow()) {
		results.push({
		    id: resultSet.fieldByName('id'),
			title: resultSet.fieldByName('title'),
			details: resultSet.fieldByName('details'),
			start: formatTime(resultSet.fieldByName('start')),
			end: formatTime(resultSet.fieldByName('end')),
			speaker_id: resultSet.fieldByName('speaker_id'),
			location: resultSet.fieldByName('location'),
			hasChild: true,
			className: 'session',
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
		self.fireEvent('sessionSelected', {
			data: e.rowData
		});
	});
	
	function formatTime(passedDate){
		if(osname === "android"){
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
		} else {
			var date = passedDate.replace('/(\+\S+) (.*)/', '$2 $1');
			//var newDate = new Date(Date.parse(date)).toLocaleDateString();
			var newTime = new Date(Date.parse(date)).toLocaleTimeString();
			return newTime.replace(/:[0-9][0-9] (AM|PM) CDT/g, ' $1');
		}
	};
	
	return self;
};

module.exports = ListView;