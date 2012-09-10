function HashtagsWindow(navGroup, osname, height){
	// load dependencies
	var HashtagsView = require ('ui/common/twitter/hashtags/HashtagsView');
	var hashtagsView = new HashtagsView(), row, tweet, avatar, table;	
		
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'R3AITP Twitter Feed',
		navBarHidden: false
	});

	// Retrieve tweets via client 
    var xhr = Ti.Network.createHTTPClient();
        
    // set number of tweets
    if (osname === 'ipad' || height > 899) { // tablet
	    xhr.open("GET", 'http://search.twitter.com/search.json?q=%23r3aitp&count=20');
    } else if (height > 499) {
	    xhr.open("GET", 'http://search.twitter.com/search.json?q=%23r3aitp&count=15');
    } else {
	    xhr.open("GET", 'http://search.twitter.com/search.json?q=%23r3aitp&count=11');
    }
    
    // set row and label heights for tableview
    var rowHeight, tweetHeight, avatarTop;
    if (osname === 'android') {
    	if (height < 450) { // low-res phones
    		rowHeight = 45;
    		tweetHeight = 30;
    		avatarTop = 2;
    	} else if (height > 450 && height <= 499) { // mid-res phones
    		rowHeight = 56;
    		tweetHeight = 36;
    		avatarTop = 8;
    	} else if (height > 499 && height <= 999) { // hi-res phones
    		rowHeight = 70;
    		tweetHeight = 54;
    		avatarTop = 12;
    	} else if (height > 999) { // tablets
    		rowHeight = 100;
    		tweetHeight = 70;
    		avatarTop = 20;
    	}
    } else { // iOS
    	rowHeight = 56;
    	tweetHeight = 36;
    	avatarTop = 8;
    }

    xhr.onerror = function (e) {
		alert(e.error);
	};
					
	var tweets = [];
    xhr.onload = function () {
       	var results = eval('(' + this.responseText + ')');
       	for (var c = 0; c < results["results"].length; c++) {
           	row = Ti.UI.createTableViewRow({
           		user: results["results"][c].from_user_name,
           		username: results["results"][c].from_user,
           		date: results["results"][c].created_at,
           		tweet: results["results"][c].text,
           		avatar: results["results"][c].profile_image_url,
           		hasChild: true,
           		height: rowHeight
			});
			
			tweet = Ti.UI.createLabel({
				text: results["results"][c].text,
				left: 60,
				right: 15,
				top: 10,
				bottom: 10,
				height: tweetHeight
			});
			row.add(tweet);
			
			avatar = Ti.UI.createImageView({
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
		
		table = Ti.UI.createTableView({
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