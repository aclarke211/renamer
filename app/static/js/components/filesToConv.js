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

      <div class="multi-files__container accordion active">
        <h3 class="${name}-subtitle subtitle">${content.data.multipleFiles.subtitle}</h3>
        <div class="fields__container">
          <div class="field">
            <label for="${name}-all-orig-names" class="${name}-all-orig-names-label">${content.data.multipleFiles.filenames.label}</label>
            <textarea class="${name}-all-orig-names-input">oldFilename_01 newFileName_01
oldFilename_02 newFilename_02</textarea>
          </div>
        </div>
        <div class="log-names__btn btn">${content.data.multipleFiles.btns.findMultiFiles.text}</div>
      </div>


      <div class="single-file__container accordion">
        <h3 class="${name}-subtitle subtitle">${content.data.singleFile.subtitle}</h3>
        <div class="fields__container">
          <div class="field">
            <label for="${name}-orig-name" class="${name}-text">${
    content.data.singleFile.orig_filename.label
  }</label>
            <input id="${name}-orig-name" class="${name}-orig-name" type="text" placeholder="Original Filename">
          </div>

          <div class="field">
            <label for="${name}-new-name" class="${name}-text">${
    content.data.singleFile.new_filename.label
  }</label>
            <input id="${name}-new-name" class="${name}-new-name" type="text" placeholder="New Filename">
          </div>
        </div>

        <div class="btns_container">
          <div class="btn find-single-file-btn">${content.data.singleFile.btns.findSingleFile.text}</div>

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
