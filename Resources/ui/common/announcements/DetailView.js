function DetailView(osname) {
	var self = Ti.UI.createView();
	
	var title = Ti.UI.createLabel({
		text:'Title',
		height:'auto',
		width:'auto',
		color:'#ffffff',
		font:{fontWeight: 'bold'},
		top: 10,
		left: 10
	});
	self.add(title);
	
	var announcement = Ti.UI.createLabel({
		text:'Announcement',
		height:'auto',
		width:'auto',
		color:'#ffffff',
		top: 40,
		left: 10
	});
	self.add(announcement);
	
	self.addEventListener('itemSelected', function(e) {
		title.text = e.data.defaultTitle;
		announcement.text = e.data.announcement;
		
		// update database
		var db = Titanium.Database.open('r3.sqlite');
	    db.execute('UPDATE announcements SET read = 1 WHERE id = "' + e.data.id + '"');
	    db.close();
	    
		// update app's badge number
	    if (osname != 'android'){
			var db = Titanium.Database.open('r3.sqlite');
		    var resultSet = db.execute('SELECT COUNT(*) AS badge_number FROM announcements WHERE read = 0');
		    Ti.UI.iPhone.appBadge = resultSet.fieldByName('badge_number');
			db.close();
	    }
	});
	
	return self;
};
module.exports = DetailView;