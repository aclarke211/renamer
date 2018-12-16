function init(appContent, componentContent, $appContainer) {
  $appContainer.append(template(componentContent, appContent));
}

function template(content, allContent) {
  var name = content.componentName;
  return `
    <div class="${name}__container">

      <div class="fields__container column">
        <div class="field">
          <label for="${name}-path" class="${name}-text">${content.data.text}</label>
          <input id="${name}-path" class="${name}-path" type="text" placeholder="Enter default source directory.">
        </div>
        <div class="field">
          <label for="${name}-frequent" class="${name}-text">${content.data.frequent.text}</label>
          <select id="${name}-frequent">
            <option value="">Select a directory...</option>
            <option value="C:\\Users\\User\\Downloads">C:\\ Downloads - Windows</option>
          </select>
        </div>
      </div>

    </div>
  `;
}
