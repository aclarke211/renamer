function init(appContent, componentContent, $appContainer) {
  $appContainer.append(template(componentContent, appContent));
}

function template(content, allContent) {
  const name = content.componentName;
  return `
    <div class="${name}__container">
      <h3 class="${name}-text">${content.data.text}</h3>

      <div class="${name}-btns">
        <div class="btn ${name}-find-file">${content.data.btns.findFile.text}</div>
      </div>
    </div>
  `;
}
