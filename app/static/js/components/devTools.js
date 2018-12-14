function init(appContent, componentContent, $appContainer) {
  $appContainer.append(template(componentContent, appContent));
  addListeners(componentContent);
}

function template(content, allContent) {
  const name = content.componentName;
  return `
    <div class="${name}__container">
      <h3 class="${name}-text">${content.data.text}</h3>

      <div class="${name}-btns">
        <div class="${name}-btn ${name}-find-file">Find File</div>
      </div>
    </div>
  `;
}

function addListeners(content) {

  $(`.${content.componentName}-find-file`).click(function () {

    var contentToPass = {
      "srcDir": $('.srcDirectory-path').val() || 'No Source Directory supplied.',
      "oldFilename": $('.filesToConv-orig-name').val() || 'No Old Filename provided',
      "newFilename": $('.filesToConv-new-name').val() || 'No New Filename provided'
    };

    console.log("• Running 'Find File' on Server.");
    // $.post('/find-file', msg);
    $.ajax({
      url: "/find-file",
      type: "POST",
      dataType: "json",
      data: JSON.stringify(contentToPass),
      contentType: "application/json; charset=utf-8",
      cache: false,
      processData: false,
      timeout: 5000,
      complete: function () {
        console.log('** process COMPLETE **');
      },

      success: function (data) {
        console.log('** process SUCCESS **');
        console.log(data);
        console.log('^ Above data successfully passed.');
      },

      error: function () {
        console.log('** process ERROR **');
      },
    });
  });

}
