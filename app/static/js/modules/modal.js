function showModal(files) {
  closeModal();

  const modal = `
  <div class="modal__outer">
    <div class="modal__container">
      <div class="modal__inner">
        <div class="modal__close">x</div>
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
          <div class="modal-btn btn">Rename Files</div>
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
}
