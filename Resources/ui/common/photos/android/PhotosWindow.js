//Photos Window Component Constructor
function PhotosWindow() {
	var deviceHeight = Ti.Platform.displayCaps.platformHeight;
	var deviceWidth = Ti.Platform.displayCaps.platformWidth;
    var uploadProgress, selectPhoto, takePhoto;

	//ACS Cloud module
	var Cloud = require('ti.cloud');		
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundImage: 'images/bg_bigTex.png',
		title: 'Photo Upload',
		navBarHidden: false
	});
	
	var contentView = Ti.UI.createView({
		layout: 'vertical',
		top: deviceHeight * 0.0125,
		bottom: deviceHeight * 0.0125,
		left: deviceWidth * (40/480),
		right: deviceWidth * (40/480)
	});
	self.add(contentView);
	
	// photo placeholder
	var imageView = Ti.UI.createImageView({
		top: 0,
		left: 0,
		right: 0,
		height: deviceHeight * 0.6
	});
	contentView.add(imageView);
	
	var buttonsView = Ti.UI.createView({
		top: deviceHeight * 0.0375,
		left: 0,
		right: 0,
		height: deviceHeight * 0.0625
	});
	contentView.add(buttonsView);
	
	// gallery button
    selectPhoto = Ti.UI.createButton({
        title: 'Gallery',
        top: 0,
        left: 0,
        width: '45%',
        height: deviceHeight * 0.0625
    });
    buttonsView.add(selectPhoto);

    // camera button
    takePhoto = Ti.UI.createButton({
        title: 'Camera',
        top: 0,
        right: 0,
        width: '45%',
        height: deviceHeight * 0.0625
    });
    buttonsView.add(takePhoto);

    // progress bar
    uploadProgress = Ti.UI.createProgressBar({
        top: 0,
        right: 0,
        left: 0,
        max: 1,
        min: 0,
        value: 0,
        height: deviceHeight * 0.075,
        style: Ti.UI.iPhone.ProgressBarStyle.BAR
    });
    contentView.add(uploadProgress);
    uploadProgress.show();
    
	// upload
	var uploadButton = Ti.UI.createButton({
		title: 'Upload',
		top: deviceHeight * 0.0375,
		left: 0,
		right: 0,
		height: deviceHeight * 0.0625
	});
	contentView.add(uploadButton);

    var photo;
    
    // event listeners
    selectPhoto.addEventListener('click', function (evt) {
        Ti.Media.openPhotoGallery({
            success: function (e) {
                photo = e.media;
                imageView.image = photo;
            }
        });
    });
    
    takePhoto.addEventListener('click', function (evt) {
        Ti.Media.showCamera({
            success: function (e) {
				photo = e.media;
				imageView.image = photo;
            },
			saveToPhotoGallery:true,
			allowEditing:true,
			mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
        });
    });
    
	uploadButton.addEventListener('click', function(){
		// no photo
        if (!photo) {
            alert('Please provide a photo!');
            return;
        };
        // progress bar updates
        Cloud.onsendstream = function (evt) {
            uploadProgress.value = evt.progress * 0.5;
        };
        Cloud.ondatastream = function (evt) {
            uploadProgress.value = (evt.progress * 0.5) + 0.5;
        };
        
        // login and upload photo
        Cloud.Users.login({
		    login: 'default',
		    password: 'r3AITPconference!'
		}, function (e) {
		    if (e.success) {
		        var user = e.users[0];
				Cloud.Photos.create({
				    photo: photo,
				    'photo_sync_sizes[]': 'small_240'
				}, function(e) {
		            Cloud.onsendstream = Cloud.ondatastream = null;
				    if (e.success) {
						// null out our photo objects to clean up memory
				        photo = null;
				        collectionID = null;
				        alert('Photo successfully uploaded!');
				    } else {
				        alert('An error occurred during upload.');
				    }
				});
		    } else {
				alert('There was an error during upload.');
		    }
		});	
	});
	
	self.addEventListener('close', function(){
		self.remove(contentView);
		
		imageView = null;
		uploadProgress = null;
		selectPhoto = null;
		takePhoto = null;
		uploadButton = null;
		self = null;
	});
	
	return self;
}

//make constructor function the public component interface
module.exports = PhotosWindow;