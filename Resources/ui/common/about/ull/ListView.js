function ListView(){
	var self = Titanium.UI.createWebView({
		url:'/ui/common/about/ull/ull.html'
	});	
	
	return self;
}

module.exports = ListView;