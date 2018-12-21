console.log('Renamer [v1.0.0]');

const $appContainer = $('.components__container');

$.when(
  $.getJSON('./app/content/content.json', function (content) {
    content.content.forEach((component, key) => {
      $.when(
        $.getScript(`./app/static/js/components/${component.componentName}.js`,
          $.Deferred(function (deferred) {
            $(deferred.resolve);
          })
        ).done(function () {
          init(content.content, component, $appContainer);
          // console.log(`Added ${component.componentName}`);
        }));
    });
  })).then(function () {
  $.getScript('./app/static/js/client/client.js', function () {
    addListeners();
    // console.log('ADDED LISTENERS');
  });
});
