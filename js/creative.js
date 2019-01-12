// Upload Section

// UPLOAD CLASS DEFINITION
// ======================

$('#img-preview').hide();

var dropZone = document.getElementById('drop-zone');
var uploadForm = document.getElementById('js-upload-form');

var startUpload = function (files) {
  console.log(files)
  var data = new FormData()
  data.append('input', files[0])

  fetch('http://93136329.ngrok.io/predict-mole', {
    method: 'POST',
    body: data
  }).then(response => response.json()).then(data => console.log(data));
}

uploadForm.addEventListener('submit', function (e) {
  var uploadFiles = document.getElementById('js-upload-files').files;
  e.preventDefault()

  startUpload(uploadFiles)
})

dropZone.ondrop = function (e) {
  e.preventDefault();
  this.className = 'upload-drop-zone';

  createPreview(e.dataTransfer.files)

  //startUpload(e.dataTransfer.files)
}

dropZone.ondragover = function () {
  this.className = 'upload-drop-zone drop';
  return false;
}

dropZone.ondragleave = function () {
  this.className = 'upload-drop-zone';
  return false;
}

function createPreview(files) {
  var preview = document.querySelector('#img-preview');
  var reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
    $('#img-preview').show();
  }

  if (files[0]) {
    reader.readAsDataURL(files[0]);
  } else {
    preview.src = "";
  }
}

// Upload Section 
function previewFileClassic() {
  var files = document.querySelector('input[type=file]').files;
  createPreview(files);
}

(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 56)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 57
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Scroll reveal calls
  window.sr = ScrollReveal();

  sr.reveal('.sr-icon-1', {
    delay: 200,
    scale: 0
  });
  sr.reveal('.sr-icon-2', {
    delay: 400,
    scale: 0
  });
  sr.reveal('.sr-icon-3', {
    delay: 600,
    scale: 0
  });
  sr.reveal('.sr-icon-4', {
    delay: 800,
    scale: 0
  });
  sr.reveal('.sr-button', {
    delay: 200,
    distance: '15px',
    origin: 'bottom',
    scale: 0.8
  });
  sr.reveal('.sr-contact-1', {
    delay: 200,
    scale: 0
  });
  sr.reveal('.sr-contact-2', {
    delay: 400,
    scale: 0
  });

  // Magnific popup calls
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });

})(jQuery); // End of use strict