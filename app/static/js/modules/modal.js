function showModal(data) {

  $('.modal__container').remove();

  const basicModal = `
  <div class="modal__container">
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
  `;

  $('.filesToConv__container').append(basicModal);
  sortFiles(data)

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


// Need to display a modal in 'showModal' function (add Modal element to DOM)

// Message to say if file/files have been found

// 2 lists for FOUND and NOT FOUND files

// Found files to be sorted by their filetype

// Have a 'rename' button in the modal (the listener/functionality will be handled in 'client.js')

// Close modal button (use jQuery to remove the Modal element from DOM)
