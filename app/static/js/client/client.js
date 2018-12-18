function addListeners() {
  // Select box for 'Source Directory'
  $('#srcDirectory-frequent').change(function () {
    $('.srcDirectory-path').val(
      $('#srcDirectory-frequent')
      .find(':selected')
      .val(),
    );
    $('.srcDirectory-path').removeClass('invalid');
  });

  $('.srcDirectory-path').focus(function () {
    $(this).removeClass('invalid');
  });

  $(`.find-single-file-btn`).click(function () {

    if ($('.srcDirectory-path').val() === '') {
      $('.srcDirectory-path').addClass('invalid');

      // Scroll to a certain element
      document.querySelector('.srcDirectory-path').scrollIntoView({
        behavior: 'smooth'
      });
    } else {

      let contentToPass = {
        srcDir: $('.srcDirectory-path').val() || 'No Source Directory supplied.',
        foundStatus: false,
      };

      if ($('.single-file__container').hasClass('active')) {
        contentToPass.oldFilename = $('.filesToConv-orig-name').val() || 'No Old Filename provided';
        contentToPass.newFilename = $('.filesToConv-new-name').val() || 'No New Filename provided';
      }

      if ($('.multi-files__container').hasClass('active')) {
        // contentToPass = {
        //   'Need to pass': 'Multi Content',
        // };
      }

      console.log('=======================================');
      console.log('Passed Content:');
      console.log(contentToPass);
      console.log('=======================================');

      $.ajax({
        url: '/find-file',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(contentToPass),
        contentType: 'application/json; charset=utf-8',
        cache: false,
        processData: false,
        timeout: 5000,
        complete: function () {
          console.log('** process COMPLETE **');
        },

        success: function (data) {
          console.log('** process SUCCESS **');

          console.log('=======================================');
          console.log('Returned Content: ');
          console.log(data);
          console.log('=======================================');

          $('.returned-content').children().remove();

          let html = `
          <h3 style="color: tomato">Could not find file: ${data.oldFilename}</h3>
        `;

          if (data.foundStatus) {
            html = `
            <h3 style="color: forestgreen">FOUND FILE: ${data.oldFilename}${data.fileType} !</h3>
          `;
          }

          $('.returned-content').append(html);
        },

        error: function () {
          console.log('** process ERROR **');
        },
      });

    }

  });
}
