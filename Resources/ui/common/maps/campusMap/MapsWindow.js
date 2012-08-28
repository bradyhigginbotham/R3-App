function MapsWindow(navGroup, osname) {
	var delta = 0.02;
	// Geolocation default settings
	Ti.Geolocation.purpose = "Recieve User Location";
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 10;

	//create module instance
	var self = Ti.UI.createWindow({
		title: "Conference Map",
		navBarHidden: false
	});
	
	// top buttons
	var homeButton = Ti.UI.createButton({
		title: 'Home'
	});
	self.leftNavButton = homeButton;
	
	homeButton.addEventListener('click', function(){
		navGroup.close(self.tabGroup);
	});
	
	
	// Find Me feature
	if (osname === 'android'){
	    var activity = self.activity;
	
		activity.onCreateOptionsMenu = function(e){
	    	var menu = e.menu;
	    	var menuItem = menu.add({ title: "Find Me" });

			menuItem.addEventListener("click", function(e) {
				Ti.Geolocation.getCurrentPosition(function(e) {
				    if (e.error) {
				    	alert('There was an error trying to find your location.');
				        return; 
				    }
				    mapview.setLocation({
				        latitude : e.coords.latitude,
				        longitude : e.coords.longitude,
				        latitudeDelta : delta,
				        longitudeDelta : delta
				    });
				});
			   	mapview.annotations = annotations;
			});
		};
	} else {
		var refreshButton = Ti.UI.createButton({
			title: 'Refresh'
		});
		
		refreshButton.addEventListener('click', function(e){
			Ti.Geolocation.getCurrentPosition(function(e) {
			    if (e.error) {
			        return; 
			    }
			
			    mapview.setLocation({
			        latitude : e.coords.latitude,
			        longitude : e.coords.longitude,
			        latitudeDelta : delta,
			        longitudeDelta : delta
			    });
			});
		   	mapview.annotations = annotations;
		});
		self.rightNavButton = refreshButton;
	};
	
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');

	var annotations = [], pincolor;

    //Get annotations from database
    var annotationsSet = db.execute('SELECT * FROM annotations');
    while (annotationsSet.isValidRow()) {
    	pincolor = annotationsSet.fieldByName('pincolor');
		annotations.push(
			Ti.Map.createAnnotation({
		    	latitude: annotationsSet.fieldByName('latitude'),
		    	longitude: annotationsSet.fieldByName('longitude'),
				title: annotationsSet.fieldByName('title'),
				subtitle: annotationsSet.fieldByName('subtitle'),
				pincolor: annotationsSet.fieldByName('pincolor'), // RED, GREEN, PURPLE
				className: 'annotation',
			})	
		)
    	annotationsSet.next();
    }
    annotationsSet.close();
	
	var mapview = Titanium.Map.createView({
	    mapType: Titanium.Map.STANDARD_TYPE,
	    region: {latitude: 30.215984, longitude: -92.030777,
	            latitudeDelta: delta, longitudeDelta: delta},    
	    animate:true,
	    regionFit:true,
	    userLocation:true,
	    annotations: annotations
	});
		
	Ti.Geolocation.getCurrentPosition(function(e) {
	    if (e.error) {
	        return; 
	    }
	
	    mapview.setLocation({
	        latitude : 30.215984,
	        longitude : -92.030777,
	        latitudeDelta : delta,
	        longitudeDelta : delta
	    });
	});
	
	self.add(mapview);
	Ti.App.addEventListener('annotationSelected', function(e){
		var annoSelected;
		for (var i=0;i < annotations.length;i++){
			if(annotations[i].title==e.title)
			{
				annoSelected= annotations[i];
			};
		};
		mapview.selectAnnotation(annoSelected);
		mapview.setLocation({
	        latitude : annoSelected.latitude,
	        longitude : annoSelected.longitude,
	        latitudeDelta : delta,
	        longitudeDelta : delta
	    });
	});

	return self;
};

module.exports = MapsWindow;