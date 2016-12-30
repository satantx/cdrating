$.fn.StarRating = function(options)
{
	var options = $.extend({
		className: 'cad-star',
		classActive: 'active',
		classHover: 'cad-hover',
		default_stars_cnt: 5
	},
	options);
	return this.each(function()
	{
		var doc = $(this),
			data = doc.data(),
			rate = parseInt(data.value, 10),
			mode = data.mode,
			name = data.name,
			stars_cnt = parseInt(data.starsCnt, 10);
		doc.removeAttr('data-stars-cnt data-value');
		if(!stars_cnt) stars_cnt = options.default_stars_cnt;
		if(!rate) rate = 0;
		else if(rate > stars_cnt) rate = stars_cnt;
		for(var i = 0; i < stars_cnt; i++)
			$('<div class="' + options.className + '">&#9733;</div>').appendTo(doc);
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
