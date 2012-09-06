function ListView(){
	var self = Titanium.UI.createWebView({
		url:'/ui/common/about/app/app.html',
		backgroundImage: 'images/bg_bigTex.png',
		backgroundColor: 'transparent'
	});	
	
	return self;
}

module.exports = ListView;