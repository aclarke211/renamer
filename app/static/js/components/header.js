var content;

function init(appContent, $appContainer) {
  content = appContent;
  $appContainer.append(template());
}

function template() {
  return `
    <div class="header__container">
      <h1 class="header">${content.header.text}</h1>
    </div>
  `;
}
