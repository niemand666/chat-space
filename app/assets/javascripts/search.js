$(function () {
  var user_list = $("#user_search_result");
  var member_list = $("#member_search_result");

  function appendUsers(user) {
      var html = `<div class="chat-group-user clearfix">
                    <div class='chat-group-form__field--right'>
                      <p class="chat-group-user__name">
                      ${user.name}
                      </p>
                      <div class="chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                    </div>
                  </div>`
      user_list.append(html); 
  }

  function appendNewMember(name, user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id} data-id=${user_id} '>
                 <div class='chat-group-form__field--right'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                   <p class='chat-group-user__name'>${name}</p>
                   <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                  </div>
                </div>`
    member_list.append(html);
  }

  $(function () {
      $(".chat-group-form__input").on("keyup", function () {
          var input = $("#user-search-field").val();
          $.ajax({
              type: 'GET',
              url: '/users',
              data: { keyword: input },
              dataType: 'json'
          })
          .done(function (members) {
              $("#user_search_result").empty();
              if (members.length !== 0) {
                  members.forEach(function (user) {
                      appendUsers(user)
                  });
              } else {
                NoResult('該当するユーザーはいません')
              }
          })
          .fail(function () {
              alert('ユーザー検索に失敗しました');
          });
      });
  });

  $(function () {
      $(document).on("click", '.chat-group-user__btn--add', function () {
          var name = $(this).attr("data-user-name");
          var user_id = $(this).attr("data-user-id");
          var addNewUser = appendNewMember(name,user_id);
          $('#chat-group-users').append(addNewUser);
          $(this).parent().remove();
      });
      $(document).on("click", '.chat-group-user__btn--remove', function () {
          $(this).parent().remove();
      });
  });
});
