$(document).ready(function(){

    $("#createButton").click(function() {
        var form = $("#createTaskForm")
        var serializedData = form.serialize();
        console.log(serializedData);

        $.ajax({
            url: form.data('url'),
            data: serializedData,
            type: 'post',
            success: function(response) {
                $("#taskList").append(
                '<div class="card mb-1"><div class="card-body">' + response.task.title +
                '<button type="button" class="close float-right"><span aria-hidden="true">&times;</span></button></div></div>')
            }
        })
    });
});
