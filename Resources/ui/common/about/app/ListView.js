function ListView(){
	var self = Titanium.UI.createWebView({
		url:'/ui/common/about/app/app.html'
	});	
	
	return self;
}

module.exports = ListView;