console.log('Renamer [v1.0.0]');

const components = [{
    name: 'header',
  },
  {
    name: 'srcDirectory'
  }
]

components.forEach((component) => {
  $.getScript(`./app/static/js/components/${component.name}.js`, function () {
    init();
  });
});
