function toggle() {
  var secret = document.getElementById("hint");
  secret.classList.toggle("active");
}
const $cImg = $('#clipped-image');
const $body = $('body');

$body.mousemove(function(e) {
  $cImg.css('--clip-position', `${(e.pageX - 250)}px ${(e.pageY - 250)}px`);
});
