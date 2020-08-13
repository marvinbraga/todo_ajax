$(document).ready(function(){

    var csrfToken = $("input[name=csrfmiddlewaretoken]").val();

    $("#createButton").click(function() {
        var form = $("#createTaskForm");
        var serializedData = form.serialize();
        console.log(serializedData);

        $.ajax({
            url: form.data('url'),
            data: serializedData,
            type: 'post',
            success: function(response) {
                $("#taskList").append(
                '<div class="card mb-1" id="taskCard" data-id="' + response.task.id + '"><div class="card-body">' +
                response.task.title +'<button type="button" class="close float-right"><span aria-hidden="true">' +
                '&times;</span></button></div></div>')
            }
        });
        form[0].reset();
    });

    $("#taskList").on('click', '.card', function() {
        var dataId = $(this).data('id');
        $.ajax({
            url: '/tasks/' + dataId + '/completed/',
            data: {
                csrfmiddlewaretoken: csrfToken,
                id: dataId
            },
            type: 'post',
            success: function() {
                console.log(dataId);
                var cardItem = $('#taskCard[data-id="' + dataId + '"]');
                cardItem.css('text-decoration', 'line-through').hide().slideDown();
                $("#taskList").append(cardItem);
                console.log(cardItem);
            }
        });
    });
});
