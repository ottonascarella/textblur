/*
* JQuery TextBlur Filter
* https://github.com/ottonascarella/TextBlur
* Copyright (c) 2011 Otto Nascarella
* licensed under the LGPL Version 3 license.
* http://www.gnu.org/licenses/lgpl.html
*/
;(function($) {
	$.cssHooks['textBlur'] = {
		get: (function() {
			var func;
			if (!$.browser.msie) {
				func = function(elem, computed, extra) {
					var str = $(elem).css('textShadow');
					if (str === 'none' || str === "") {
						$(elem).css('textShadow', 'none');
						return 0;
					}
					return str.slice(str.lastIndexOf(" ")+1);
				};
			} else {
				func = function(elem, computed, extra) {
					var str = $(elem).css('filter');
					if (str === 'none') {
						$(elem).css('filter', 'progid:DXImageTransform.Microsoft.Blur(pixelradius=0)');
						return 0;
					}
					return str.slice(str.lastIndexOf('radius=')+1, str.lastIndexOf(')'));
				};
			}
			return func;
		}()),
		// end of get
		set: (function() {
			var func;
			if (!$.browser.msie) {
				func = function(elem, value) {
					if (!$(elem).data().textShadow) {
						if ($(elem).css('textShadow') === "none") $(elem).data('textShadow', 'none');
						else $(elem).data('textShadow', $(elem).css('textShadow'));
					}
					
					if (!$(elem).data().color) $(elem).data('color', $(elem).css('color'));

					if (value !== 0) {
						$(elem).css({
							color: 'rgba(0,0,0,0)',
							textShadow: '0px 0px ' + parseInt(value,10) + 'px ' + $(elem).data('color')
						});
					} else {
						$(elem).css({
							color: $(elem).data('color'),
							textShadow: $(elem).data('textShadow')
						});
						$(elem).removeData('color').removeData('textShadow');
					}
				};
			} else {
				func = function(elem, value) {
					if (!$(elem).data().filter) {
						if ($(elem).css('filter') === 'none') $(elem).data('filter', '');
						else $(elem).data('filter', $(elem).css('filter'));
					}

					if (value !== 0) $(elem).css('filter', 'progid:DXImageTransform.Microsoft.Blur(pixelradius=' + parseInt(value,10) + ')');
					else $(elem).css('filter', $(elem).data('filter'));
					$(elem).removeData('filter');
				};
			}
		return func;
		}()) // end of set
	}; // end of css hooks
	$.fx.step['textBlur'] = function(fx) {
		$.cssHooks['textBlur'].set(fx.elem, fx.now);
	};

})(jQuery);