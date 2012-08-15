function HashtagsWindow(navGroup){
	// load dependencies
	var HashtagsView = require ('ui/common/twitter/hashtags/HashtagsView');
	var hashtagsView = new HashtagsView();	
		
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'R3AITP Twitter Feed',
		navBarHidden: false
	});

	// Retrieve tweets via client 
    var xhr = Ti.Network.createHTTPClient();
        
   // xhr.open("GET", 'http://search.twitter.com/search.json?q=%23R3AITP');

    xhr.open("GET", 'http://search.twitter.com/search.json?q=%23aitp');

    xhr.onerror = function () {
		alert(e.error);
	};
					
	var tweets = [];
    xhr.onload = function () {
       	var results = eval('(' + this.responseText + ')');
       	for (var c = 0; c < results["results"].length; c++) {
           	var row = Ti.UI.createTableViewRow({
           		user: results["results"][c].from_user_name,
           		username: results["results"][c].from_user,
           		date: results["results"][c].created_at,
           		tweet: results["results"][c].text,
           		avatar: results["results"][c].profile_image_url,
           		hasChild: true,
           		height: 56
			});
			
			var tweet = Ti.UI.createLabel({
				text: results["results"][c].text,
				left: 60,
				right: 15,
				top: 10,
				bottom: 10,
				height: 36
			});
			row.add(tweet);
			
			var avatar = Ti.UI.createImageView({
				image: results["results"][c].profile_image_url,
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
		title:'Conference Feed Details',
		backButtonTitle: '#r3aitp',
		backgroundColor: '#DCECF4'
	});
	detailContainerWindow.add(hashtagsView);

	//add behavior for master view
	self.addEventListener('itemSelected', function(e) {
		hashtagsView.fireEvent('itemSelected',e);
		self.parentTab.open(detailContainerWindow);
	});
	
	var homeButton = Ti.UI.createButton({
		title: 'Home'
	});
	self.leftNavButton = homeButton;
	
	homeButton.addEventListener('click', function(){
		navGroup.close(self.tabGroup);
	});
	

    return self;
};
module.exports = HashtagsWindow;