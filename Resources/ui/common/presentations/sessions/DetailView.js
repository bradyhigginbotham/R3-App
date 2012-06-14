function DetailView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var lbl = Ti.UI.createLabel({
		text:'Session',
		height:'auto',
		width:'auto',
		color:'#000'
	});
	self.add(lbl);
	
	self.addEventListener('itemSelected', function(e) {
 		var dateArray = e.time.split(' ');
        var year = dateArray[0].split('-');
        var time = dateArray[1].split(':');

        var date = new Date(year[0], year[1], year[2], time[0], time[1], time[2]);
		lbl.text = e.title + '\n' + date.getHours() + ":" + date.getMinutes();

	});
	
	return self;
};

module.exports = DetailView;
