const taskInput = document.querySelector(".task-input input");
const enterBtn=document.querySelector(".enter-btn");
const filters=document.querySelectorAll(".filters span");
const clearAll=document.querySelector(".clear-btn");
const taskBox = document.querySelector(".task-box")
let todos=JSON.parse(localStorage.getItem("todo-list"));
let editId;
let isEditedTask = false;

// filtering the type of tasks
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    })
})

//clear all button
clearAll.addEventListener("click", () => {
    todos.splice(0,todos.length);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo(btn.id);
})

//showing tasks
const showTodo=(filter)=>{
    let li = "";
    if(todos){
        todos.forEach((todo, id) => {
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all"){
            li += `<li class="task">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                        <p class=" ${isCompleted}">${todo.name}</p>
                    </label>
                    <div class="settings">
                            <i onclick="editTask(${id}, '${todo.name}')" class='bx bxs-edit'></i>
                            <i onclick="deleteTask(${id})" class='bx bx-message-square-x'></i>
                    </div>
                </li>`;
            }
        });
    }
    taskBox.innerHTML=li || `<span id="no-task">No available task here.</span>`;
}
showTodo("all");

//editing tasks
const editTask=(taskId, taskName)=>{
    editId = taskId;
    taskInput.value = taskName;
    isEditedTask = true;
}

//deleting task
const deleteTask=(deleteId)=>{
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    document.querySelector("span.active").classList.remove("active");
    showTodo("all");
}

//updating status of the tasks
const updateStatus=(selectedTask)=>{
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status="completed";
    }
    else{
        taskName.classList.remove("checked");
        todos[selectedTask.id].status="pending";
    }
    localStorage.setItem("todo-list",JSON.stringify(todos));
}

//adding events for add task button
enterBtn.addEventListener("click",(e)=>{
    let userTask = taskInput.value.trim();
    if(userTask) {
        if(!isEditedTask){
            if(!todos){ 
                todos=[];
            }
            let taskInfo={name: userTask, status: "pending"};
            todos.push(taskInfo);
        }
        else{
            isEditedTask=false;
            todos[editId].name=userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list",JSON.stringify(todos));
        document.querySelector("span.active").classList.remove("active");
        filters[0].classList.add("active");
        showTodo("all");
    }
});