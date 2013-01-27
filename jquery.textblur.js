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
				var shadow = $(elem).data("textBlur") || 0;
				return shadow;
			},
			set: function(elem, value) {
				var style = elem.style, color;

				if ( !$(elem).data("textShadow") )  $(elem).data('textShadow', $(elem).css("textShadow"));  /// backs up original text-shadow css, if exists.
				if ( !$(elem).data('color') ) $(elem).data('color', $(elem).css('color')); /// backs up original color
				color = $(elem).data("color");

				if (value !== 0) {

					style.color = 'rgba(0,0,0,0)'; /// some opera versions don't show element if color is "transparent". IE10 does not show either way. :(
					style.textShadow = '0 0 ' + parseInt(value, 10) + 'px ' + color;
					$(elem).data("textBlur", value);

				} else {

					style.color = color;
					style.textShadow = $(elem).data("textShadow");
					$(elem).removeData('color').removeData('textShadow').removeData("textBlur");

				}
			}
		}; // end of css hooks

		$.fx.step['textBlur'] = function(fx){
			$.cssHooks['textBlur'].set(fx.elem, fx.now);
		};


	} /// end of else.

})(jQuery);



