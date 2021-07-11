getList()

function addTodo(){
    const _title = $("#title").val()
    const _content = $("#content").val()

    if(_title == "" || _content == ""){
        alert("請輸入標題與內容")
    }else{
        $.post(`http://localhost:3000/api/addTodo`, {
            'title': _title,
            'content': _content
        },(res)=>{
            showNewTodo(res.data)
            $("#title").val("")
            $("#content").val("")
        })
    }
}
function getList(){
    $.get(`http://localhost:3000/api/getList`, (data)=>{
        if(data){
            for(let todo of data){
                showNewTodo(todo)
            }
        }
    })
}
function editTodo(id){
    $("#editBtn" + id).css("display", "none")
    $("#updateBtn" + id).css("display", "inline")

    let input_title = document.createElement("input")
    input_title.type = "text"
    input_title.id = "edit_title" + id
    input_title.value = $("#title" + id).text()
    input_title.size = 15
    $("#title" + id).css("display", "none")
    $("#title" + id).parent().append(input_title)

    let input_content = document.createElement("input")
    input_content.type = "text"
    input_content.id = "edit_content" + id
    input_content.value = $("#content" + id).text()
    input_content.size = 40
    $("#content" + id).css("display", "none")
    $("#content" + id).parent().append(input_content)
}
function updateTodo(id){
    const title = $("#edit_title" + id).val()
    const content = $("#edit_content" + id).val()

    $.post("http://localhost:3000/api/updateTodo", {
        'id': id,
        'title': title,
        'content': content
    }, (res)=>{
        if(res.status == 0){
            $("#title" + id).text(title)
            $("#content" + id).text(content)
        
            $("#edit_title" + id).remove()
            $("#edit_content" + id).remove()
            $("#title" + id).css("display", "inline")
            $("#content" + id).css("display", "inline")
        
            $("#editBtn" + id).css("display", "inline")
            $("#updateBtn" + id).css("display", "none")
        }
    })
}
function removeTodo(id){
    $.post("http://localhost:3000/api/removeTodo", {'id':id}, (res)=>{
        if(res.status == 0) $("#" + id).remove()
    })
}
function showNewTodo(todo){
    const isChecked = (todo.isDone) ? "checked":""
    const titleClass = (todo.isDone) ? "title_done":"title"
    const contentClass = (todo.isDone) ? "content_done":"content"
    const editDisplay = (todo.isDone) ? "none":"inline"

    const todoCard = 
        `<div class="content" id="${todo._id}">
            <div class="${titleClass}">
                <input type="checkbox" id="checkbox${todo._id}" onclick="changeStatus('${todo._id}')" ${isChecked} />
                <text id="title${todo._id}">${todo.title}</text>
                <button class="todoCard_btn" onclick="removeTodo('${todo._id}')"> 刪除 </button>
                <button class="todoCard_btn" id="editBtn${todo._id}" style="display:${editDisplay}" onclick="editTodo('${todo._id}')"> 修改 </button>
                <button class="todoCard_btn" id="updateBtn${todo._id}" style="display:none" onclick="updateTodo('${todo._id}')"> 確認 </button>
            </div>
            <div class="${contentClass}">
                <text id="content${todo._id}">${todo.content}</text>
            </div>
        </div>` 
    
        
    $('#todo_area').append(todoCard)
}
function changeStatus(id){
    const title = $("#title" + id).parent()
    const content = $("#content" + id).parent()
    const isDone = $("#checkbox" + id).prop("checked")
    $.post("http://localhost:3000/api/changeStatus", {
        'id':id, 
        'isDone': isDone
    }, (res)=>{
        if(res.status == 0){
            if(isDone){
                title.attr('class', "title_done")
                content.attr('class', "content_done")
                $("#editBtn" + id).css("display", "none")
                $("#updateBtn" + id).css("display", "none")
        
                // if todo is being edited, undo the change
                if($("#edit_title" + id).length){
                    $("#title" + id).css("display","inline")
                    $("#content" + id).css("display","inline")
                    $("#edit_title" + id).remove()
                    $("#edit_content" + id).remove()
                }
            }else{
                title.attr('class', "title")
                content.attr('class', "content")
                $("#editBtn" + id).css("display","inline")
            }
        }
    }) 
}