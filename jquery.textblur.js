/*
 * JQuery TextBlur
 * https://github.com/ottonascarella/TextBlur
 * Copyright (c) 2011 Otto Nascarella
 * licensed under the GPL license.
 * http://www.gnu.org/licenses/gpl.html
 */
(function($) {
    var get, set;
	if (!$.browser.msie) {
		var p = $('<p>')[0];
		get = function(elem, computed, extra) {
			var str = elem.style.textShadow;
			if (!str) {
				$(elem).css('text-shadow','rgb(0, 0, 0) 0px 0px 0px');
				return 0;
			}
			return str.split(' ')[5].split('px')[0];
		};

		set = function(elem, value) {
				if (typeof $(elem).data('textShadow') === 'undefined') {
					if (typeof $(elem).css('textShadow') === 'undefined')
						$(elem).data('textShadow', '');
					else
						$(elem).data('textShadow', elem.style.textShadow);
				}
				if (typeof $(elem).data('color') === 'undefined')
						$(elem).data('color', elem.style.color);
	
				if (value !== 0) {
					elem.style.color = 'rgba(0,0,0,0)';
					elem.style.textShadow = '0px 0px ' + parseInt(value) + 'px ' + $(elem).data('color');
				} else {
					elem.style.color = $(elem).data('color');
					elem.style.textShadow = '';
					$(elem).removeData('color');
					$(elem).removeData('textShadow');
				}
		};

		if (typeof p.style.textShadow === "undefined") {
			get = set = function(elem, computed, extra) {};
		}

	} else {
		
		get = function(elem, computed, extra) {
			var str = elem.style.filter;
			if (!str) {
				$(elem).css('filter','progid:DXImageTransform.Microsoft.Blur(pixelradius=0)');
				return 0;
			}
			return str.slice(str.indexOf('radius=')+7,-1);
		};

		set = function(elem, value) {
			if (typeof $(elem).data('filter') == 'undefined') {
				if (typeof $(elem).css('filter') == 'undefined')
					$(elem).data('filter', '');
				else
					$(elem).data('filter', $(elem).css('filter'));
			}
			if (value !== 0)
				$(elem).css('filter', 'progid:DXImageTransform.Microsoft.Blur(pixelradius=' + parseInt(value) + ')');
			else {
				$(elem).css('filter', $(elem).data('filter'));
				$(elem).removeData('filter');
			}
		};

	} /// end of else


    $.cssHooks['textBlur'] = {
        get: get,
		set: set
	}; // end of css hooks
    
    $.fx.step['textBlur'] = function(fx){
		$.cssHooks['textBlur'].set(fx.elem, fx.now);
    };
    
})(jQuery);



