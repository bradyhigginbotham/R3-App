function ConferenceWindow(navGroup){
	
	self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'Conference Twitter Feed',
		navBarHidden: false
	});

    var xhr = Ti.Network.createHTTPClient();
        
    xhr.open("GET", 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=r3aitpconf&result_type=recent&rpp=10');

    xhr.onerror = function () {
		alert(e.error);
	};
					

	var tweets = [];
    xhr.onload = function () {
       	var results = eval('(' + this.responseText + ')');
       	alert(results);
       	for (var c = 0; c < results.length; c++) {
           	tweets.push({
           		title: results[c].text,	
           		user: results[c].user.screen_name,
           		date: results[c].created_at,
           		leftImage: results[c].user.profile_image_url,
           		hasChild: true,
           		height: 40
			});
		};
	};
              
    xhr.send();          
              
	var table = Ti.UI.createTableView({
		data: tweets
	});
	
	self.add(table);        

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