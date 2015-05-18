$('body').dropzone({
	url: '/uploads',
	method: 'post',
	clickable: '#mydropzone-box',
	previewsContainer: '#previews',
	autoQueue: true,
	autoProcessQueue: false,
	maxFilesize: 50,
	parallelUploads: 5,
	acceptedFiles: 'image/jpeg',
	uploadMultiple: false,
	createImageThumbnails: true,
	thumbnailWidth: 250,
	thumbnailHeight: 300,
	maxThumbnailFilesize: 10,
	addRemoveLinks: true,
	dictFileTooBig: 'ขนาด {{filesize}}MB นี่มันใหญ่เกินไปแล้ว จำกัดไม่เกิน {{maxFilesize}}MB',
	dictInvalidFileType: 'ระบบเน้นความรวดเร็วของกระบวนการผลิต จึงรับเฉพาะไฟล์ภาพนามสกุล JPG เท่านั้น',
	dictResponseError: 'เกิดความผิดพลาดรหัส {{statusCode}}',
	dictCancelUpload: 'ยกเลิก',
	dictCancelUploadConfirmation: 'แน่ใจเหรอว่าจะยกเลิก',
	dictRemoveFile: 'เอาไฟล์นี้ออก',
	dictRemoveFileConfirmation: null,
	dictMaxFilesExceeded: 'อัพโหลดไฟล์ได้ครั้งละไม่เกิน {{parallelUploads}} ไฟล์',
	init: function() {
		var _this = this;
		var submitBn = document.querySelector('#application-submit');
		var resetBn = document.querySelector('#application-reset');
		submitBn.addEventListener('click', function(){_this.processQueue();});
		resetBn.addEventListener('click', function(){_this.removeAllFiles();});
		this.on('addedfile', function(file) {
			$('#' + file.previewElement.id + ' .dz-details').append('<div class="on-addedfile"></div>');
			$('#' + file.previewElement.id + ' .on-addedfile').html('<h2>กำลังอ่านไฟล์... </h2> <h2>โปรดรอสักครู่...</h2>'
				+	'<br/> อาจใช้เวลานานหากไฟล์มีขนาดใหญ่'
				+	'<br/> เมื่ออ่านไฟล์เสร็จ กรุณากรอกรายละเอียดให้ครบถ้วน'
			);
		});
		this.on('thumbnail', function(file, thumbnail) {
			artwork_thumbnail(file);
		});
		this.on('no-thumbnail', function(file) {
			artwork_thumbnail(file);
		});
	}
});
var artwork_thumbnail = function (file){
	$('#application-msg').text('เพิ่มไฟล์ ' + file.name + ' แล้ว');
	$('#' + file.previewElement.id + ' .on-addedfile').fadeOut(500);
	setTimeout(function(){$('#' + file.previewElement.id + ' .on-addedfile').remove();},500);
	artwork_type(file.previewElement.id);
};
var artwork_type = function (id){
	$('#' + id + ' .dz-details').append(
		'<ul class="artwork-type">'
		+	'<li><input name="' + id + '-type" type="radio" value="0" onclick="artwork_mat(' + id + ', this.value);artwork_option(' + id + ',this.value,0);artwork_meta(' + id + ');" checked /><label>Outdoor</label></li>'
		+	'<li><input name="' + id + '-type" type="radio" value="1" onclick="artwork_mat(' + id + ', this.value);artwork_option(' + id + ',this.value,0);artwork_meta(' + id + ');" /><label>Indoor</label></li>'
		+	'<li><input name="' + id + '-type" type="radio" value="2" onclick="artwork_mat(' + id + ', this.value);artwork_option(' + id + ',this.value,0);artwork_meta(' + id + ');" /><label>Outdoor HD</label></li>'
		+'</ul>'
	);
	artwork_mat(id,0);
	artwork_option(id,0,0);
	artwork_meta(id);
};
var artwork_mat = function (id, art_type){
	var art_mat = id + '-mat';
	var e;
	var type = new Array(
		new Array('Vinyl','PVC','SeeThrough'),
		new Array('Glossy','Photo','PVC','PP'),
		new Array('Vinyl','PVC','SeeThrough')
	);
	e = '<ul id="' + id + '-artwork-mat" class="artwork-mat">';
	for(i=0;i<type[art_type].length;i++){
		if(i==0){e += '<li><input name="' + art_mat + '" type="radio" value="' + i + '" onclick="artwork_option(' + id + ', ' + art_type + ', this.value)" checked /><label>' + type[art_type][i] + '</label></li>';}
		else{e += '<li><input name="' + art_mat + '" type="radio" value="' + i + '" onclick="artwork_option(' + id + ', ' + art_type + ', this.value)" /><label>' + type[art_type][i] + '</label></li>';}
	}
	e += '<li><input name="' + art_mat + '" type="radio" value="' + i++ + '" onclick="artwork_option(' + id + ',' + art_type + ', this.value)" /><label>ดูที่หมายเหตุ</label></li>';
	e += '</ul>';
	if ($('#' + id + '-artwork-mat').length){$('#' + id + '-artwork-mat').replaceWith(e);}
	else{$('#' + id + ' .dz-details').append(e);}
};
var artwork_option = function (id,art_type,art_mat){
	var art_opt = id + "-option";
	var e;
	var option = new Array(
		new Array(
			new Array('ตาไก่','ปล่อยขอบ','พับขอบ','ร้อยท่อ','ร้อยเชือก','ยิงโครงไม้'),
			new Array('----------','เคลือบเงา','เคลือบด้าน','บอร์ด 3mm','บอร์ด 5mm'),
			new Array('----------'),
			new Array()
		),
		new Array(
			new Array('เคลือบเงา','เคลือบด้าน','RollUp','X-Stand'),
			new Array('เคลือบเงา','เคลือบด้าน','RollUp','X-Stand'),
			new Array('เคลือบเงา','เคลือบด้าน','บอร์ด 3mm','บอร์ด 5mm'),
			new Array('เคลือบเงา','เคลือบด้าน','บอร์ด 3mm','บอร์ด 5mm'),
			new Array()
		),
		new Array(
			new Array('ตาไก่','ปล่อยขอบ','พับขอบ','ร้อยท่อ','ร้อยเชือก','ยิงโครงไม้'),
			new Array('----------','เคลือบเงา','เคลือบด้าน','บอร์ด 3mm','บอร์ด 5mm'),
			new Array('----------'),
			new Array()
		)
	);
	e = '<ul id="' + id + '-artwork-option" class="artwork-option">';
	for(i=0;i<option[art_type][art_mat].length;i++){
		if(i==0){e += '<li><input name="' + art_opt + '" type="radio" value="' + i + '" checked /><label>' + option[art_type][art_mat][i] + '</label></li>';}
		else{e += '<li><input name="' + art_opt + '" type="radio" value="' + i + '" /><label>' + option[art_type][art_mat][i] + '</label></li>';}
	}
	if(option[art_type][art_mat].length == 0){
		e += '<li><input name="' + art_opt + '" type="radio" value="' + i++ + '" checked /><label>ดูที่หมายเหตุ</label></li>';
	}else{
		e += '<li><input name="' + art_opt + '" type="radio" value="' + i++ + '" /><label>ดูที่หมายเหตุ</label></li>';
	}
	e += '</ul>';
	if ($('#' + id + '-artwork-option').length){$('#' + id + '-artwork-option').replaceWith(e);}
	else{$('#' + id + ' .dz-details').append(e);}
	artwork_meta(id);
};
var artwork_meta = function (id){
	e1 = '<div id="' + id + '-artwork-meta" class="artwork-meta">'
	+	'<input name="' + id + '-width" class="input-text-width" type="text" size="0" placeholder="กว้าง" value="" onchange="" /> x '
	+	'<input name="' + id + '-height" class="input-text-height" type="text" size="0" placeholder="สูง" value="" onchange="" /><br/>'
	+	'<input name="' + id + '-amount" class="input-text-amount" type="text" size="0" placeholder="จำนวน" value="" onchange="" />'
	+	'<input name="' + id + '-comment" class="input-text-comment" type="text" size="0" placeholder="หมายเหตุ" value="" onchange="" />'
	+'</div>';

	e2 = '<div id="' + id + '-artwork-urgently" class="input-checkbox-urgently">'
	+	'<input name="' + id + '-urgently" type="checkbox" value="1" /><label>ขอด่วน</label>'
	+'</div>';
	if ($('#' + id + '-artwork-meta').length){$('#' + id + '-artwork-meta').replaceWith(e1);$('#' + id + '-artwork-urgently').replaceWith(e2);}
	else{$('#' + id + ' .dz-details').append(e1);$('#' + id + ' .dz-details').append(e2);}
};
