function ListView(){
	var self = Titanium.UI.createWebView({
		url:'/ui/common/about/app/app.html',
		backgroundColor: 'transparent',
		top: 0,
		left: 0
	});	
	
	return self;
}

module.exports = ListView;