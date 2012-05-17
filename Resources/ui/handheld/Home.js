//Home Window Component Constructor
function HomeWindow() {
	//load component dependencies
	var MainView = require('ui/common/MainView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});

/*		
	//construct UI
	var main = new MainView();
	self.add(main);
*/

	var collegesButton = Ti.UI.createButton({
		title: "Colleges",
		height: 50,
		width: 100
	})
	
	collegesButton.addEventListener('click', function(e){
		var CollegesWindow = require('windows/CollegesWindow');
		new CollegesWindow().open({animated:true});
	})
	
	self.add(collegesButton);
	return self;
}

//make constructor function the public component interface
module.exports = HomeWindow;
