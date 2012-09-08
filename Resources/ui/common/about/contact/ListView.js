function ListView(){
	var self = Titanium.UI.createWebView({
		url:'/ui/common/about/contact/contact.html'
	});	
	
	return self;
}

module.exports = ListView;