$("body").dropzone({
	url: "/uploads",
	method: "post",
	clickable: "#mydropzone-box",
	previewsContainer: "#previews",
	autoQueue: true,
	autoProcessQueue: false,
	maxFilesize: 1024,
	parallelUploads: 5,
	//acceptedFiles: "image/*",
	uploadMultiple: false,
	createImageThumbnails: true,
	thumbnailWidth: 250,
	thumbnailHeight: 180,
	maxThumbnailFilesize: 10,
	addRemoveLinks: true,
	init: function() {
		var submitButton = document.querySelector("#application-submit");
		_this = this;
		submitButton.addEventListener("click", function() {
			_this.processQueue();
		});
		var resetButton = document.querySelector("#application-reset");
		_this = this;
		resetButton.addEventListener("click", function() {
			_this.removeAllFiles();
		});
	}
});
