function DetailView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var resultSet = db.execute('SELECT * FROM schedules WHERE id = ?', e.data.schedule_id);
	var lbl = Ti.UI.createLabel({
		text: e.data.competition,
		height:'auto',
		width:'auto',
		color:'#000'
	});
	self.add(lbl);
	
	self.addEventListener('itemSelected', function(e) {
		lbl.text = e.name + ', ' + e.state;
	});
	
	return self;
	
};

module.exports = DetailView;