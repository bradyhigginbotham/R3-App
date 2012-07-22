//Photos Window Component Constructor
function PhotosWindow() {
    var uploadProgress, selectPhoto, takePhoto;

	//ACS Cloud module
	if(Ti.Platform.osname === "android"){
		var Cloud = require('ti.cloudpush');
	} else {
		var Cloud = require('ti.cloud');		
	}
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#5C728B',
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
    
    if (Ti.UI.createProgressBar) {
        uploadProgress = Ti.UI.createProgressBar({
            bottom: 60, right: 10, left: 10,
            max: 1, min: 0, value: 0,
            height: 25
        });
        self.add(uploadProgress);
        uploadProgress.show();
    };

    var photo;

    if (Ti.Media.openPhotoGallery) {
        selectPhoto = Ti.UI.createButton({
            title: 'Gallery',
            bottom: 95, left: 40,
            width: 110,
            height: 40
        });
        selectPhoto.addEventListener('click', function (evt) {
            Ti.Media.openPhotoGallery({
                success: function (e) {
                    photo = e.media;
                    imageView.image = photo;
                }
            });
        });
        self.add(selectPhoto);
    }
    if (Ti.Media.showCamera) {
        takePhoto = Ti.UI.createButton({
            title: 'Camera',
            bottom: 95, right: 40,
            width: 110,
            height: 40
        });
        takePhoto.addEventListener('click', function (evt) {
            Ti.Media.showCamera({
                success: function (e) {
                    photo = e.media;
                },
				saveToPhotoGallery:false,
				allowEditing:true,
				mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
            });
        });
        self.add(takePhoto);
    }


	// assumes you've obtained a photo from the camera or gallery, with blob data stored in an object named photo
	// collectionID is an ID generated by ACS for a grouping of photos, you could retrieve via code or hard-code it
	var uploadButton = Ti.UI.createButton({
		title: 'Upload',
		bottom: 10,
		left: 40,
		right: 40,
		height: 40
	});
	self.add(uploadButton);
	
	uploadButton.addEventListener('click', function(){
		// no photo
        if (!photo) {
            alert('Please provide a photo!');
            return;
        };
        // progress bar updates
        if (Ti.UI.createProgressBar) {
            Cloud.onsendstream = function (evt) {
                uploadProgress.value = evt.progress * 0.5;
            };
            Cloud.ondatastream = function (evt) {
                uploadProgress.value = (evt.progress * 0.5) + 0.5;
            };
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
				alert('An error occurred during upload.');
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