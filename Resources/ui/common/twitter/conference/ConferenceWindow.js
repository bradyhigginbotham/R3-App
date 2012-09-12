function ConferenceWindow(navGroup, osname, height){
	// load dependencies
	var ConferenceView = require ('ui/common/twitter/conference/ConferenceView');
	var conferenceView = new ConferenceView(osname), row, tweet, avatar, table;
		
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'Conference Twitter Feed',
		backButtonTitle: '@r3aitp',
		navBarHidden: false
	});

	// Retrieve tweets via client 
    var xhr = Ti.Network.createHTTPClient();
    
    // set number of tweets
    if (osname === 'ipad' || height > 899) { // tablet
	    xhr.open("GET", 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=r3aitpconf&result_type=recent&count=20');
    } else if (height > 499) {
	    xhr.open("GET", 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=r3aitpconf&result_type=recent&count=15');	
    } else {
	    xhr.open("GET", 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=r3aitpconf&result_type=recent&count=11');	
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

    xhr.onerror = function(e){
		alert("The conference twitter feed could not be loaded. Please check your network or data connection.");
	};
						
	var tweets = [];
    xhr.onload = function(){
       	var results = eval('(' + this.responseText + ')');
       	for (var c = 0; c < results.length; c++) {
           	row = Ti.UI.createTableViewRow({
           		user: results[c].user.name,
           		username: results[c].user.screen_name,
           		date: results[c].created_at,
           		tweet: results[c].text,
           		avatar: results[c].user.profile_image_url,
           		hasChild: true,
           		height: rowHeight
			});
			
			tweet = Ti.UI.createLabel({
				text: results[c].text,
				left: 60,
				right: 15,
				top: 10,
				bottom: 10,
				height: tweetHeight
			});
			row.add(tweet);
			
			avatar = Ti.UI.createImageView({
				image: results[c].user.profile_image_url,
				height: 40,
				width: 40,
				top: avatarTop,
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
		title:'Tweet Details',
		backButtonTitle: '@r3aitp',
		backgroundColor: '#DCECF4'
	});
	detailContainerWindow.add(conferenceView);

	//add behavior for master view
	self.addEventListener('itemSelected', function(e) {
		conferenceView.fireEvent('itemSelected',e);
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
module.exports = ConferenceWindow;