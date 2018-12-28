function showModal(files, content) {
  closeModal();

  const modal = `
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
        <div class="btns_container">
          <div class="${content.modules.modal.findStatus.btns.findFilesBtn.className} btn">${content.modules.modal.findStatus.btns.findFilesBtn.text}</div>
        </div>
      </div>
    </div>

  </div>
  `;

  $('.main__container').append(modal);
  sortFiles(files);

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

  if (files.foundFiles.length >= 1 && files.missingFiles.length <= 0) {
    $(`.${content.modules.modal.findStatus.btns.findFilesBtn.className}`).addClass('active');
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
  </div>
`;
  // console.log('CREATE FILE');
  // console.log(file);
  $(parentElem).append(fileElem);

  $('.file-type').each(function () {
    if ($(this).text() === '') {
      $(this).remove();
    }
  })
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

function clearModalInner() {
  $('.modal__inner').children().not('.modal__close').remove();
}

function modalRenameStatus(content) {
  clearModalInner();

  const modalRenameInner = `
    <h3 class="modal-title">${content.modules.modal.renameStatus.title}</h3>
    <div class="progress__container">
      <p class="progress-title">${content.modules.modal.renameStatus.progressText}</p>
      <div class="progress-values"></div>
    </div>
    <div class="renamed-files__container"></div>
    <div class="completed-msg__container"></div>
  `;

  $('.modal__inner').append(modalRenameInner);

}
