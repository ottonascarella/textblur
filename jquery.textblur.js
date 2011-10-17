/* 
 * JQuery TextBlur Filter
 * Copyright (c) 2011 Otto Nascarella
 * licensed under the LGPL Version 3 license.
 * http://www.gnu.org/licenses/lgpl.html 
 * please do not forget to send any changes/improvements to the source >> contact@webrecipe.net
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
	        	if (typeof $(elem).data('style') == 'undefined') {
							if (typeof $(elem).attr('style') == 'undefined')
								$(elem).data('style', 'none');
							else
								$(elem).data('style', $(elem).attr('style'));
						}
						if (typeof $(elem).data('color') == 'undefined') $(elem).data('color', $(elem).css('color'));
	
						if (value != 0) {
							$(elem).css({color: 'transparent', textShadow: '0px 0px ' + parseInt(value) + 'px ' + $(elem).data('color') }); 
						}
						else {
							if ($(elem).data('style') == 'none')
								$(elem).removeAttr('style');
							else 
								$(elem).attr('style', $(elem).data('style'));
						}
					} else {
	        	if (typeof $(elem).data('style') == 'undefined') {
							if (typeof $(elem).attr('style') == 'undefined')
								$(elem).data('style', 'none');
							else
								$(elem).data('style', $(elem).attr('style'));
						}
	
						if (value != 0)
							$(elem).css('filter', 'progid:DXImageTransform.Microsoft.Blur(pixelradius=' + parseInt(value) + ')');
						else {
							if ($(elem).data('style') == 'none')
								$(elem).removeAttr('style');
							else 
								$(elem).attr('style', $(elem).data('style'));
						}
						
					}
				} // end of set
    }; // end of css hooks
    
    $.fx.step['textBlur'] = function(fx){
        $.cssHooks['textBlur'].set(fx.elem, fx.now);
    };
    
})(jQuery);



