(function () {
    Codestrong.ui.createTwitterWindow = function () {
        var twitterTimeout = 11000;
        var tweetCount = 50;
        var firstRun = true;
        
        var twitterWindow = Titanium.UI.createWindow({
            id: 'twitterWindow',
            title: 'Twitter News',
            backgroundColor: '#FFF',
            barColor: '#414444',
            fullscreen: false
        });

        var createTwitterTable = function (search) {
            return Ti.UI.createTableView({
                height: '100%',
                width: '100%',
                viewTitle: search
            });
        };
        var data = [{
        	title: '#codestrong',
        	view: createTwitterTable('#codestrong'),
            url: 'http://search.twitter.com/search.json?q=%23codestrong&result_type=recent&rpp=' + tweetCount,
            isSearch: true
        }, {
            title: '@appcelerator',
            view: createTwitterTable('@appcelerator'),
            url: 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=appcelerator&count=' + tweetCount,
            isSearch: false
        }, {
            title: '@codestrong',
            view: createTwitterTable('@codestrong'),
            url: 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=codestrong&count=' + tweetCount,
            isSearch: false
        }

        ];
        var loadedViews = [];
        
        twitterWindow.add(Codestrong.ui.createTabbedScrollableView({data:data}));

		// add a click handler to all twitter tables
        for (var index in data) {
            item = data[index];
            item.view.addEventListener('click', function (e) {
                Codestrong.navGroup.open(Codestrong.ui.createTwitterDetailWindow({
                    title: e.rowData.user,
                    text: e.rowData.tweet,
                    name: e.rowData.user,
                    date: e.rowData.date
                }), { animated: true });
            });
        }

        // Using the parsing method shown https://gist.github.com/819929
        var tweetWebJs = "document.body.addEventListener('touchmove', function(e) { e.preventDefault();}, false);";
        var baseHTMLStart = '<html><head></head><body>',
            baseHTMLEnd = '<script type="text/javascript">' + tweetWebJs + '</script></body></html>';

        // set this to true if you are only tracking one user
        var single = true;
        var getTweets = function (entry) {
                // create table view data object
                var tvData = [];

                var xhr = Ti.Network.createHTTPClient();
                xhr.timeout = twitterTimeout;
                xhr.open("GET", entry.url);

                xhr.onerror = function () {
					alert(e.error);
                };

				var tweets = [];
                xhr.onload = function () {
                    try {
                        var json = eval('(' + this.responseText + ')');
                        var results = json.results;
                        for (var c = 0; c < tweets.length; c++) {
                        	tweets.push({
                        		title: results[c].text,
                        		user: results[c].user.screen_name,
                        		hasChild: true
                        	});
                        }
                        
                        var tweetList = Ti.UI.createTableView({
                        	data: tweets
                        });
                    } catch (e) {
                        Ti.API.info(e);
                    }
                };
                // Get the data
                xhr.send();
            }

        var reloadAllTweets = function () {
                Codestrong.ui.activityIndicator.showModal('Loading latest tweets...', twitterTimeout, 'Twitter timed out. All streams may not have updated.');
                for (var i = 0; i < data.length; i++) {
                    getTweets(data[i]);
                }
            };

        // Get the tweets for 'twitter_name'
        if (Ti.Network.online) {
            twitterWindow.addEventListener('open', function (e) {
                if (firstRun) {
                    firstRun = false;
                    reloadAllTweets();
                }
            });

            if (Codestrong.isAndroid()) {
                twitterWindow.activity.onCreateOptionsMenu = function (e) {
                    var menuitem = e.menu.add({
                        title: 'Refresh Tweets'
                    });
                    menuitem.addEventListener('click', function (e) {
                        reloadAllTweets();
                    });
                };
            } else {
                var button = Ti.UI.createButton({
                    systemButton: Ti.UI.iPhone.SystemButton.REFRESH
                });
                button.addEventListener('click', function (e) {
                    reloadAllTweets();
                });
                twitterWindow.rightNavButton = button;
            }
        } else {
            alert('No network connection detected.');
        }

        return twitterWindow;
    };
})();