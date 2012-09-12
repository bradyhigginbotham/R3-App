function DetailView(osname) {
	var table = undefined, item;
	
	var query = 'SELECT * FROM (SELECT competition AS title, details, start, end, location, schedule_id, sponsor_id AS specific, "contest" AS type FROM competitions ' + 
				'UNION ' +
				'SELECT title, details, start, end, location, schedule_id, speaker_id AS specific, "session" AS type FROM sessions) WHERE schedule_id = ? ORDER BY start ASC, end ASC';
				
	var self = Ti.UI.createView({
		backgroundColor:'white',
		table: ''
	});
	
	var db = Titanium.Database.open('r3.sqlite');

	function listSchedule(title, id){
		var results = [{title: title, backgroundColor: '#5B718B', color: '#ffffff', height: 50, hasChild: false}], 
			header = "", tempStart, startTime = "", endTime;

	    //Get schedules from database
	    var resultSet = db.execute(query, id);
	    while (resultSet.isValidRow()) {
	    	tempStart = formatTime(resultSet.fieldByName('start'));
	    	endTime = formatTime(resultSet.fieldByName('end'));
	    	
	    	// create row item
			var item = {
				title: resultSet.fieldByName('title'),
				details: resultSet.fieldByName('details'),
				start: startTime,
				end: endTime,
				type: resultSet.fieldByName('type'),
				location: resultSet.fieldByName('location'),
				schedule_id: resultSet.fieldByName('schedule_id'),
				hasChild: true,
				height: 40,
				className: 'schedule'
			};
	    	
	    	// add header and start time if new
	    	if(header != tempStart + " - " + endTime){ //startTime != tempStart) { // new hour
	    		startTime = tempStart;
	    		header = startTime + " - " + endTime;
	    		item.start = startTime;
	    		item.header = header;
			}
			
    		// add properties for specific types
    		if (item.type == "contest"){
				item.sponsor_id = resultSet.fieldByName('specific');
    		} else { // session
				item.speaker_id = resultSet.fieldByName('specific');
			};

			results.push(item);
		    resultSet.next();
	    }
		resultSet.close();
		db.close();
		
		// Thursday dinner notice
		if (title == 'October 12, 2012'){
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

module.exports = DetailView;