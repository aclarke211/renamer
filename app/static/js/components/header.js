function init(appContent, componentContent, $appContainer) {
  $appContainer.append(template(componentContent, appContent));
}

function template(content, allContent) {
  const name = content.componentName;
  return `
    <div class="${name}__container">
      <h1 class="${name}-text">${content.data.text}</h1>
    </div>
  `;
}
