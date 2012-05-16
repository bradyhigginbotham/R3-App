function MasterView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	//some dummy data for our table view
	var tableData = [
		{title:'Arkansas State University', price:'1.25', leftImage:'../../images/asu_logo.png', hasChild:true, color:'#000', header:"Arkansas"},
		{title:'University of Arkansas', price:'1.25', hasChild:true, color:'#000'},
		{title:'University of Arkansas at Little Rock', price:'1.50', leftImage:'../../images/ualr_logo.png', hasChild:true, color:'#000'},
		{title:'Louisiana State University', price:'1.50', hasChild:true, color:'#000', header:"Louisiana"},
		{title:'Louisiana Tech. University', price:'1.50', leftImage:'../../images/la_tech_logo.png', hasChild:true, color:'#000'},
		{title:'Northwestern State University', price:'2.50', leftImage:'../../images/nsu_logo.png', hasChild:true, color:'#000'},
		{title:'University of Louisiana at Monroe', price:'1.40', hasChild:true, color:'#000'},
		{title:'University of Louisiana at Lafayette', price:'1.00', leftImage:'../../images/ull_alt_logo.png', hasChild:true, color:'#000'},
		{title:'Delta State University', price:'1.50', hasChild:true, color:'#000', header:"Mississippi"},
		{title:'East Mississippi Community College', price:'1.50', hasChild:true, color:'#000'},
		{title:'Jones County Junior College', price:'2.50', hasChild:true, color:'#000'},
		{title:'Mississippi State University', price:'1.40', hasChild:true, color:'#000'},
		{title:'University of Southern Mississippi', price:'1.00', hasChild:true, color:'#000'},
		{title:'New Mexico State Universtity', price:'1.50', hasChild:true, color:'#000', header:"New Mexico"},
		{title:'University of New Mexico', price:'1.50', hasChild:true, color:'#000'},
	];
	
	var table = Ti.UI.createTableView({
		data:tableData
	});
	
	self.add(table);
	
	//add behavior
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			name:e.rowData.title,
			price:e.rowData.price
		});
	});
	
	return self;
};

module.exports = MasterView;