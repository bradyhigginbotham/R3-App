function ListView(){
	var self = Titanium.UI.createWebView({
		url:'/ui/common/about/ull/ull.html',
		backgroundImage: 'images/bg_bigTex.png',
		backgroundColor: 'transparent'
	});	
	
	return self;
}

module.exports = ListView;