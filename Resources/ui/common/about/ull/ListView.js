function ListView(){
	var self = Titanium.UI.createWebView({
		url:'ui/common/about/ull/ull.html',
		backgroundColor: 'transparent',
		top: 0,
		left: 0,
		width: 'auto',
		height: 'auto'
	});	
	
	return self;
}

module.exports = ListView;