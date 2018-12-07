var content;

function init(appContent, $appContainer) {
  content = appContent;
  $appContainer.append(template());
}

function template() {
  return `
    <div class="src-dir__container">
      <h1 class="src-dir-text">${content.srcDir.text}</h1>
    </div>
  `;
}
