function addListeners() {

  $(`.options-find-file`).click(function () {

    var contentToPass = {
      "srcDir": $('.srcDirectory-path').val() || 'No Source Directory supplied.',
      "oldFilename": $('.filesToConv-orig-name').val() || 'No Old Filename provided',
      "newFilename": $('.filesToConv-new-name').val() || 'No New Filename provided'
    };

    console.log("• Running 'Find File' on Server.");

    $.ajax({
      url: "/find-file",
      type: "POST",
      dataType: "json",
      data: JSON.stringify(contentToPass),
      contentType: "application/json; charset=utf-8",
      cache: false,
      processData: false,
      timeout: 5000,
      complete: function () {
        console.log('** process COMPLETE **');
      },

      success: function (data) {
        console.log('** process SUCCESS **');
        console.log(data);
        console.log('^ Above data successfully passed.');
      },

      error: function () {
        console.log('** process ERROR **');
      },
    });
  });

}
