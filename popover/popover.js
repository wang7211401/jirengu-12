$('.wrap').on('click', 'a', function (e) {

    let $a = $(e.currentTarget);
    let $parent = $a.parent();
    let close = function () {
        $('.wrap').removeClass('active')
        $('body').off('click', close)
    }

    if ($parent.hasClass('active')) {
        close()
    } else {
        $parent.addClass('active')
        $('body').on('click', close)
    }
    e.stopPropagation()
    return false
})