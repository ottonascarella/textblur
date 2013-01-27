/*
 * JQuery TextBlur
 * https://github.com/ottonascarella/TextBlur
 * Copyright (c) 2011 Otto Nascarella
 * licensed under the GPL 2 license.
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($, undefined) {
    var get, set, p = $('<p>')[0];

	if (!!p.style.textShadow) {

		return;  /// there's no textShadow? Exit plugin register...

	} else {

		$.cssHooks['textBlur'] = {
			get: function(elem, computed, extra) {
				var shadow = elem.style.textShadow;
				
				if (!shadow)
					return false;

				else {
					shadow = shadow.split(' ')[5] || shadow.split(' ')[2]; /// IE10 returns different string pattern for text-shadow;
					return shadow.split('px')[0];
				}

			},
			set: function(elem, value) {
				var style = elem.style, color;

				if ( !$(elem).data("textShadow") )  $(elem).data('textShadow', style.textShadow);  /// backs up original text-shadow css, if exists.
				if ( !$(elem).data('color') ) $(elem).data('color', $(elem).css('color')); /// backs up original color
				color = $(elem).data("color");

				if (value !== 0) {

					style.color = 'rgba(0,0,0,0)'; /// some opera versions don't show element if color is "transparent". IE10 does not show either way. :(
					style.textShadow = '0px 0px ' + parseInt(value, 10) + 'px ' + color;

				} else {

					style.color = color;
					style.textShadow = '';
					$(elem).removeData('color').removeData('textShadow');

				}
			}
		}; // end of css hooks

		$.fx.step['textBlur'] = function(fx){
			$.cssHooks['textBlur'].set(fx.elem, fx.now);
		};


	} /// end of else.

})(jQuery);



