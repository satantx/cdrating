$.fn.cdrating = function(options) {

	var options = $.extend({
		className: 'cd-star',
		classActive: 'active'
	},options);

	return this.each(function(){
		var doc = $(this),
				data_options = doc.data(),
				options_rate = data_options.rate,
				options_mode = data_options.mode,
				name_input = data_options.nameInput;

		for (var i = 0; i < 5; i++) {
			$("<div class='"+options.className+"'>&#9733;</div>").appendTo(doc);
		};

		doc.removeAttr('data-rate');

		if (options_rate > 0) $('.'+options.className,this).slice(0, options_rate).addClass(options.classActive);

		if (options_mode == 'rating') {

			$("<input type='hidden' name='"+name_input+"'/>").appendTo(doc);
			doc.removeAttr('data-name-input data-mode');

			doc.addClass('grab');

			$('.'+options.className,doc).hover(function() {
				var index = $(this).index() + 1;
				$('.'+options.className,doc).slice(0, index).addClass('cd-hover');
			}, function() {
				$('.'+options.className,doc).removeClass('cd-hover');
			});

			$('.'+options.className,doc).click(function() {
				var index = $(this).index() + 1;
				$('.'+options.className,doc).removeClass(options.classActive).slice(0, index).addClass(options.classActive);
				$('input', doc).val(index);
			});
		}

	});
};