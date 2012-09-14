/*------- Update Application Database -------*/
function syncLocalDatabase(osname){
	// create request client
    var xhr = Ti.Network.createHTTPClient(); 
    
    // script to grab new conference information
    xhr.open("GET", 'http://bradysblog.com/r3conference/update.php');
    
    // die silently
    xhr.onerror = function(e){};
    
    xhr.onload = function(e){
    	var data = JSON.parse(this.responseText);
    	
    	// set table variables
    	var competitions = data.competitions;
    	var sessions = data.sessions;
    	var speakers = data.speakers;
    	var sponsors = data.sponsors;
    	var colleges = data.colleges;
    	var annotations = data.annotations;
    	
    	// initialize queries
    	//var competitions_query = "INSERT INTO 'competitions' SELECT 'competition' AS 'column1', 'data2' AS 'column2'
    	var speakers_query = "INSERT INTO 'speakers' ";
    	var sessions_query = "INSERT INTO 'sessions' ";

		// set queries
       	for (var i = 0; i < speakers.length; i++) {
       		if (i == 0){
       			speakers_query = speakers_query + 'SELECT ' + speakers[i].id + ' AS id, "' + speakers[i].name + '" AS name, "' + speakers[i].title + '" AS title, "' + speakers[i].bio + '" AS bio';
       		} else {
       			speakers_query = speakers_query + ' UNION SELECT ' + speakers[i].id + ', "' + speakers[i].name + '", "' + speakers[i].title + '", "' + speakers[i].bio + '"';
       		}
	    }
       	for (var i = 0; i < sessions.length; i++) {
       		if (i == 0){
       			sessions_query = sessions_query + "SELECT " + sessions[i].id + " AS 'id', '" + sessions[i].title + "' AS 'title', '" + sessions[i].details + "' AS 'details', '" + sessions[i].location + "' AS 'location', '" +
       							 sessions[i].start + "' AS 'start', '" + sessions[i].end + "' AS 'end', " + sessions[i].speaker_id + " AS 'speaker_id', " + sessions[i].schedule_id + " AS 'schedule_id'";
       		} else {
       			sessions_query = sessions_query + " UNION SELECT " + sessions[i].id + ", '" + sessions[i].title + "', '" + sessions[i].details + "', '" + sessions[i].location + "', '" +
       							 sessions[i].start + "', '" + sessions[i].end + "', " + sessions[i].speaker_id + ", " + sessions[i].schedule_id;
       		}
	    }

    	// empty out current tables
		var db = Titanium.Database.open('r3.sqlite');
	    db.execute("DELETE FROM competitions");
	    db.execute("DELETE FROM sessions");
	    db.execute("DELETE FROM speakers");
	    db.execute("DELETE FROM sponsors");
	    db.execute("DELETE FROM colleges");
	    db.execute("DELETE FROM annotations");
	    
		// updates tables with new data
	    db.execute(speakers_query);
	    db.execute(sessions_query);
	    db.close();
	    
	    alert(sessions_query);
	    
	}

	// JSON-formatted header
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    
    xhr.send();
}
exports.syncLocalDatabase = syncLocalDatabase;