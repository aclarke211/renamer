function init(appContent, componentContent, $appContainer) {
  $appContainer.append(template(componentContent, appContent));
  addFrequentDirectories(componentContent);
}

function template(content, allContent) {
  var name = content.componentName;
  return `
    <div class="${name}__container">

      <div class="fields__container">
        <div class="field">
          <label for="${name}-path" class="${name}-text src-dir-label">${content.data.text}</label>
          <input id="${name}-path" class="${name}-path" type="text" placeholder="Enter default source directory.">
        </div>
        <div class="field">
          <label for="${name}-frequent" class="${name}-text frequent-dirs-label">${content.data.frequent.text}</label>
          <select id="${name}-frequent">
            <option value="">Select a directory...</option>
          </select>
        </div>
      </div>

      <div class="output-msg__container">
        <p class="output-msg">${content.data.outputMsg}</p>
      </div>

    </div>
  `;
}

function addFrequentDirectories(content) {
  $frequentSelectBox = $(`#${content.componentName}-frequent`);

  content.data.frequent.directories.forEach((option) => {
    const dirToAdd = `
      <option value="${option.value}">${option.text}</option>
    `

    $frequentSelectBox.append(dirToAdd);
  });
}
