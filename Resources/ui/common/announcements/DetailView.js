function DetailView() {
	var self = Ti.UI.createView({
		backgroundImage: 'images/bg_bigTex.png',
		backgroundColor: 'transparent'
	});
	
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
	});
	
	return self;
};
module.exports = DetailView;