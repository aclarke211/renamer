var allContent, content;

function init(appContent, componentContent, $appContainer) {
  allContent = appContent;
  content = componentContent;
  $appContainer.append(template());
}

function template() {
  return `
    <div class="${content.componentName}__container">
      <h3 class="${content.componentName}-text">${content.data.text}</h3>
    </div>
  `;
}