function DetailView(){
	var self = Ti.UI.createScrollView({
		layout: 'vertical',
		scrollType: 'vertical'
	});
	
	// Title, time, and location
	var competition = Ti.UI.createLabel({
		text: 'Competition Title',
		height:'auto',
		width:'auto',
		color:'#ffffff',
		font: {fontSize: 24, fontWeight: 'bold'},
		top: 10,
		left: 10
	});
	self.add(competition);
	
	var time = Ti.UI.createLabel({
		text: 'Time & Location',
		height: 'auto',
		width: 'auto',
		color:'#ffffff',
		top: 0,
		left: 10
	});
	self.add(time);
	
	
	// cash prizes block
	var prizes = Ti.UI.createLabel({
		text: 'Cash Prizes',
		height:'auto',
		width:'auto',
		color:'#ffffff',
		font: {fontSize: 18, fontWeight: 'bold'},
		top: 20,
		left: 10
	});
	self.add(prizes);
	
	var amounts = Ti.UI.createLabel({
		text: '1st Place: $500\n2nd Place: $300\n3rd Place: $200',
		height: 'auto',
		width: 'auto',
		color:'#ffffff',
		top: 0,
		left: 10
	});
	self.add(amounts);
	
	// sponsor block
	var sponsorTitle = Ti.UI.createLabel({
		text: 'Contest Sponsor',
		height:'auto',
		width:'auto',
		color:'#ffffff',
		font: {fontSize: 18, fontWeight: 'bold'},
		top: 20,
		left: 10
	});
	self.add(sponsorTitle);
	
	var sponsor = Ti.UI.createLabel({
		text: 'N/A',
		height: 'auto',
		width: 'auto',
		color:'#ffffff',
		top: 0,
		left: 10
	});
	self.add(sponsor);
	
	// contest overview
	var overview = Ti.UI.createLabel({
		text: 'Contest Overview',
		height:'auto',
		width:'auto',
		color:'#ffffff',
		font: {fontSize: 18, fontWeight: 'bold'},
		top: 20,
		left: 10
	});
	self.add(overview);
	
	var details = Ti.UI.createLabel({
		text: 'Competition Details',
		height: 'auto',
		width: 'auto',
		color:'#ffffff',
		top: 0,
		left: 10
	});
	self.add(details);
	
	self.addEventListener('competitionSelected', function(e) {
		competition.text = e.data.title;
		details.text = e.data.details;
 		time.text = e.data.start + " - " + e.data.end + ",\n" + e.data.location;
 		
 		// get sponsor
 		if (e.data.sponsor_id){
			var db = Titanium.Database.open('r3.sqlite');
			var resultSet = db.execute('SELECT name FROM sponsors WHERE id = ?', e.data.sponsor_id);
		    while (resultSet.isValidRow()) {
				sponsor.text = resultSet.fieldByName('name');
		    	resultSet.next();
		    }
		    resultSet.close();
		    db.close();
		} else {
			sponsor.text = "N/A";
		}
	});
	
	return self;
};
module.exports = DetailView;