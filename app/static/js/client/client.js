var appContent;

function addListeners(content) {
  appContent = content;
  // console.log(appContent);
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

    prepareDataToSend(content.paths.findFiles, names, 'video', '.single-file__container');
  });

  $('.find-multi-files__btn').click(function () {
    prepareDataToSend(content.paths.findFiles, readMultipleFilenames(), 'video', '.multi-files__container');
  });
}

function prepareDataToSend(path, names, type, form) {
  if (validateForms(form)) {
    sendData(path, createContent(names, type));
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
      folder: findPrimaryFolder(name.newFilename, appContent.defaults.folderName),
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

function sendData(path, contentToPass) {
  $.ajax({
    url: path,
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
      // console.log('Data successfully sent');
      // console.log('Returned Content: ');
      // console.log(data);

      if (path === appContent.paths.findFiles) {
        const files = {};
        files.foundFiles = data.files.filter(file => file.foundStatus === true);
        files.missingFiles = data.files.filter(file => file.foundStatus === false);
        createResultsModal(files);
        console.log('Files successfully found');
      }

      if (path === appContent.paths.renameFiles) {

        updateRenamedFilesinModal(data);

        console.log('Renamed File:');
        console.log(`
          [ ${data.fileCount.current} / ${data.fileCount.total} ] Renamed "${data.oldFilename}" to "${data.newFilename}"
        `);
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
      showModal(files, appContent);
    })).then(function () {
    $(`.${appContent.modules.modal.findStatus.btns.renameFilesBtn.className}`).click(function () {
      if (files.missingFiles.length >= 1) {
        $(this).addClass('invalid');
        $(this).text('Missing Files Present');
      } else if (files.foundFiles.length >= 1) {
        $.getScript('./app/static/js/modules/modal.js', function () {
          modalRenameStatus(appContent);
        });
        // Send off files to server 1 by 1
        setTimeout(() => {
          for (var i = 0; i < files.foundFiles.length; i++) {
            (function (index) {
              setTimeout(function () {
                files.foundFiles[index].fileCount = {
                  current: index + 1,
                  total: files.foundFiles.length
                };
                sendData(appContent.paths.renameFiles, files.foundFiles[index])
              }, i * 1000);
            })(i);
          }
        }, 1000);
      }

    });
  });
}

function updateRenamedFilesinModal(file) {

  const progPercentage = (file.fileCount.current / file.fileCount.total * 100).toFixed(0);

  const progFractions = `
      <p class="progress-fraction">
      <span class="progress-percentage">${progPercentage}%</span>
      [ ${file.fileCount.current} / ${file.fileCount.total} ]
      </p>
  `;

  $('.progress-fraction').replaceWith(progFractions);

  $('.progress-bar__inner').css({
    'width': `${progPercentage}%`
  });

  const completedFile = `
    <p class="renamed-file">Renamed:<br>
    "${file.oldFilename}" to "${file.newFilename}"<br>
    in "${file.folder}"</p>
  `;

  $('.renamed-files__container').append(completedFile);

  if (file.fileCount.current === file.fileCount.total) {
    $.getScript('./app/static/js/modules/modal.js', function () {
      renameComplete();
    });
  }
}
