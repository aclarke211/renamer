function showModal(data) {

  closeModal();

  const basicModal = `
  <div class="modal__outer">
    <div class="modal__container">
      <div class="modal__inner">
        <div class="modal__close">x</div>
        <h3 class="modal-title">Modal</h3>
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

  $('.main__container').append(basicModal);
  sortFiles(data)

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
  </div>
`;
  $(parentElem).append(fileElem);
}

function sortFiles(data) {
  data.files.forEach((file) => {
    if (file.foundStatus) {
      createFileElem(file, $('.found-files'));
    } else {
      createFileElem(file, $('.missing-files'));
    }

  })
}


// Need to get proper way to close modal (click outside of it)

// Found files to be sorted by their filetype

// Have a 'rename' button in the modal (the listener/functionality will be handled in 'client.js')

// Close modal button (use jQuery to remove the Modal element from DOM)
