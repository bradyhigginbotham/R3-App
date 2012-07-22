//MainView Component Constructor
function MainView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var button = Ti.UI.createButton({
		text:"Colleges!",
		height: 50,
		width: 100
	});
	self.add(button);
	
	//Add behavior for UI
	button.addEventListener('click', function(e) {
		var MasterView = require('ui/common/MasterView');
		new MasterView().open({animated:true});
	});
	
	return self;
}

module.exports = MainView;
