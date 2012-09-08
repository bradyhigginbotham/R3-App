function ListView(){
	var self = Titanium.UI.createWebView({
		url:'/ui/common/about/conference/conference.html'
	});	
	
	return self;
}

module.exports = ListView;