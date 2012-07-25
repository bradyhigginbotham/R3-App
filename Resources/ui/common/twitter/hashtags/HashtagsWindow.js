function HashtagsWindow(navGroup){
	
	var HashtagsView = require ('ui/common/twitter/hashtags/HashtagsView');
	
		
	self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'R3AITP Twitter Feed',
		navBarHidden: false
	});


	var hashtagsView = new HashtagsView();
	
		

	// Retrieve tweets via client 
    var xhr = Ti.Network.createHTTPClient();
        
    xhr.open("GET", 'http://search.twitter.com/search.json?q=%23R3AITP');


    xhr.onerror = function () {
		alert(e.error);
	};
					

	var tweets = [];
    xhr.onload = function () {
       	var results = eval('(' + this.responseText + ')');
       	for (var c = 0; c < results.length; c++) {
           	var row = Ti.UI.createTableViewRow({
           		user: results[c].user.screen_name,
           		date: results[c].created_at,
           		tweet: results[c].text,
           		hasChild: true,
           		height: 56
			});
			
			var tweet = Ti.UI.createLabel({
				text: results[c].text,
				left: 60,
				right: 15,
				top: 10,
				bottom: 10,
				height: 36
			});
			row.add(tweet);
			
			var avatar = Ti.UI.createImageView({
				image: results[c].user.profile_image_url,
				height: 40,
				width: 40,
				top: 8,
				left: 10,
				bottom: 8,
			});
			row.add(avatar);
			tweets.push(row);
		};
		
		var table = Ti.UI.createTableView({
			data: tweets
		});
	
		self.add(table); 
		
		//add event listener
		table.addEventListener('click', function(e) {
			self.fireEvent('itemSelected', {
				data:e.rowData				
			});
		});            

	};
              
    xhr.send();                 


	// Detail Container
	var detailContainerWindow = Ti.UI.createWindow({
		title:'Conference Feed Details'
	});
	detailContainerWindow.add(hashtagsView);

	//add behavior for master view
	self.addEventListener('itemSelected', function(e) {
		hashtagsView.fireEvent('itemSelected',e);
		navGroup.open(detailContainerWindow);
	});
	

    return self;
};
module.exports = HashtagsWindow;