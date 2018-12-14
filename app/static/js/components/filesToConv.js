function init(appContent, componentContent, $appContainer) {
  $appContainer.append(template(componentContent, appContent));
}

function template(content, allContent) {
  var name = content.componentName;
  return `
    <div class="${name}__container">

      <h2 class="${name}-text">${content.data.text}</h2>

      <div class="fields__container">
        <div class="field">
          <label for="${name}-orig-name" class="${name}-text">${content.data.orig_filename.label}</label>
          <input id="${name}-orig-name" class="${name}-orig-name" type="text" placeholder="Original Filename">
        </div>

        <div class="field">
          <label for="${name}-new-name" class="${name}-text">${content.data.new_filename.label}</label>
          <input id="${name}-new-name" class="${name}-new-name" type="text" placeholder="Original Filename">
        </div>

      </div>


    </div>
  `;
}
