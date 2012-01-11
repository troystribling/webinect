(function (jQuery) {
    jQuery.fn.extend({
        prompt: function (option) {
            var defaultText;
            if ((typeof option) == "string") defaultText = option;
            else if (option && option.text) defaultText = option.text;
            else return;
 
            var promptColor = (option && option.color) ? option.color : "#999999";
 
            var array = [];
            this.each(function () {
                var $input = jQuery(this);
                if (!$input.is(":input") || $input.attr("type") != "text") return;
 
                var normalColor = $input.css("color");
                var backgroundColor = $input.css("background-color");
 
                $input.focus(function () {
                    if (jQuery.trim($input.val()) == defaultText) {
                        $input.css({
                            color: normalColor
                        }).val("");
                    }
                }).blur(function () {
                    if (jQuery.trim($input.val()) == "") {
                        $input.css({
                            color: backgroundColor
                        }).val(defaultText).animate({
                            color: promptColor
                        });
                    }
                });
 
                var value = $j.trim($input.val());
                if (value == "" || value == defaultText) {
                    $input.css({
                        color: promptColor
                    }).val(defaultText);
                }
 
                array[array.length] = this;
            });
 
            return array;
        }
    });
})(jQuery);

