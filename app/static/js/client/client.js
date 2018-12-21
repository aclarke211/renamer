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

  $('input[type="text"]').focus(function () {
    $(this).removeClass('invalid');
  });

  $(`.find-single-file-btn`).click(function () {
    const names = [{
      oldFilename: $('.filesToConv-orig-name').val() || 'No Old Filename provided',
      newFilename: $('.filesToConv-new-name').val() || 'No New Filename provided',
    }];

    prepareDataToSend('/find-file', names, 'video');
  });

  $(`.find-single-file-btn`).click(function () {
    const names = [{
      oldFilename: $('.filesToConv-orig-name').val() || 'No Old Filename provided',
      newFilename: $('.filesToConv-new-name').val() || 'No New Filename provided',
    }];

    console.log(names);

    prepareDataToSend('/find-file', names, 'video');
  });

  $('.log-names__btn').click(function () {
    logAllOrigNames();
    // const names = [{
    //   oldFilename: 'testing',
    //   newFilename: 'testing_new',
    // }];

    // prepareDataToSend('/find-file', names, 'video');
  });
}

function prepareDataToSend(renamerExport, names, type) {
  if (validateForms()) {
    sendData(renamerExport, createContent(names, type));
  }
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
      fileType: '',
      srcDir: $('.srcDirectory-path').val() || 'No Source Directory supplied.'
    }
    files.push(file);
  });

  contentToPass.files = files;

  return contentToPass;
}

function logAllOrigNames() {
  $origNamesInput = $('.filesToConv-all-orig-names-input');

  var namesArray = $origNamesInput.val().split(`
`);

  // console.log($origNamesInput.val());
  // console.log(namesArray);

  const seperatedNamesArray = [];

  namesArray.forEach(name => {
    const newNameSet = name.split(` `);
    const newNameObject = {
      oldFilename: '',
      newFilename: '',
    };
    newNameObject.oldFilename = newNameSet[0];
    newNameObject.newFilename = newNameSet[1];


    seperatedNamesArray.push(newNameObject);
  });

  console.log(seperatedNamesArray);
}

function validateForms() {
  let formStatus = true;

  $('input[type="text"]').each(function () {
    if ($(this).val() === '') {
      $(this).addClass('invalid');

      // Scroll to the element with no input
      document.getElementsByClassName('invalid')[0].scrollIntoView({
        behavior: 'smooth'
      });
      formStatus = false;
    }
  });

  return formStatus;
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
      console.log('Request Complete');
      console.log('----------------------');
    },

    success: function (data) {
      console.log('Data successfully sent');
      console.log('Returned Content: ');
      console.log(data);

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
