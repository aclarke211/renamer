function showModal(files, content, modalType) {
  closeModal();

  let modal = ``;

  if (modalType !== undefined) {
    if (modalType === 'FindAndReplace') {
      modal = `
      <div class="modal__outer">
      <div class="modal__container">
        <div class="modal__inner">
          <div class="modal__close">${content.modules.modal.findStatus.btns.closeBtn.text}</div>
          <h3 class="modal-title">${content.modules.modal.findAndReplaceStatus.title}</h3>
          <div class="returned-files__container"></div>
          <div class="btns__container">
            <div class="${content.modules.modal.findAndReplaceStatus.btns.replaceFiles.className} btn">${content.modules.modal.findAndReplaceStatus.btns.replaceFiles.text}</div>
        </div>
        </div>
      </div>
    </div>
      `;
    };
  } else {
    modal = `
    <div class="modal__outer">
      <div class="modal__container">
        <div class="modal__inner">
          <div class="modal__close">${content.modules.modal.findStatus.btns.closeBtn.text}</div>
          <h3 class="modal-title">${content.modules.modal.findStatus.title}</h3>
          <div class="returned-files__container">
          <div class="found-files files">
            <h4 class="status-title">${content.modules.modal.findStatus.files.found.title}</h4>
            <div class="files-collection"></div>
            </div>
            <div class="missing-files files">
            <h4 class="status-title">${content.modules.modal.findStatus.files.missing.title}</h4>
            <div class="files-collection"></div>
            </div>
          </div>
          <div class="btns__container">
            <div class="${content.modules.modal.findStatus.btns.renameFilesBtn.className} btn">${content.modules.modal.findStatus.btns.renameFilesBtn.text}</div>
          </div>
        </div>
      </div>

    </div>
    `;
  }

  $('.main__container').append(modal);
  if (modalType === undefined) {
    sortFiles(files);
  }

  if (modalType === 'FindAndReplace') {
    showFilesToReplaceName(files);
  }

  $('.modal__outer')
    .click(() => {
      closeModal();
    })
    .children()
    .click(function (e) {
      return false;
    });

  $('.modal__close').click(() => {
    closeModal();
  });

  if (modalType === undefined) {
    if (files.foundFiles.length >= 1 && files.missingFiles.length <= 0) {
      $(`.${content.modules.modal.findStatus.btns.renameFilesBtn.className}`).addClass('active');
    }
  }
}

function closeModal() {
  $('.modal__outer').remove();
}

function createFileElem(file, parentElem) {
  const fileElem = `
  <div class="file">
    <p class="current_filename">${file.oldFilename}</p>
    <p class="new_filename">${file.newFilename}</p>
    <p class="file-type">${file.fileType}</p>
    <p class="new-folder">${file.folder}</p>
  </div>
`;
  // console.log('CREATE FILE');
  // console.log(file);
  $(parentElem).append(fileElem);

  $('.file-type').each(function () {
    if ($(this).text() === '') {
      $(this).remove();
    }
  });

  $('.new-folder').each(function() {
    if ($(this).text() === '') {
      $(this).remove();
    }
  });
}

function sortFiles(files) {
  if (files.foundFiles.length <= 0) {
    $('.found-files .files-collection').append(`<p class="no-files-msg">No files found :(</p>`)
  } else {
    files.foundFiles.forEach((file) => {
      createFileElem(file, $('.found-files .files-collection'));
    });
  }

  if (files.missingFiles.length <= 0) {
    $('.missing-files .files-collection').append(`<p class="no-files-msg">No missing files :)</p>`)
  } else {
    files.missingFiles.forEach((file) => {
      createFileElem(file, $('.missing-files .files-collection'));
    });
  }

  showTotals(files);
}

function showTotals(files) {
  const totalAllFiles = files.foundFiles.length + files.missingFiles.length;
  $('.modal-title').after(createTotalElem(totalAllFiles, 'total-files', 'Total Files'));

  if (files.foundFiles.length >= 1) {
    $('.found-files .status-title').after(createTotalElem(files.foundFiles.length, 'total-sub-files', 'Total Found Files'));
  }

  if (files.missingFiles.length >= 1) {
    $('.missing-files .status-title').after(createTotalElem(files.missingFiles.length, 'total-sub-files', 'Total Missing Files'));
  }
}

function createTotalElem(totalNum, className, totalText) {
  return `
    <p class="total ${className}">${totalText}: <span class="total-num">${totalNum}</span></p>
  `
}

function prepareModalForRenaming() {
  $('.modal__inner').children().remove();

  $('.modal__outer').unbind('click');
}

function modalRenameStatus(content) {
  prepareModalForRenaming();

  const modalRenameInner = `
    <h3 class="modal-title">${content.modules.modal.renameStatus.title}</h3>
    <div class="progress__container">
      <p class="progress-title">${content.modules.modal.renameStatus.progressText}</p>
      <div class="progress-values">
        <p class="progress-fraction"></p>
        <div class="progress-bar">
          <div class="progress-bar__inner"></div>
        </div>
      </div>
    </div>
    <div class="renamed-files__container"></div>
    <div class="completed-msg__container"></div>
  `;

  $('.modal__inner').append(modalRenameInner);

}

function renameComplete(revertableContent) {
  const completedMsg = `
      <p class="completed-msg">!! RENAMING COMPLETE !!</p>

      <div class="btns__container">
      <div class="btn revert-btn">Revert</div>
      <div class="btn complete-close-btn">CLOSE</div>
      </div>
    `;

  $('.completed-msg__container').append(completedMsg);

  $('.complete-close-btn').click(() => {
    closeModal();
  });

}

function revertComplete(content) {
  $('.modal__inner').children().not('.completed-msg__container').remove();
  $('.completed-msg__container').children().not('.btns__container').remove();
  $('.completed-msg__container .btns__container').children().not('.complete-close-btn').remove();

  $('.modal__outer')
    .click(() => {
      closeModal();
    })
    .children()
    .click(function (e) {
      return false;
    });

  const modalRevertedInner = `
    <h3 class="modal-title">${content.modules.modal.revertedStatus.title}</h3>
  `;

  $('.modal__inner').prepend(modalRevertedInner);

  const delFoldersBtn = `
    <div class="btn del-folder-btn">Delete Folders</div>
  `;

  $('.modal__inner .btns__container').prepend(delFoldersBtn);
}

function showFilesToReplaceName(files) {
  console.log('FILES NAMES');
  console.log(files);


  if (files.length <= 0) {
    $('.returned-files__container').append(`<p class="no-files-msg">No files contain <span>${$('.filesToConv-file-to-find').val()}</span></p>`);
    $('.modal__inner .btn').remove();
  } else {
      files.forEach((file) => {
        createFileElem(file, $('.returned-files__container'));
      });
  }



}
