var newURL;
var __fsab = {
	__div : null,
	__created  : null,
	__url      : null,
	__debug    : false,

	init   : function()
	{
		this.__debug && console.log('FSAB init');
		this.__create();
	},

	__create : function()
	{
		this.__debug && console.log('FSAB __create');
		this.__div = this.__div || $('<div/>')
			.addClass('addressbar_container')
			.append($('<input id="new_url" size="50" type="text"/>'));
		$(document.getElementsByTagName('body')[0]).append(this.__div);
		this.__created = true;
	},

	show   : function()
	{
		this.__div.show().animate({ opacity : 1 }, 500);
		$('#new_url').focus();
	},

	hide   : function()
	{
		this.__div.animate({ opacity : 0 }, 500, 'swing', (function() {
			this.__div.hide();
		}).bind(this));
	},
	
	redirect : function()
	{
		if(!!(this.__url = $('#new_url').val()) && this.__isValidURL(this.__url)) {
				window.location = this.__gotoURL(this.__url);
		} else {
			if($('#new_url').val()) {
				alert('Please enter a valid URL');
			}
		}
	},
	__isValidURL : function(url)
	{
		return url.indexOf('http') === 0 
			|| url.indexOf('com')  === (url.length - 3)
			|| url.indexOf('google:') === 0
			|| /^[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(url);
	},
	__gotoURL : function(url)
	{
		return url.indexOf('http')    === 0 ? url : 
			   url.indexOf('chrome')  === 0 ? url :
			   url.indexOf('google:') === 0 ? 'http://google.com/search?q=' + escape(url.substr('google:'.length, url.length)) :
			   url.indexOf('bit.ly:') === 0 ? 'http://bit.ly/?url=' + escape(url.substr('bit.ly:'.length, url.length)) :
			   url.indexOf('.com')    === (url.length - 4) ? 'http://' + url :
			   url.indexOf('.ly')     === (url.length - 3) ? 'http://' + url :
			   url
	}
};

__fsab.init();

$(window).keyup(function(evt) {
	// ESC key
	(evt.keyCode === 27) && __fsab.hide();
});

$(window).keypress(function(evt) {
	// CTRL+L
	(evt.keyCode === 12) && __fsab.show();
	// Enter
	(evt.keyCode === 13) && __fsab.redirect();
	// Tilde (~) key
	(evt.keyCode === 96) && __fsab.hide(); 
});

