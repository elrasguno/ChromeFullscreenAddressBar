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
		this.__div.show()
		$('#new_url').focus();
	},

	hide   : function()
	{
		this.__div.hide();
	},
	
	redirect : function()
	{
		if(!!(this.__url = $('#new_url').val()) && 
			(this.__url.indexOf('http') === 0 || this.__url.indexOf('com') === this.__url.length - 3 )) {
				window.location = (this.__url.indexOf('http') === 0 ? this.__url : 'http://' + this.__url);
		} else {
			if($('#new_url').val()) {
				alert('Please enter a valid URL');
			}
		}
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

