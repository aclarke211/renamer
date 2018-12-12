function init(appContent, componentContent, $appContainer) {
  $appContainer.append(template(componentContent, appContent));
}

function template(content, allContent) {
  var name = content.componentName;
  return `
    <div class="${name}__container">
      <div class="fields__container">
        <div class="field">
          <label for="${name}-path" class="${name}-text">${content.data.text}</label>
          <input id="${name}-path" type="text">
        </div>

      </div>

    </div>
  `;
}
