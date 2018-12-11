var allContent, content;

function init(appContent, componentContent, $appContainer) {
  allContent = appContent;
  content = componentContent;
  $appContainer.append(template());
}

function template() {
  return `
    <div class="src-dir__container">
      <div class="fields__container">
        <div class="field">
          <label for="src-dir-path" class="src-dir-text">${content.data.text}</label>
          <input id="src-dir-path" type="text">
        </div>

      </div>

    </div>
  `;
}
