var appContent;
var genreType = 'video';

function addListeners(content) {
  appContent = content;

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

    prepareDataToSend(content.paths.findFiles, names, genreType, '.single-file__container');
  });

  $('.find-multi-files__btn').click(function () {
    prepareDataToSend(content.paths.findFiles, readMultipleFilenames(), genreType, '.multi-files__container');
  });

  $('.sort-files__btn').click(function () {
    const dirs = {
      toSearch: $('.srcDirectory-path').val() || 'No Source Directory supplied.'
    };

    if (validateForms('.sort-files__container')) {
      sendData(content.paths.sortFiles, dirs);
    }
  });

  $('.find-replace__btn').click(function () {
    if (validateForms('.find-replace__container')) {

      const values = {
        strings: {
          find: $('.filesToConv-file-to-find').val() || 'No File to Find provided.',
          replace: $('.filesToConv-file-to-replace').val() || 'No File to Replace provided.'
        },
        srcDir: $('.srcDirectory-path').val() || 'No Source Directory supplied.'
      };

      sendData(content.paths.findAndReplace, values);
    }
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
        types: ['m4a', 'avi', 'wmv', 'mkv', 'mov', 'mpg', 'rm', 'flv', 'm4v', 'ts'],
      };
      break
  }

  let files = [];

  names.forEach((name) => {
    const file = {
      defaultFolder: appContent.defaults.folderName,
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
  if (filename !== undefined && filename.indexOf('[') !== -1 && filename.indexOf(']') !== -1) {
    const firstSet = filename.substring(
      filename.indexOf("[\'") + 2,
      filename.indexOf("\']")
    );

    let folderName = firstSet;

    if (firstSet.indexOf(`'`) !== -1) {
      folderName = firstSet.substring(0, firstSet.indexOf(`'`, 1)).trim();
      var trailingCharsToRemove = [',', '-', '_', '(', ')', '{', '}', ';'];
      trailingCharsToRemove.forEach((char) => {
        if (folderName.slice(-1) === char) {
          folderName = folderName.substring(0, folderName.length - 1).trim();
        }
      });
    }

    return `${defaultFolder}/${folderName.trim()}`;
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

function sendData(path, contentToPass, allFiles) {
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
      if (path === appContent.paths.findFiles) {
        const files = {};
        files.foundFiles = data.files.filter(file => file.foundStatus === true);
        files.missingFiles = data.files.filter(file => file.foundStatus === false);
        createResultsModal(files);
        console.log('Files successfully found');
        console.log(data);
      }

      if (path === appContent.paths.renameFiles) {

        if (allFiles !== undefined) {
          updateRenamedFilesinModal(data, allFiles);
        }

        console.log('Renamed File:');
        console.log(`
          [ ${data.fileCount.current} / ${data.fileCount.total} ] Renamed "${data.oldFilename}" to "${data.newFilename}"
        `);
      }

      if (path === appContent.paths.revertFiles) {
        $.when(
          $.getScript('./app/static/js/modules/modal.js', function () {
            revertComplete(appContent);
          })).then(function () {
          $('.del-folder-btn').click(function () {
            const folderToDelFrom = {
              srcDir: data[0].srcDir,
              folder: data[0].defaultFolder
            };
            sendData(appContent.paths.delFolders, folderToDelFrom);
          });
        });
        console.log('Reverted Files.')
      }

      if (path === appContent.paths.delFolders) {
        $('.modal-title').text('Folders Deleted');
        $('.del-folder-btn').remove();
        console.log('Removed directories.');
      }

      if (path === appContent.paths.sortFiles) {
        console.log(data.files);

        sendData(appContent.paths.findFiles, createContent(data.files, genreType));
      }

      if (path === appContent.paths.findAndReplace) {
        console.log(data);

        $.when(
          $.getScript('./app/static/js/modules/modal.js', function () {
            showModal(data, appContent, 'FindAndReplace');
          })).then(function () {
          $(`.${appContent.modules.modal.findAndReplaceStatus.btns.replaceFiles.className}`).click(function () {
            sendData(appContent.paths.replaceFilenames, data);
          });
        });

        console.log("Found strings to replace.");
      }

      if (path === appContent.paths.replaceFilenames) {
        $('.returned-files__container').remove();
        $('.modal__inner .btns__container').remove();
        $('.modal-title').text('Filenames Replaced!');

        console.log('Replaced filenames.')
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
                sendData(appContent.paths.renameFiles, files.foundFiles[index], files.foundFiles)
              }, i * appContent.defaults.waitTime);
            })(i);
          }
        }, appContent.defaults.waitTime);
      }

    });
  });
}

function updateRenamedFilesinModal(file, allFiles) {

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
      renameComplete(allFiles);
      $('.revert-btn').click(() => {
        sendData(appContent.paths.revertFiles, allFiles);
      });
    });
  }
}
