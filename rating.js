$.fn.cdrating = function(options)
{
	var options = $.extend({
		className: 'cd-star',
		classActive: 'cd-active',
		classHover: 'cd-hover',
		count: 5
	},
	options);
	return this.each(function()
	{
		var doc = $(this),
			data = doc.data(),
			rate = parseInt(data.value, 10),
			mode = data.mode,
			name = data.name,
			count = parseInt(data.count, 10);
		doc.removeAttr('data-count data-value');
		if(!count) count = options.count;
		if(!rate) rate = 0;
		else if(rate > count) rate = count;
		for(var i = 0; i < count; i++)
			$('<div class="' + options.className + '"></div>').appendTo(doc);
		if(rate > 0) $('.' + options.className,this).slice(0, rate).addClass(options.classActive);
		if(mode == 'active')
		{
			var input = $('<input type="hidden" name="' + name + '"/>').appendTo(doc);
			doc.removeAttr('data-name data-mode').addClass('grab');
			var item = $('.' + options.className, doc);
			item.hover(
				function()
				{
					var index = $(this).index() + 1;
					item.slice(0, index).addClass(options.classHover);
				},
				function()
				{
					item.removeClass(options.classHover);
				}
			).click(function()
			{
				var index = $(this).index() + 1;
				item.removeClass(options.classActive).slice(0, index).addClass(options.classActive);
				input.val(index);
			});
		}
	});
};
