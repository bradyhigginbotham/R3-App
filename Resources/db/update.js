/*------- Update Application Database -------*/
function syncLocalDatabase(){
	// create request client
    var xhr = Ti.Network.createHTTPClient(); 
    
    // script to grab new conference information
    xhr.open("GET", 'http://bradysblog.com/r3conference/update.php');
    
    // die silently
    xhr.onerror = function(){};
    
    xhr.onload = function(){
    	var response = JSON.parse(this.responseText);

		// get current database version
		var db = Titanium.Database.open('r3.sqlite');
		var resultSet = db.execute('SELECT version FROM user WHERE id = 1');
		var appVersion = resultSet.fieldByName('version');
		db.close();
		
    	if (appVersion < response.version){ // old version, update it
			var alertDialog = Titanium.UI.createAlertDialog({
			    title: 'New Information Available',
			    message: 'There is new conference information available. Would you like this new information to be added?',
			    buttonNames: ['Yes','No']
			});
			alertDialog.show();
			
			alertDialog.addEventListener('click', function(e){
				if (e.index === 0) { // yes
					updateDatabase(response);
				} else { // no
					alert('The information will not be added.');
					
					// update app's database version
					var db = Titanium.Database.open('r3.sqlite');
					db.execute("UPDATE user SET version = " + response.version + " WHERE id = 1");
					db.close();
					
					response = null;
				}
			})
			
			function updateDatabase(data){
		    	// set table variables
		    	var competitions = data.competitions;
		    	var sessions = data.sessions;
		    	var speakers = data.speakers;
		    	var sponsors = data.sponsors;
		    	var colleges = data.colleges;
		    	var annotations = data.annotations;
		    	
		    	// initialize queries
		    	var competitions_query = "INSERT INTO 'competitions' ";
		    	var speakers_query = "INSERT INTO 'speakers' ";
		    	var sessions_query = "INSERT INTO 'sessions' ";
		    	var sponsors_query = "INSERT INTO 'sponsors' ";
		    	var colleges_query = "INSERT INTO 'colleges' ";
		    	var annotations_query = "INSERT INTO 'annotations' ";
		    	var version_query = "UPDATE user SET version = " + data.version + " WHERE id = 1";
		
				// set queries
		       	for (var i = 0; i < competitions.length; i++) {
		       		if (i == 0){
		       			competitions_query = competitions_query + 'SELECT "' + 
		       							 	 competitions[i].competition 	+ '" AS competition, ' 	+ 
		       							 	 competitions[i].schedule_id 	+ ' AS schedule_id, "' 	+
		       							 	 competitions[i].details 		+ '" AS details, ' 		+ 
		       							 	 competitions[i].sponsor_id 	+ ' AS sponsor_id, "' 	+
		       							 	 competitions[i].start 			+ '" AS start, "' 		+ 
		       							 	 competitions[i].end 			+ '" AS end, "' 		+ 
		       							 	 competitions[i].location 		+ '" AS location';
		       		} else {
		       			competitions_query = competitions_query + ' UNION SELECT "' + 
			       							 competitions[i].competition 	+ '", '  + 
			       							 competitions[i].schedule_id 	+ ', "'  +
			       							 competitions[i].details 		+ '", '  + 
			       							 competitions[i].sponsor_id 	+ ', "'  +
			       							 competitions[i].start 			+ '", "' + 
			       							 competitions[i].end 			+ '", "' + 
			       							 competitions[i].location 		+ '"';
		       		}
			    }
		       	for (var i = 0; i < sessions.length; i++) {
		       		if (i == 0){
		       			sessions_query = sessions_query + 'SELECT ' + 
		       							 sessions[i].id 			+ ' AS id, "' 		 	+ 
		       							 sessions[i].title 			+ '" AS title, "' 	 	+ 
		       							 sessions[i].start 			+ '" AS start, ' 	 	+ 
		       							 sessions[i].speaker_id 	+ ' AS speaker_id, ' 	+ 
		       							 sessions[i].schedule_id	+ ' AS schedule_id, "' 	+
		       							 sessions[i].end 			+ '" AS end, "' 		+ 
		       							 sessions[i].details 		+ '" AS details, "'  	+ 
		       							 sessions[i].location 		+ '" AS location';
		       		} else {
		       			sessions_query = sessions_query + ' UNION SELECT ' + 
		       							 sessions[i].id 			+ ', "'  + 
		       							 sessions[i].title 			+ '", "' + 
		       							 sessions[i].start 			+ '", '  + 
		       							 sessions[i].speaker_id 	+ ', '	 + 
		       							 sessions[i].schedule_id	+ ', "'  +
		       							 sessions[i].end 			+ '", "' + 
		       							 sessions[i].details 		+ '", "' + 
		       							 sessions[i].location 		+ '"';
		       		}
			    }
		       	for (var i = 0; i < speakers.length; i++) {
		       		if (i == 0){
		       			speakers_query = speakers_query + 'SELECT ' + 
		       							 speakers[i].id 	+ ' AS id, "' 	  + 
		       							 speakers[i].name 	+ '" AS name, "'  + 
		       							 speakers[i].title 	+ '" AS title, "' + 
		       							 speakers[i].bio 	+ '" AS bio';
		       		} else {
		       			speakers_query = speakers_query + ' UNION SELECT ' + 
		       							 speakers[i].id 	+ ', "'  + 
		       							 speakers[i].name 	+ '", "' + 
		       							 speakers[i].title 	+ '", "' + 
		       							 speakers[i].bio 	+ '"';
		       		}
			    }
		       	for (var i = 0; i < sponsors.length; i++) {
		       		if (i == 0){
		       			sponsors_query = sponsors_query + 'SELECT ' + 
		       							 sponsors[i].id 		+ ' AS id, "' 	  	 + 
		       							 sponsors[i].name 		+ '" AS name, "' 	 + 
		       							 sponsors[i].details 	+ '" AS details, ' 	 + 
		       							 sponsors[i].exhibitor 	+ ' AS exhibitor, "' +
		       							 sponsors[i].site + '" AS site';
		       		} else {
		       			sponsors_query = sponsors_query + ' UNION SELECT ' + 
		       							 sponsors[i].id			+ ', "' 	 +
		       							 sponsors[i].name 		+ '", "' + 
		       							 sponsors[i].details 	+ '", '  + 
		       							 sponsors[i].exhibitor 	+ ', "'  +
		       							 sponsors[i].site + '"';
		       		}
			    }
		       	for (var i = 0; i < colleges.length; i++) {
		       		if (i == 0){
		       			colleges_query = colleges_query + 'SELECT ' + 
		       							 colleges[i].id 	+ ' AS id, "' +
		       							 colleges[i].name 	+ '" AS name, "' + 
		       							 colleges[i].state 	+ '" AS state';
		       		} else {
		       			colleges_query = colleges_query + ' UNION SELECT ' + 
		       							 colleges[i].id 	+ ', "' +
		       							 colleges[i].name 	+ '", "' + 
		       							 colleges[i].state 	+ '"';
		       		}
			    }
		       	for (var i = 0; i < annotations.length; i++) {
		       		if (i == 0){
		       			annotations_query = annotations_query + 'SELECT ' + 
		       							 	annotations[i].id 		 + ' AS id, "' 		   +
		       							 	annotations[i].latitude  + '" AS latitude, "'  + 
		       							 	annotations[i].longitude + '" AS longitude, "' +
		       							 	annotations[i].title  	 + '" AS title, "'     + 
		       							 	annotations[i].subtitle  + '" AS subtitle, '   +
		       							 	annotations[i].pincolor  + ' AS pincolor, "'   +
		       							 	annotations[i].header 	 + '" AS header';
		       		} else {
		       			annotations_query = annotations_query + ' UNION SELECT ' + 
		       							 	annotations[i].id 		 + ', "'  +
		       							 	annotations[i].latitude  + '", "' + 
		       							 	annotations[i].longitude + '", "' +
		       							 	annotations[i].title  	 + '", "' + 
		       							 	annotations[i].subtitle  + '", '  +
		       							 	annotations[i].pincolor	 + ', "'  +
		       							 	annotations[i].header 	 + '"';
		       		}
			    }
		
				var db = Titanium.Database.open('r3.sqlite');

		    	// empty out current tables
			    db.execute("DELETE FROM competitions");
			    db.execute("DELETE FROM sessions");
			    db.execute("DELETE FROM speakers");
			    db.execute("DELETE FROM sponsors");
			    db.execute("DELETE FROM colleges");
			    db.execute("DELETE FROM annotations");
			    
				// updates tables with new data
			    db.execute(competitions_query);
			    db.execute(sessions_query);
			    db.execute(speakers_query);
			    db.execute(sponsors_query);
			    db.execute(colleges_query);
			    db.execute(annotations_query);
			    db.execute(version_query);
			    
			    db.close();
			    data = null;
			    
			    alert("Your R3 Conference information is now up to date!");
			} // end update function
			
	    } else { // already up-to-date, do nothing
	    	response = null;
	    	appVersion = null;
	    }
	}

	// JSON-formatted header
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    
    xhr.send();
}
exports.syncLocalDatabase = syncLocalDatabase;