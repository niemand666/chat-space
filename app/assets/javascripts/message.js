$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-info">
                    <p class="upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="upper-info__date">
                      ${message.date}
                    </p>
                  </div>
                  <div class="text">
                    <p class="text__content">
                    ${content}
                    </p>
                    ${img}
                  </div>
                </div>`
  return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href);
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.form__message').val('');
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  })

  var reloadMessages = (function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message').last().data('id');
      $.ajax({
        url: 'api/messages',
        type: 'get',
        data: {id: last_message_id},
        dataType: 'json'
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message) {
        var insertHTML = buildHTML(message)
        $('.messages').append(insertHTML)
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    };
  });
  setInterval(reloadMessages, 5000);
});