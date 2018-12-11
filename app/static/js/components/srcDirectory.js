var allContent, content;

function init(appContent, componentContent, $appContainer) {
  allContent = appContent;
  content = componentContent;
  $appContainer.append(template());
}

function template() {
  return `
    <div class="${content.componentName}__container">
      <div class="fields__container">
        <div class="field">
          <label for="${content.componentName}-path" class="${content.componentName}-text">${content.data.text}</label>
          <input id="${content.componentName}-path" type="text">
        </div>

      </div>

    </div>
  `;
}
