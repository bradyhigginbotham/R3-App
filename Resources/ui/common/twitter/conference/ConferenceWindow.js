function ConferenceWindow(navGroup){
	
	self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'Conference Twitter Feed',
		navBarHidden: false
	});

    var xhr = Ti.Network.createHTTPClient();
        
    xhr.open("GET", 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=r3aitpconf&result_type=recent&count=11');

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
           		hasChild: true,
           		height: 60
			});
			
			var tweet = Ti.UI.createLabel({
				text: results[c].text,
				left: 50,
				top: 3
			});
			row.add(tweet);
			
			var avatar = Ti.UI.createImageView({
				image: results[c].user.profile_image_url,
				height: 40,
				width: 40,
				top: 5,
				left: 5
			});
			row.add(avatar);
			tweets.push(row);
		};
		
		var table = Ti.UI.createTableView({
			data: tweets
		});
	
		self.add(table); 
	};
              
    xhr.send();                 

/*
		//add event listener
		table.addEventListener('click', function(e) {
			self.fireEvent('itemSelected', {
				data:e.rowData				
			});
		});            
*/


    return self;
};
module.exports = ConferenceWindow;