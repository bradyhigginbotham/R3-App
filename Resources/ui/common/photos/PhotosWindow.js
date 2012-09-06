//Photos Window Component Constructor
function PhotosWindow() {
    var uploadProgress, selectPhoto, takePhoto;

	//ACS Cloud module
	var Cloud = require('ti.cloud');		
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundImage: 'images/bg_bigTex.png',
		backgroundColor: 'transparent',
		title: 'Photo Upload',
		navBarHidden: false
	});
	
	// photo placeholder
	var imageView = Ti.UI.createImageView({
		top: 30,
		left: 30,
		width: 260,
		height: 220
	});
	self.add(imageView);

    var photo;

	// upload
	var uploadButton = Ti.UI.createButton({
		title: 'Upload',
		bottom: 10,
		left: 40,
		right: 40,
		height: 40
	});
	self.add(uploadButton);
	
    // progress bar
    uploadProgress = Ti.UI.createProgressBar({
        bottom: uploadButton.bottom + uploadButton.height + 10,
        right: 40,
        left: 40,
        max: 1,
        min: 0,
        value: 0,
        height: 40,
        style: Ti.UI.iPhone.ProgressBarStyle.BAR
    });
    self.add(uploadProgress);
    uploadProgress.show();
    
    // camera button
    takePhoto = Ti.UI.createButton({
        title: 'Camera',
        bottom: uploadProgress.bottom + uploadProgress.height,
        right: 40,
        width: 110,
        height: 40
    });
    self.add(takePhoto);
    
	// gallery button
    selectPhoto = Ti.UI.createButton({
        title: 'Gallery',
        bottom: uploadProgress.bottom + uploadProgress.height,
        left: 40,
        width: 110,
        height: 40
    });
    self.add(selectPhoto);
    
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
			saveToPhotoGallery:false,
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
		self.remove(imageView);
		self.remove(uploadProgress);
		self.remove(selectPhoto);
		self.remove(takePhoto);
		self.remove(uploadButton);
		
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