console.log('Renamer [v1.0.0]');

const $appContainer = $('.components__container');

$.getJSON('./app/content/content.json', function (content) {
  content.components.forEach((component, key) => {
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
  $.getScript('./app/static/js/client/client.js', function () {
    addListeners(content);
    // console.log('ADDED LISTENERS');
  });
});
