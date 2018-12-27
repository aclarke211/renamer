function showModal(files) {
  closeModal();

  const modal = `
  <div class="modal__outer">
    <div class="modal__container">
      <div class="modal__inner">
        <div class="modal__close">&times;</div>
        <h3 class="modal-title">Results</h3>
        <div class="returned-files__container">
        <div class="found-files files">
          <h4 class="status-title">FOUND FILES</h4>
          <div class="files-collection"></div>
          </div>
          <div class="missing-files files">
          <h4 class="status-title">MISSING FILES</h4>
          <div class="files-collection"></div>
          </div>
        </div>
        <div class="btns_container">
          <div class="rename-files-btn btn">Rename Files</div>
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
    $('.rename-files-btn').addClass('active');
  }

  $('.rename-files-btn').click(function() {
    if (files.missingFiles.length >= 1) {
      $(this).addClass('invalid');
      $(this).text('Missing Files Present');
    } else if (files.foundFiles.length >= 1) {
      $(this).text('[DEV] Need to send files to server...')
    }
  });

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
