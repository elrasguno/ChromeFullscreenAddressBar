//alert('content script test');
//alert($(document.getElementsByTagName('body')[0]).append('woot'));
//$(document.body).append(myDiv);
var newURL;
var myDiv;
$(document.body).keypress(function(evt) {
	// CTRL+L
	if(evt.keyCode === 12) {
		$('.addressbar_container').show();
		myDiv = myDiv || $('<div/>')
			.addClass('addressbar_container')
			.append($('<input id="new_url" size="50" type="text"/>'));
		$(document.getElementsByTagName('body')[0]).append(myDiv);
		$('#new_url').focus();
	}
	// Enter
	if(evt.keyCode === 13) {
		if(!!(newURL = $('#new_url').val()) && 
				(newURL.indexOf('http') === 0 || newURL.indexOf('com') === newURL.length - 3 )) {
			window.location = (newURL.indexOf('http') === 0 ? newURL : 'http://' + newURL);
		} else {
			alert('Please enter a valid URL: ' + (newURL.length - 3));
		}
	}
	
	// Tilde (~) key
	// TODO: learn to target the escape key
	if(evt.keyCode === 96) {
		$('.addressbar_container').hide();
	}
});

