// Upload Section

// UPLOAD CLASS DEFINITION
// ======================

$('#img-preview').hide();
$('#js-upload-submit').prop("disabled", true);
$('#total-drop-area').show();
$('#chart').hide();

var dropZone = document.getElementById('drop-zone');
var uploadForm = document.getElementById('js-upload-form');

// C3.js
var chart = c3.generate({
  bindto: '#chart',
  data: {
    x : 'Diseases',
    columns: [
      ['Diseases', 'Disease 1', 'Disease 2', 'Disease 3', 'Disease 4', 'Disease 5', 'Disease 6', 'Disease 7'],
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

function populateResults(data) {
  for (i = 0; i < data.labels.length; i++) {
    if (data.labels[i] === 'Melanocytic nevi') {
      $('#results-nv h3').text(Math.round(data.results[i]).toString() + '%');
    }
    if (data.labels[i] === 'Melanoma') {
      $('#results-mel h3').text(Math.round(data.results[i]).toString() + '%');
    }
    if (data.labels[i] === 'Basal cell carcinoma') {
      $('#results-bcc h3').text(Math.round(data.results[i]).toString() + '%');
    }
    if (data.labels[i] === 'Actinic keratoses') {
      $('#results-akiec h3').text(Math.round(data.results[i]).toString() + '%');
    }
    if (data.labels[i] === 'Vascular lesions') {
      $('#results-vasc h3').text(Math.round(data.results[i]).toString() + '%');
    }
    if (data.labels[i] === 'Dermatofibroma') {
      $('#results-df h3').text(Math.round(data.results[i]).toString() + '%');
    }
  }
}

function populatePrimaryResult(data) {
  var maxLabel = data.labels[1];
  var maxValue = Math.round(data.results[1]);
  for (i = 2; i < data.labels.length; i++) {
    if (data.results[i] >= maxValue) {
      maxLabel = data.labels[i];
      maxValue = Math.round(data.results[i]);
    }
  }
  if (maxLabel === 'Melanocytic nevi') {
    $('#results-primary h3').text('Melanocytic nevi');
    $('#results-primary h1').text(maxValue.toString() + '%');
    $('#results-primary p').text('This type of mole is often large and caused by a disorder involving melanocytes, cells that produce pigment (melanin). Melanocytic nevi can be rough, flat, or raised. They can exist at birth or appear later. Rarely, melanocytic nevi can become cancerous. Most cases don\'t require treatment, but some cases require removal of the mole.');
  }
  if (maxLabel === 'Melanoma') {
    $('#results-primary h3').text('Melanoma');
    $('#results-primary h1').text(maxValue.toString() + '%');
    $('#results-primary p').text('Melanoma occurs when the pigment-producing cells that give color to the skin become cancerous. Symptoms might include a new, unusual growth or a change in an existing mole. Melanomas can occur anywhere on the body. Treatment may involve surgery, radiation, medications, or in some cases chemotherapy.');
  }
  if (maxLabel === 'Basal cell carcinoma') {
    $('#results-primary h3').text('Basal cell carcinoma');
    $('#results-primary h1').text(maxValue.toString() + '%');
    $('#results-primary p').text('Basal cells produce new skin cells as old ones die. Limiting sun exposure can help prevent these cells from becoming cancerous. This cancer typically appears as a white waxy lump or a brown scaly patch on sun-exposed areas, such as the face and neck. Treatments include prescription creams or surgery to remove the cancer.');
  }
  if (maxLabel === 'Actinic keratoses') {
    $('#results-primary h3').text('Actinic keratoses');
    $('#results-primary h1').text(maxValue.toString() + '%');
    $('#results-primary p').text('Actinic keratosis usually affects older adults. Reducing sun exposure can help reduce risk. It is most common on the face, lips, ears, back of hands, forearms, scalp, and neck. The rough, scaly skin patch enlarges slowly and usually causes no other signs or symptoms. A lesion may take years to develop. Because it can become cancerous, it\'s usually removed as a precaution.');
  }
  if (maxLabel === 'Vascular lesions') {
    $('#results-primary h3').text('Vascular lesions');
    $('#results-primary h1').text(maxValue.toString() + '%');
    $('#results-primary p').text('Cutaneous vascular lesions are the most common pediatric birthmarks. Flat vascular malformations tend to persist, but raised vascular lesions, known as hemangiomas, generally involute. Although not always necessary, treatment of flat lesions, if desired, is best accomplished with flash-lamp pumped pulsed dye laser.');
  }
  if (maxLabel === 'Dermatofibroma') {
    $('#results-primary h3').text('Dermatofibroma');
    $('#results-primary h1').text(maxValue.toString() + '%');
    $('#results-primary p').text('Dermatofibroma (superficial benign fibrous histiocytoma) is a common cutaneous nodule of unknown etiology that occurs more often in women. Dermatofibroma frequently develops on the extremities (mostly the lower legs) and is usually asymptomatic, although pruritus and tenderness can be present.');
  }
}

var tempData = {
  labels: ['Diseases', 'Melanocytic nevi', 'Melanoma', 'Basal cell carcinoma', 'Actinic keratoses', 'Vascular lesions', 'Dermatofibroma'],
  results: ['Probabilities', 7, 8, 9, 10, 11, 12]
};

var startUpload = function (files) {
  console.log(files)
  var data = new FormData()
  data.append('input', files[0])
  console.log(data)

  fetch('https://c502901a.ngrok.io/predict-skin', {
    method: 'POST',
    body: data
  })
  .then(response => response.json())
  .then(data => {
    $([document.documentElement, document.body]).animate({
      scrollTop: $("#results").offset().top
    }, 1000);
    populateResults(data);
    populatePrimaryResult(data);
  })
  .catch(err => console.log(err));
  // populateResults(tempData);
  // populatePrimaryResult(tempData);
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