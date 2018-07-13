
var weddings = [
  "4-lee-wedding-3.jpg",
  "4-lee-wedding-12.jpg",
  "4-lee-wedding-16.jpg",
  "4-lee-wedding-40.jpg",
  "4-lee-wedding-42.jpg",
  "4-lee-wedding-62.jpg",
  "4-lee-wedding-243.jpg",
  "4-lee-wedding-253.jpg",
  "4-lee-wedding-265.jpg",
  "4-lee-wedding-273.jpg",
  "5-pedroza-wedding-309.jpg",
  "5-pedroza-wedding-328.jpg",
  "6-muzota-wedding-1.jpg",
  "6-muzota-wedding-2.jpg",
  "6-muzota-wedding-4.jpg",
  "7-rogelio-jasmine-wedding-150.jpg",
  "7-rogelio-jasmine-wedding-153.jpg",
  "7-rogelio-jasmine-wedding-183.jpg",
  "8-hayes-wedding-110.jpg",
  "8-hayes-wedding-279.jpg",
  "9-diaz-wedding-23.jpg",
  "9-diaz-wedding-48.jpg",
  "9-diaz-wedding-51.jpg",
  "9-diaz-wedding-479.jpg",
  "9-diaz-wedding-503.jpg",
  "10-murphy-wedding-297.jpg",
  "10-murphy-wedding-356.jpg",
  "5-1-garcia-wedding-295.jpg",
];

numWeddings = 0

$('#more-portfolio').click(function() {
  let folder = "http://alison-d-photography.imgix.net/img/wedding/"

  if (numWeddings === 0) {
    for(var i = 0; i < 14; i++) {
      let html = '<picture>\n' +
        '<source media="(min-width: 1000px)" srcset="'+folder+weddings[i]+'?auto=compress&w=1000 1x, '+folder+weddings[i]+'?auto=compress&w=1000&dpr=2 2x">' +
        '<source media="(min-width: 768px)" srcset="'+folder+weddings[i]+'?auto=compress&w=768 1x, '+folder+weddings[i]+'?auto=compress&w=768&dpr=2 2x">' +
        '<source media="(min-width: 480px)" srcset="'+folder+weddings[i]+'?auto=compress&w=480 1x, '+folder+weddings[i]+'?auto=compress&w=480&dpr=2 2x">' +
        '<img src="'+folder+weddings[i]+'" alt="">' +
        '</picture>'
      $('#portfolio-images').append(html);
    }
  }

  if(numWeddings === 1) {
    for(var i = 14; i < weddings.length; i++) {
      let html = '<picture>\n' +
        '<source media="(min-width: 1000px)" srcset="'+folder+weddings[i]+'?auto=compress&w=1000 1x, '+folder+weddings[i]+'?auto=compress&w=1000&dpr=2 2x">' +
        '<source media="(min-width: 768px)" srcset="'+folder+weddings[i]+'?auto=compress&w=768 1x, '+folder+weddings[i]+'?auto=compress&w=768&dpr=2 2x">' +
        '<source media="(min-width: 480px)" srcset="'+folder+weddings[i]+'?auto=compress&w=480 1x, '+folder+weddings[i]+'?auto=compress&w=480&dpr=2 2x">' +
        '<img src="'+folder+weddings[i]+'" alt="">' +
        '</picture>'
      $('#portfolio-images').append(html);
    }
    $('#more-portfolio').hide()
  }

  numWeddings++;
});

/*
for(x = 1; x < 8; x++) {
  $('#index').append('<img class="hidden" src="http://alison-d-photography.imgix.net/img/alison-'+x+'.JPG?auto=compress&w=1000&dpr=2">')
}

let i = 0
setInterval(function() {
  console.log('hello')
  i++
  if(i > 8) {
    i = 1
  }
  $('#alison').css('background-image', 'url("http://alison-d-photography.imgix.net/img/alison-'+i+'.JPG?auto=compress&w=1500&dpr=2")')
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

  $('#music').attr('src', 'http://alison-d-photography.imgix.net/img/alison-'+$src+'.JPG?auto=compress&w=768&dpr=2')

}, 1000)

*/

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

