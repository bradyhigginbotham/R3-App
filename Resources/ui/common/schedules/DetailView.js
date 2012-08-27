function DetailView() {
	var table = undefined;
	
	var query = 'SELECT * FROM (SELECT competition AS title, details, start, end, schedule_id, "contest" AS type FROM competitions ' + 
				'UNION ' +
				'SELECT name AS title, details, start, end, schedule_id, "cert" AS type FROM certifications ' +
				'UNION ' +
				'SELECT title, details, start, end, schedule_id, "session" AS type FROM sessions) WHERE schedule_id = ? ORDER BY start ASC';
				
	var self = Ti.UI.createView({
		backgroundColor:'white'
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
					height: 40
				});
			} else{
				results.push({
					title: resultSet.fieldByName('title'),
					start: startTime,
					end: endTime,
					type: resultSet.fieldByName('type'),
					schedule_id: resultSet.fieldByName('schedule_id'),
					hasChild: true,
					height: 40
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
	
	var festivalLink = Ti.UI.createLabel({
		text: 'Festival Acadienne',
		color: '#0645AD',
		bottom: 10
	});
	self.add(festivalLink);
	
	festivalLink.addEventListener('click', function(){
		var festivalPage = Ti.UI.createWebView({url: 'http://www.festivalsacadiens.com/index1.html'});
		var festivalWindow = Ti.UI.createWindow();
		
		var closeButton = Ti.UI.createButton({title: 'Close'});
		closeButton.addEventListener('click', function(){
			festivalWindow.close();
		});
		
		festivalWindow.rightNavButton = closeButton;
		festivalWindow.add(festivalPage);
		festivalWindow.open({modal: true});
	});
	
	self.addEventListener('itemSelected', function(e) {
		listSchedule(e.data.title, e.data.id);
	});
	
	function formatTime(passedDate){		
		var date = passedDate.replace('/(\+\S+) (.*)/', '$2 $1');
		//var newDate = new Date(Date.parse(date)).toLocaleDateString();
		var newTime = new Date(Date.parse(date)).toLocaleTimeString();
		return newTime.replace(/:[0-9][0-9] (AM|PM) CDT/g, ' $1');
	};

	return self;
};

module.exports = DetailView;