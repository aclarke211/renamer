console.log('Renamer [v1.0.0]');

const $appContainer = $('.components__container');

// Custom setTime promise, used to set how long to wait between rendering components
const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

// Use jQuery to read content from JSON file
$.getJSON('./app/content/content.json', function (content) {

  // Async function to make sure elements are loaded in the correct order
  const generateElements = async () => {
    await asyncForEach(content.components, async (component) => {
      await waitFor(50);
      // Read the JS file for each of the components
      $.getScript(`./app/static/js/components/${component.componentName}.js`, function () {
        init(content.content, component, $appContainer);
      });
    });
    $.getScript('./app/static/js/client/client.js', function () {
      addListeners(content);
    });
  }
  generateElements();
});

// Custom forEach loop which waits for callback to be completed
async function asyncForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
}
