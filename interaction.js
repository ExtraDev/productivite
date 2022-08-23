let selected_project;

let add_task = document.getElementById("add-task");
let projects_listener = document.getElementsByClassName("project");

for(var i = 0; i < projects_listener.length; i++) {
    projects_listener[i].addEventListener("click", select_projet, false);
}

function select_projet() {
    tasks.innerHTML = "";
    displayTasks(this.getAttribute("id"));
    select_projet = this.getAttribute("id");
}

add_task.addEventListener("click", function() {
    window.open("./task_form.html",'_blank') // , 'frame=false'
})

