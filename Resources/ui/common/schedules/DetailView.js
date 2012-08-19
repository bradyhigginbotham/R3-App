function DetailView() {
	var query = 'SELECT * FROM (SELECT competition AS title, time, schedule_id, "contest" AS type FROM competitions ' + 
				'UNION ' +
				'SELECT name AS title, time, schedule_id, "cert" AS type FROM certifications ' +
				'UNION ' +
				'SELECT title, time, schedule_id, "session" AS type FROM sessions) WHERE schedule_id = ? ORDER BY time ASC';
				
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');

	var results = [], header = "", hour = "", newHeader;

	function listSchedule(id){
	    //Get schedules from database
	    var resultSet = db.execute(query, id);
	    while (resultSet.isValidRow()) {
	    	hour = grabHour(resultSet.fieldByName('time'));
	    	
	    	if(header != hour) { // new hour
	    		header = hour;
	    		newHeader = (header > 12) ? ((header - 12).toString() + ":00pm") : header.toString() + ":00am";
				results.push({
					title: resultSet.fieldByName('title'),
					time: formatTime(resultSet.fieldByName('time')),
					type: resultSet.fieldByName('type'),
					schedule_id: resultSet.fieldByName('schedule_id'),
					header: newHeader,
					hasChild: true,
					height: 40
				});
			} else{
				results.push({
					title: resultSet.fieldByName('title'),
					time: formatTime(resultSet.fieldByName('time')),
					type: resultSet.fieldByName('type'),
					schedule_id: resultSet.fieldByName('schedule_id'),
					hasChild: true,
					height: 40
				});			
			}		
		    resultSet.next();
	    }
		resultSet.close();
		
		var table = Ti.UI.createTableView ({
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
		listSchedule(e.data.id);
	});
	
	function formatTime(passedDate){		
		var date = passedDate.replace('/(\+\S+) (.*)/', '$2 $1');
		//var newDate = new Date(Date.parse(date)).toLocaleDateString();
		var newTime = new Date(Date.parse(date)).toLocaleTimeString();
		return newTime.replace(/:[0-9][0-9] (AM|PM) CDT/g, ' $1');
	};
	
	function grabHour(passedDate){		
		var date = passedDate.replace('/(\+\S+) (.*)/', '$2 $1');
		var newTime = new Date(Date.parse(date));
		return newTime.getHours();
	};
	
	return self;
};

module.exports = DetailView;
