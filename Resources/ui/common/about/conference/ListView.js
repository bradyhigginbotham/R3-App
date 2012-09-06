function ListView(){
	var self = Titanium.UI.createWebView({
		url:'/ui/common/about/conference/conference.html',
		backgroundImage: 'images/bg_bigTex.png',
		backgroundColor: 'transparent'
	});	
	
	return self;
}

module.exports = ListView;