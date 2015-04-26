/**
 * Main scripts
 */

$(document).ready(function () {
    var article = $('article'),
        imageContainer = [];

    if ($('a > img', article).length > 0) {
        for (var i = 0; i < $('a > img',article).length; i+=1) {
            var current = $('a > img',article)[i].parentElement,
                imgTitle = $('a > img',article)[i].alt;
            $(current).click(function (e) {
                // e.preventDefault();
            });
            if (/.\.(jpe?g||gif||png)$/i.test($(current).attr('href')) == true) {
                $(current).magnificPopup({
                    type:'image',
                    image: {
                        markup: '<div class="mfp-figure">'+
                            '<div class="mfp-title">'+imgTitle+'</div>'+
                            '<div class="mfp-img"></div>'+
                            '<div class="mfp-close"></div>'+
                            '</div>',
                        titleSrc: function () {
                            return imgTitle;
                        }
                    }
                });
            }
        }
    }

});
