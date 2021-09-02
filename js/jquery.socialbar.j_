(function($) {

	//	Register Plugin
	$.fn.socialbar = function(method) {

		//	Arguments
		var theArgs = arguments;

		//	Check for Method Call
		if (SocialBar[method] && method.substr(0, 1) != '_') {

			//	Loop Each
			return $(this).each(function() {

				//	Get the Object
				var sbObj = $(this).data('sb-object');

				//	Check
				if(sbObj) {

					//	Call Method
					return sbObj[method].apply( this, Array.prototype.slice.call( theArgs, 1 ));
				}
			});
		} else if (typeof method === 'object' || !method) {

			//	Settings
			var settings = $.extend({}, $.socialbar.defaults, method);

			//	Loop Each
			return $(this).each(function() {

				//	Create Instance
				new SocialBar._init(this, settings);
			});
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.socialbar' );
		}
	};


	//	Define Object and Defaults
	$.socialbar = {};
	$.socialbar.defaults = {
		buttons: {},
		position: 'left',
		responsive: true,
		mobile_title: 'Share this Page',
		beforeRender: function() {},
		afterRender: function() {},
		ready: function() {}
	};


	//	Social Bar Object
	var SocialBar = {

		//	Elem
		_elem: null,

		//	Settings
		_settings: null,

		//	Trigger
		_triggerElem: null,


		//	Init
		_init: function( elem, settings ) {

			//	This
			var $elem = $(elem);

			//	Store
			this._elem = $elem;

			//	Individual Settings
			var theSettings = loadProps($elem, settings);

			//	Setup Fillup
			theSettings.fillup = (typeof theSettings.buttons == 'object' && !$.isEmptyObject(theSettings.buttons));

			//	Store Object & Settings
			$elem.data('sb-object', this);

			//	Store Settings
			this._settings = theSettings;

			//	Trigger Before Render
			this._trigger('beforeRender');

			//	Check Fillup
			if(theSettings.fillup) {

				//	Load the Template
				this._loadHTML();
			}

			//	That
			var that = this;

			//	Listen Window Resize
			$(window).resize(function() {

				//	Refresh View
				that.refresh();
			});

			//	Refresh View
			this.refresh();

			//	Trigger After Render
			this._trigger('afterRender');

			//	Setup Trigger
			this._setupTrigger();

			//	Attach Events
			this._attachEvents();

			//	Trigger when Ready
			this._trigger('ready');
		},

		//	Attach Events
		_attachEvents: function() {

			//	That
			var that = this;

			//	Listen for Hover
			this._elem.find('.social-item a').on({

				//	Hover
				mouseover: function() {

					//	Add Class
					$(this).addClass('open');
				},

				//	Out
				mouseout: function() {

					//	Remove Class
					$(this).removeClass('open');
				}
			});

			//	Listen for Trigger
			this._triggerElem.click(function(e) {

				//	Check
				if(that._elem.hasClass('open')) {

					//	Hide
					that._elem.removeClass('open');
					$(this).find('.fa-close').addClass('hidden');
					$(this).find('.fa-share-alt').removeClass('hidden');
				} else {

					//	Show
					that._elem.addClass('open');
					$(this).find('.fa-close').removeClass('hidden');
					$(this).find('.fa-share-alt').addClass('hidden');
				}

				//	Prevent Default
				e.preventDefault();
				return false;
			});

			//	Listen for Wrapper Tap
			this._elem.find('.socialbar-wrapper').click(function(e) {

				//	Check
				if($(e.target).hasClass('socialbar-wrapper')) {

					//	Close the Overlay
					that._triggerElem.click();
				}
			});
		},

		//	Setup Trigger for Small Screen
		_setupTrigger: function() {

			//	Check
			if(this._settings.responsive) {

				//	Check
				if(!this._triggerElem || this._triggerElem.length < 1) {

					//	Create
					this._triggerElem = $('<a href="#" class="socialbar-trigger"><i class="fa fa-share-alt"></i><i class="fa fa-close hidden"></i></a>');

					//	Append to Body
					$(document.body).append(this._triggerElem);
				}
			}
		},

		//	Load HTML
		_loadHTML: function() {

			//	Get the Buttons
			var buttons = this._settings.buttons;

			//	Html
			var html = '<div class="socialbar-wrapper"><h5 class="visible-xs">' + this._settings.mobile_title + '</h5><ul>';

			//	Loop
			for(var i in buttons) {

				//	Append
				html += '<li class="social-item social-item-' + i + '"><a href="' + buttons[i].url + '" target="_blank"><span class="icon"><i class="fa fa-' + i + '"></i></span> <span class="label">' + buttons[i].label + '</span></a></li>';
			}

			//	End
			html += '</ul></div>';

			//	Set HTML
			this._elem.html(html);
		},

		//	Trigger Event
		_trigger: function( eventName, args ) {

			//	Trigger jQuery Event
			this._elem.trigger('sb.' + eventName, args);

			//	Check for Event Callback
			if(typeof this._settings[eventName] == 'function') {

				//	Trigger
				this._settings[eventName].apply(this._elem, args);
			}
		},


		//	Get Option
		option: function(key, val) {

			//	Check
			if( typeof val == 'undefined' ) {

				//	Return
				return ( this._settings.hasOwnProperty(key) ? this._settings[key] : null);
			}

			//	Set
			this._settings[key] = val;

			//	Refresh View
			this.refresh();

			//	Return
			return this._elem;
		},

		//	Refresh View
		refresh: function() {

			//	Check for Small Screen
			var isSmallScreen = window.innerWidth < 1040;

			//	Remove Classes
			this._elem.removeClass('pos-left').removeClass('pos-right').removeClass('full-overlay').removeClass('open').removeClass('hidden');

			//	Add Classes
			if(!isSmallScreen)	this._elem.addClass('pos-' + this._settings.position);
			if(isSmallScreen && this._settings.responsive)	this._elem.addClass('full-overlay');
			if(isSmallScreen && !this._settings.responsive)	this._elem.addClass('hidden');
		}
	};

	//	Set Prototype
	SocialBar._init.prototype = SocialBar;


	//	Listen Document Load
	$(document).ready(function() {

		//	Init
		$("[data-socialbar=true]").socialbar();
	});


	//	Load the Properties
	function loadProps($cont, obj) {

		//	Loop Each
		for(var i in obj) {

			//	Check
			if(typeof obj[i] != 'function' && $cont.data('sb-' + i)) {

				//	Set
				obj[i] = $cont.data('sb-' + i);
			}
		}

		//	Return
		return obj;
	}

})(jQuery);