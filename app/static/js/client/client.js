function addListeners() {
  // Select box for 'Source Directory'
  $('#srcDirectory-frequent').change(function () {
    $('.srcDirectory-path').val(
      $('#srcDirectory-frequent')
      .find(':selected')
      .val(),
    );
    $('.srcDirectory-path').removeClass('invalid');
  });

  $('.srcDirectory-path').focus(function () {
    $(this).removeClass('invalid');
  });

  $(`.find-single-file-btn`).click(function () {
    validateForms();
    const names = [{
      oldFilename: $('.filesToConv-orig-name').val() || 'No Old Filename provided',
      newFilename: $('.filesToConv-new-name').val() || 'No New Filename provided',
    }];
    sendData('/find-file', createContent(names, 'video'));
  });
}

function createContent(names, type) {
  let contentToPass = {};
  let fileTypes = {};

  switch (type) {
    case 'video':
      fileTypes = {
        mainType: '.mp4',
        types: ['.m4a', '.avi', '.wmv', '.mkv'],
      };
      break
  }

  let files = [];

  names.forEach((name) => {
    const file = {
      foundStatus: false,
      oldFilename: name.oldFilename,
      newFilename: name.newFilename,
      fileTypes: fileTypes,
      srcDir: $('.srcDirectory-path').val() || 'No Source Directory supplied.'
    }
    files.push(file);
  });

  contentToPass.files = files;

  return contentToPass;
}

function createMultipleFiles(type) {

}

// called in 'filesToConv.js'
function logAllOrigNames() {
  $origNamesInput = $('.filesToConv-all-orig-names-input');

  var namesArray = $origNamesInput.val().split(`
`);

  // console.log($origNamesInput.val());
  // console.log(namesArray);

  const seperatedNamesArray = [];

  namesArray.forEach(name => {
    const newNameSet = name.split(`	`);
    seperatedNamesArray.push(newNameSet);
  });

  console.log(seperatedNamesArray);
}

function validateForms() {
  if ($('.srcDirectory-path').val() === '') {
    $('.srcDirectory-path').addClass('invalid');

    // Scroll to the element with no input
    document.querySelector('.srcDirectory-path').scrollIntoView({
      behavior: 'smooth'
    });
  }
}

function sendData(url, contentToPass) {
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(contentToPass),
    contentType: 'application/json; charset=utf-8',
    cache: false,
    processData: false,
    timeout: 5000,
    complete: function () {
      console.log('Completed a request to the server.');
    },

    success: function (data) {
      console.log('Data successfully sent');

      console.log('=======================================');
      console.log('Returned Content: ');
      console.log(data);
      console.log('=======================================');

      $('.returned-content').children().remove();

      let html = `
          <h3 style="color: tomato">Could not find file: ${data.files[0].oldFilename}</h3>
        `;

      if (data.files[0].foundStatus) {
        html = `
            <h3 style="color: forestgreen">FOUND FILE: ${data.files[0].oldFilename}${data.files[0].fileType} !</h3>
          `;
      }

      $('.returned-content').append(html);

      createResultsModal(data);
    },

    error: function () {
      console.log('** process ERROR **');
    },
  });

}

function createResultsModal(data) {
  $.when(
    $.getScript('./app/static/js/modules/modal.js', function () {
      showModal(data);
    })).then(function () {
    // Add click listener to 'rename' button in modal
  });
}
