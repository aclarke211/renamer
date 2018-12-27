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

    prepareDataToSend('/find-file', names, 'video', '.single-file__container');
  });

  $('.log-names__btn').click(function () {
    prepareDataToSend('/find-file', readMultipleFilenames(), 'video', '.multi-files__container');
  });
}

function prepareDataToSend(renamerExport, names, type, form) {
  if (validateForms(form)) {
    sendData(renamerExport, createContent(names, type));
  }
}

function createContent(names, type) {
  let contentToPass = {};
  let fileTypes = {};

  switch (type) {
    case 'video':
      fileTypes = {
        mainType: 'mp4',
        types: ['m4a', 'avi', 'wmv', 'mkv'],
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
      folder: findPrimaryFolder(name.newFilename, '_RE'),
      srcDir: $('.srcDirectory-path').val() || 'No Source Directory supplied.'
    }
    files.push(file);
  });

  contentToPass.files = files;

  return contentToPass;
}

function findPrimaryFolder(filename, defaultFolder) {
  if (filename !== undefined && filename.indexOf(' [') !== -1 && filename.indexOf(']') !== -1) {
    const firstSet = filename.substring(
      filename.indexOf("['") + 2,
      filename.indexOf("']")
    );

    const folderName = firstSet.substring(0, firstSet.indexOf(`'`, 1));

    return `${defaultFolder}/${folderName}`;
  } else {
    return defaultFolder;
  }
}

function readMultipleFilenames() {
  $origNamesInput = $('.filesToConv-all-orig-names-input');

  var namesArray = $origNamesInput.val().split(`
`);

  const seperatedNamesArray = [];

  namesArray.forEach(name => {
    const newNameSet = name.split(`	`);
    const newNameObject = {
      oldFilename: '',
      newFilename: '',
    };
    newNameObject.oldFilename = newNameSet[0];
    newNameObject.newFilename = newNameSet[1];

    if (newNameObject.oldFilename !== '' || newNameObject.newFilename !== undefined) {
      seperatedNamesArray.push(newNameObject);
    }
  });

  return seperatedNamesArray;
}

function validateForms(form) {
  let formStatus = true;

  if ($('.srcDirectory-path').val() === '') {
    $('.srcDirectory-path').addClass('invalid');
    smoothScrollElement('srcDirectory-path');
    formStatus = false;
  }

  $(`${form} input[type="text"]`).each(function () {
    if ($(this).val() === '') {
      $(this).addClass('invalid');
      smoothScrollElement('invalid');
      formStatus = false;
    }
  });

  return formStatus;
}

function smoothScrollElement(className) {
  document.getElementsByClassName(className)[0].scrollIntoView({
    behavior: 'smooth'
  });
  formStatus = false;

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
      // console.log(data);

      if (url === '/find-file') {
        const files = {};
        files.foundFiles = data.files.filter(file => file.foundStatus === true);
        files.missingFiles = data.files.filter(file => file.foundStatus === false);
        createResultsModal(files);
      }

      if (url === '/rename-file') {
        console.log('RENAMED FILE:')
        console.log(data);
      }

    },

    error: function () {
      console.log('** process ERROR **');
    },
  });

}

function createResultsModal(files) {
  $.when(
    $.getScript('./app/static/js/modules/modal.js', function () {
      showModal(files);
    })).then(function () {
      $('.rename-files-btn').click(function() {
        if (files.missingFiles.length >= 1) {
          $(this).addClass('invalid');
          $(this).text('Missing Files Present');
        } else if (files.foundFiles.length >= 1) {

          // Send off files to server
          files.foundFiles.forEach((file) => {
              sendData('/rename-file', file);
            });

        }
      });
  });
}


