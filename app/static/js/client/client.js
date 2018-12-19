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

    if ($('.srcDirectory-path').val() === '') {
      $('.srcDirectory-path').addClass('invalid');

      // Scroll to the element with no input
      document.querySelector('.srcDirectory-path').scrollIntoView({
        behavior: 'smooth'
      });
    }

    $.ajax({
      url: '/find-file',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(createFile('video')),
      contentType: 'application/json; charset=utf-8',
      cache: false,
      processData: false,
      timeout: 5000,
      complete: function () {
        console.log('** process COMPLETE **');
      },

      success: function (data) {
        console.log('** process SUCCESS **');

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



  });
}

function createFile(type) {
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

  let files = [{
    foundStatus: false,
    oldFilename: $('.filesToConv-orig-name').val() || 'No Old Filename provided',
    newFilename: $('.filesToConv-new-name').val() || 'No New Filename provided',
    fileTypes: fileTypes,
    srcDir: $('.srcDirectory-path').val() || 'No Source Directory supplied.'
  }];

  contentToPass.files = files;

  return contentToPass;
}

function createMultipleFiles(type) {
  logAllOrigNames();
}

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

function createResultsModal(data) {
  $.when(
    $.getScript('./app/static/js/modules/modal.js', function () {
      showModal(data);
    })).then(function () {
    // Add click listener to 'rename' button in modal
  });
}
