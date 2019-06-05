let pjson;

function init(appContent, componentContent, $appContainer) {
  $.get('/getPackageJson', (data) => {
    pjson = data;
    $appContainer.append(template(componentContent, appContent));
  });
}

function template(content, allContent) {
  const name = content.componentName;
  return `
    <div class="${name}__container">
      <p class="project-version">${pjson.name} v${pjson.version}</p>
      <h1 class="${name}-text">${content.data.text}</h1>
    </div>
  `;
}
