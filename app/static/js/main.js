console.log('Renamer [v1.0.0]');

const components = [{
    name: 'header',
  },
  {
    name: 'srcDirectory'
  }
];

const $appContainer = $('.components__container');

$.getJSON('./app/content/content.json', function (content) {
  components.forEach((component, key) => {
    $.getScript(`./app/static/js/components/${component.name}.js`, function () {
      init(content, $appContainer);
      console.log(`Added ${components[key].name}`)
    });
  });
});
