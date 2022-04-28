const $cImg = $('#clipped-image');
const $body = $('body');

$body.mousemove(function(e) {
  $cImg.css('--clip-position', `${(e.pageX - 200)}px ${(e.pageY - 200)}px`);
});
$( function() {
    $( "#left" ).draggable();
    $( "#important" ).draggable();
    $( "#tilt" ).draggable();
    $( "#four" ).draggable();
  } );
