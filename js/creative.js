// Upload Section

// UPLOAD CLASS DEFINITION
// ======================

$('#img-preview').hide();
$('#js-upload-submit').prop("disabled", true);
$('#total-drop-area').show();

var dropZone = document.getElementById('drop-zone');
var uploadForm = document.getElementById('js-upload-form');

// C3.js
var chart = c3.generate({
  bindto: '#chart',
  data: {
    x : 'x',
    columns: [
        ['x', 'Disease 1', 'Disease 2', 'Disease 3', 'Disease 4', 'Disease 5', 'Disease 6', 'Disease 7'],
        ['Probability', 0, 0, 0, 0, 0, 0, 0]
    ],
    type: 'bar',
    labels: true,
    colors: {
            'Probability': '#FE3637',
    }
  },
  axis: {
      x: {
          type: 'category' // this needed to load string x value
      },
      rotated: true
  },
  legend: {
    show: false
  }
});

// Fit chart to screen
var screenHeight = Math.floor(screen.height*0.50);
var screenWidth = Math.floor(screen.width*0.60);
chart.resize({height:screenHeight, width:screenWidth});

var startUpload = function (files) {
  console.log(files)
  var data = new FormData()
  data.append('input', files[0])

  fetch('http://93136329.ngrok.io/predict-skin-mock', {
    method: 'POST',
    body: data
  })
  .then(response => response.json())
  .then(data => {
    $([document.documentElement, document.body]).animate({
      scrollTop: $("#results").offset().top
    }, 1000);
    chart.load({
      columns: [
          data.labels,
          data.results,
      ],
      unload: true,
    });
  })
  .catch(err => console.log(err));
}

uploadForm.addEventListener('submit', function (e) {
  e.preventDefault();

  var uploadFiles = document.getElementById('js-upload-files').files;
  startUpload(uploadFiles)
})

dropZone.ondrop = function (e) {
  e.preventDefault();
  this.className = 'upload-drop-zone';

  document.getElementById('js-upload-files').files = e.dataTransfer.files;
  createPreview(e.dataTransfer.files)
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
    $('#total-drop-area').hide();
    $('#js-upload-submit').prop("disabled", false);
  }

  if (files[0]) {
    reader.readAsDataURL(files[0]);
  } else {
    preview.src = "";
  }
}

function clearFiles(event) {
  //event.preventDefault();
  document.getElementById('js-upload-files').value = "";
  var preview = document.querySelector('#img-preview');
  preview.src = "";
  $('#img-preview').hide();
  $('#total-drop-area').show();
  $('#js-upload-submit').prop("disabled", true);
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