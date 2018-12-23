function showModal(data) {
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
        </div>
          <div class="missing-files files">
            <h4 class="status-title">MISSING FILES</h4>
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
  sortFiles(data);

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
}

function sortFiles(data) {
  data.files.forEach(file => {
    if (file.foundStatus) {
      createFileElem(file, $('.found-files'));
    } else {
      createFileElem(file, $('.missing-files'));
    }
  });
}
