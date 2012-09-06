function DetailView() {
	var table = undefined;
	
	var query = 'SELECT * FROM (SELECT competition AS title, details, start, end, schedule_id, "contest" AS type FROM competitions ' + 
				'UNION ' +
				'SELECT title, details, start, end, schedule_id, "session" AS type FROM sessions) WHERE schedule_id = ? ORDER BY start ASC';
				
	var self = Ti.UI.createView({
		backgroundColor:'white',
		table: ''
	});
	
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');

	function listSchedule(title, id){
		var results = [{title: title, backgroundColor: '#5B718B', color: '#ffffff', height: 50, hasChild: false}], 
			tempStart, startTime = "", endTime;

	    //Get schedules from database
	    var resultSet = db.execute(query, id);
	    while (resultSet.isValidRow()) {
	    	tempStart = formatTime(resultSet.fieldByName('start'));
	    	endTime = formatTime(resultSet.fieldByName('end'));
	    	
	    	if(startTime != tempStart) { // new hour
	    		startTime = tempStart;
	    		header = startTime + " - " + endTime;
				results.push({
					title: resultSet.fieldByName('title'),
					details: resultSet.fieldByName('details'),
					start: startTime,
					end: endTime,
					type: resultSet.fieldByName('type'),
					schedule_id: resultSet.fieldByName('schedule_id'),
					header: header,
					hasChild: true,
					height: 40,
					className: 'schedule'
				});
			} else{
				results.push({
					title: resultSet.fieldByName('title'),
					start: startTime,
					end: endTime,
					type: resultSet.fieldByName('type'),
					schedule_id: resultSet.fieldByName('schedule_id'),
					hasChild: true,
					height: 40,
					className: 'schedule'
				});			
			}		
		    resultSet.next();
	    }
		resultSet.close();
		
		// Thursday dinner notice
		if (title == 'October 11, 2012'){
			results.push({title: '*Dinner on your own', height: 40, hasChild: false});
		}; 
		
		table = Ti.UI.createTableView ({
			data: results
		});
		self.add(table);
		
		table.addEventListener('click', function(e){
			self.fireEvent('scheduleItemSelected', {
				data: e.rowData
			});
		});
	}
	
	self.addEventListener('itemSelected', function(e) {
		listSchedule(e.data.title, e.data.id);
	});
	
	self.addEventListener('close', function(){
		alert('close');
	});
	
/*	Ti.App.addEventListener('removeTable', function(){
		self.remove(table);
		table = null;
}); */
	
	function formatTime(passedDate){		
		var date = passedDate.replace('/(\+\S+) (.*)/', '$2 $1');
		//var newDate = new Date(Date.parse(date)).toLocaleDateString();
		var newTime = new Date(Date.parse(date)).toLocaleTimeString();
		return newTime.replace(/:[0-9][0-9] (AM|PM) CDT/g, ' $1');
	};

	return self;
};

module.exports = DetailView;