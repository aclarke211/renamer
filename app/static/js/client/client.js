function addListeners() {
  // Select box for 'Source Directory'
  $('#srcDirectory-frequent').change(function() {
    $('#srcDirectory-path').val(
      $('#srcDirectory-frequent')
        .find(':selected')
        .val(),
    );
  });

  $(`.options-find-file`).click(function() {
    let contentToPass = 'No content found.';

    if ($('.single-file__container').hasClass('active')) {
      contentToPass = {
        srcDir: $('.srcDirectory-path').val() || 'No Source Directory supplied.',
        oldFilename: $('.filesToConv-orig-name').val() || 'No Old Filename provided',
        newFilename: $('.filesToConv-new-name').val() || 'No New Filename provided',
      };
    }

    if ($('.multi-files__container').hasClass('active')) {
      contentToPass = {
        'Need to pass': 'Multi Content',
      };
    }

    console.log("• Running 'Find File' on Server.");

    $.ajax({
      url: '/find-file',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(contentToPass),
      contentType: 'application/json; charset=utf-8',
      cache: false,
      processData: false,
      timeout: 5000,
      complete: function() {
        console.log('** process COMPLETE **');
      },

      success: function(data) {
        console.log('** process SUCCESS **');
        console.log(data);
        console.log('^ Above data successfully passed.');
      },

      error: function() {
        console.log('** process ERROR **');
      },
    });
  });
}
