/**
 * Created by jorrespijker on 17-05-16.
 */

$('input').bind('input', function() {
    if (this.value.length >= $(this).attr('maxlength')) {
        $(this).next().select();
    }

    if (this.value.length == 0) {
        $(this).prev().select();
    }
});