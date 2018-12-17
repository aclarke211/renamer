function init(appContent, componentContent, $appContainer) {
  $appContainer.append(template(componentContent, appContent));
}

function template(content, allContent) {
  const name = content.componentName;
  return `
    <div class="${name}__container">
      <h2 class="title">${content.data.text}</h2>

      <div class="${name}-options">
        <sub class="${name}-text">Put options here...</sub>
      </div>
    </div>
  `;
}
