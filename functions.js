const $cImg = $('#clipped-image');
const $body = $('body');

$body.mousemove(function(e) {
  $cImg.css('--clip-position', `${(e.pageX - 250)}px ${(e.pageY - 250)}px`);
});
