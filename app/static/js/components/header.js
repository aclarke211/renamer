var allContent, content;

function init(appContent, componentContent, $appContainer) {
  allContent = appContent;
  content = componentContent;
  $appContainer.append(template());
}

function template() {
  return `
    <div class="header__container">
      <h1 class="header">${content.data.text}</h1>
    </div>
  `;
}
