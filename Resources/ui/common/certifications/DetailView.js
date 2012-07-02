function DetailView()
{
	var self = Ti.UI.createView
	({
		backgroundColor: 'white'
	});
	
	var lbl = Ti.UI.createLabel
	({
		text: 'Certification Details',
		height: 'auto',
		width: 'auto',
		color: '#000'		
	});
	
	self.add(lbl);
	
	self.addEventListener('itemSelected',function(e)
	{
		lbl.text = e.name;
	});
	
};

module.exports = DetailView;
