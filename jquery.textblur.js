/* 
 * JQuery TextBlur Filter
 * https://github.com/ottonascarella/TextBlur
 * Copyright (c) 2011 Otto Nascarella
 * licensed under the LGPL Version 3 license.
 * http://www.gnu.org/licenses/lgpl.html 
 */
(function($) {
    
    $.cssHooks['textBlur'] = {
        get: function(elem, computed, extra){
        	if (!$.browser.msie) {
        		var str = $(elem).css('text-shadow');
	          if (str == 'none') {
	            $(elem).css('text-shadow','rgb(0, 0, 0) 0px 0px 0px');
	            return 0;
	          }
	          return str.split(' ')[5].split('px')[0];
          } else {
        		var str = $(elem).css('filter');
	          if (str == 'none') {
	            $(elem).css('filter','progid:DXImageTransform.Microsoft.Blur(pixelradius=0)');
	            return 0;
	          }
	          return str.slice(str.indexOf('radius=')+7,-1);          
          }
        }, // end of get
        set: function(elem, value) {
        	if (!$.browser.msie) {
	        	if (typeof $(elem).data('textShadow') == 'undefined') {
							if (typeof $(elem).css('textShadow') == 'undefined')
								$(elem).data('textShadow', '');
							else
								$(elem).data('textShadow', $(elem).css('textShadow'));
						}
						if (typeof $(elem).data('color') == 'undefined') $(elem).data('color', $(elem).css('color'));
	
						if (value != 0) {
							$(elem).css({color: 'transparent', textShadow: '0px 0px ' + parseInt(value) + 'px ' + $(elem).data('color') }); 
						}
						else {
							$(elem).css({color: $(elem).data('color'), textShadow: ''});
							$(elem).removeData('color');
							$(elem).removeData('textShadow'); 
						}
					} else {
	        	if (typeof $(elem).data('filter') == 'undefined') {
							if (typeof $(elem).css('filter') == 'undefined')
								$(elem).data('filter', '');
							else
								$(elem).data('filter', $(elem).css('filter'));
						}
	
						if (value != 0)
							$(elem).css('filter', 'progid:DXImageTransform.Microsoft.Blur(pixelradius=' + parseInt(value) + ')');
						else 
							$(elem).css('filter', $(elem).data('filter'));
							$(elem).removeData('filter');						
					}
				} // end of set
    }; // end of css hooks
    
    $.fx.step['textBlur'] = function(fx){
        $.cssHooks['textBlur'].set(fx.elem, fx.now);
    };
    
})(jQuery);



