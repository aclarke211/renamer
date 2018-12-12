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

    </div>
  `;
}

function addListeners(content) {
  $(`.${content.componentName}-find-file`).click(function () {
    console.log("Running 'Find File' on Server.");
    $.post('/find-file');
  });
}
