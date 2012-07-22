function ListView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');

	var results = [];

    //Get locations from database
    var resultSet = db.execute('SELECT * FROM annotations ORDER BY title ASC');
    while (resultSet.isValidRow()) {
		results.push({
            title: resultSet.fieldByName('title'),
			hasChild: true,
			className: 'annotations',
			height: 40
		});
    	resultSet.next();
    }
    resultSet.close();
    
	//add search bar
	var searchBar = Titanium.UI.createSearchBar({
    	barColor:'#000', 
    	showCancel:true,
    	height:43,
    	top:0,
    	hintText:'Search',
    });
	
	var table = Ti.UI.createTableView({
		data: results,
		search: searchBar,
		searchHidden: false,
		filterAttribute: 'title'
	});
	
	self.add(table);
	
	//add behavior
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			title:e.rowData.title,
		});
	});
	
<<<<<<< HEAD
	
	//add search bar
	var search = Titanium.UI.createSearchBar({
    barColor:'#000', 
    showCancel:true,
    height:43,
    top:0,
});
=======
	//self.add(search);
>>>>>>> 6c59e1049768044f53aad6e8303887194e1bcaf1
	
	return self;
};

module.exports = ListView;