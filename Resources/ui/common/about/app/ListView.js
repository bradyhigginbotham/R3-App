function ListView(){
	var self = Titanium.UI.createWebView({
		url:'/ui/common/about/app/app.html'
	});	
	
	Ti.App.addEventListener('callNumber', function(e){
		Ti.Platform.openURL('tel:' + e);
	});
	
	return self;
}

module.exports = ListView;