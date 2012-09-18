function ListView(osname) {
	if (osname === 'android'){
		var searchHeight = Ti.Platform.displayCaps.platformHeight * (43/480);
	} else {
		var searchHeight = 43;
	}

	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var db = Titanium.Database.open('r3.sqlite');

	var results = [], header;

    //Get locations from database
    var resultSet = db.execute('SELECT * FROM annotations ORDER BY pincolor DESC, title ASC');
    while (resultSet.isValidRow()) {
    	if(header != resultSet.fieldByName('header')) { // new header
    		header = resultSet.fieldByName('header')
			results.push({
	            title: resultSet.fieldByName('title'),
				hasChild: true,
				header: header,
				className: 'annotations',
				height: 40
			});
    	} else {
			results.push({
	            title: resultSet.fieldByName('title'),
				hasChild: true,
				className: 'annotations',
				height: 40
			});
    	}
    	resultSet.next();
    }
    resultSet.close();
    db.close();
    
	//add search bar
	var searchBar = Titanium.UI.createSearchBar({
    	barColor:'#000', 
    	showCancel:true,
    	height: searchHeight,
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
	
	return self;
};

module.exports = ListView;