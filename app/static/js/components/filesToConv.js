function init(appContent, componentContent, $appContainer) {
  $.when($appContainer.append(template(componentContent, appContent))).done(function () {
    activateAccordions();
  });
}

function template(content, allContent) {
  var name = content.componentName;
  return `
    <div class="${name}__container">

      <h2 class="title">${content.data.title}</h2>

      <div class="multi-files__container accordion">
        <h3 class="${name}-subtitle subtitle">${content.data.multipleFiles.subtitle}</h3>
        <div class="fields__container">
          <div class="field">
            <label for="${name}-all-orig-names" class="${name}-all-orig-names-label">${
    content.data.multipleFiles.filenames.label
  }</label>
            <textarea class="${name}-all-orig-names-input">vid1	newFileName_01
vid2	newFilename_02 ['Comedy' - 'Romcom'] ['Drama']
vid3	newFilename_03 ['^^Art' - 'Project'] ['Horror']
oldFilename_04	newFilename_04 ['Action' - 'Adventure', 'Family']</textarea>
          </div>
        </div>
        <div class="btns__container">
          <div class="find-multi-files__btn btn">${
            content.data.multipleFiles.btns.findMultiFiles.text
          }</div>
        </div>
      </div>


      <div class="single-file__container accordion">
        <h3 class="${name}-subtitle subtitle">${content.data.singleFile.subtitle}</h3>
        <div class="fields__container">
          <div class="field">
            <label for="${name}-orig-name" class="${name}-text">${
    content.data.singleFile.orig_filename.label
  }</label>
            <input id="${name}-orig-name" class="${name}-orig-name" type="text"
            placeholder="Original Filename" value="vid1">
          </div>

          <div class="field">
            <label for="${name}-new-name" class="${name}-text">${
    content.data.singleFile.new_filename.label
  }</label>
            <input id="${name}-new-name" class="${name}-new-name" type="text"
            placeholder="New Filename" value="New Video 1">
          </div>
        </div>

        <div class="btns__container">
          <div class="btn find-single-file-btn">${
            content.data.singleFile.btns.findSingleFile.text
          }</div>
        </div>
      </div>

      <div class="sort-files__container accordion active">
        <h3 class="${name}-subtitle subtitle">${content.data.sortFiles.subtitle}</h3>
        <div class="btns__container">
          <div class="sort-files__btn btn">${content.data.sortFiles.btns.sortFiles.text}</div>
        </div>
      </div>

      <div class="find-replace__container accordion">
      <h3 class="${name}-subtitle subtitle">${content.data.findAndReplace.subtitle}</h3>

      <div class="fields__container">
      <div class="field">
        <label for="${name}-file-to-find" class="${name}-text">${content.data.findAndReplace.fields.find.label}</label>
        <input id="${name}-file-to-find" class="${name}-file-to-find" type="text"
        placeholder="${content.data.findAndReplace.fields.find.placeholder}" value="">
      </div>

      <div class="field">
        <label for="${name}-file-to-replace" class="${name}-text">${content.data.findAndReplace.fields.replace.label}</label>
        <input id="${name}-file-to-replace" class="${name}-file-to-replace" type="text"
        placeholder="${content.data.findAndReplace.fields.replace.placeholder}" value="">
      </div>
    </div>

      <div class="btns__container">
        <div class="find-replace__btn btn">${content.data.findAndReplace.btns.findAndReplace.text}</div>
      </div>
    </div>

    </div>
  `;
}

function activateAccordions() {
  $('.accordion').click(function () {
    $('.accordion').each(function () {
      $(this).removeClass('active');
    });
    $(this).addClass('active');
  });
}
