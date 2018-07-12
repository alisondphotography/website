
for(x = 1; x < 8; x++) {
  $('#index').append('<img class="hidden" src="/static/img/alison-'+x+'.JPG?auto=compress&w=1000&dpr=2">')
}

let i = 0
setInterval(function() {
  console.log('hello')
  i++
  if(i > 8) {
    i = 1
  }
  $('#alison').css('background-image', 'url("/static/img/alison-'+i+'.JPG?auto=compress&w=1500&dpr=2")')
}, 1000)

var x = 5

setInterval(function() {
  $src = null
  if(x === 5) {
    $src = 6
    x = 6
  } else {
    $src = 5
    x = 5
  }

  $('#music').attr('src', '/static/img/alison-'+$src+'.JPG?auto=compress&w=768&dpr=2')

}, 1000)


/*
i = 0
active = null

$(function() {
  $(window).on('scroll', function () {

    $el = null
    $div = null

    $('li').each(function(index) {
      var scrollTop     = $(window).scrollTop(),
        elementOffset = $(this).offset().top,
        distance      = (elementOffset - scrollTop);
        if(distance > 0) {
          if (active !== $(this)) {
            active = $(this)
            i = 0
          }

          $el = $(this)
          $div = index - 1
          return false
        }
    });

    i++

    $el.find('.background-image').css({
      'transform': 'translate3d(0px, -'+ i +'px, 0px)'
    });

  });

});
*/

