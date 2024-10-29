$(document).ready(function () {
  const modalEl = document.getElementsByClassName('modal-video');
  const embeddedvideo = document.getElementsByClassName("embedded-video");
  const lightboxVideo = document.getElementsByClassName("lightbox-video");

  $(modalEl).on('show.bs.modal', e => {
    $(lightboxVideo).trigger('play');
    $(embeddedvideo).trigger('pause');

  })

  $(modalEl).on('hidden.bs.modal', e => {
    $(lightboxVideo).trigger('pause');
    $(embeddedvideo).trigger('play');
  })

});