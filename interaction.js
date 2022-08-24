let selected_project_id;

let projects_listener = document.getElementsByClassName("project");

let start_stop_btn = document.getElementsByClassName("start_stop");
let save_btn = document.getElementsByClassName("save");

let timer;
let started = false;

// cancel sending form
window.onload = () => {
    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
    })
}

// add listener on class elements
for(var i = 0; i < projects_listener.length; i++) {
    projects_listener[i].addEventListener("click", select_projet, false);
}

function select_projet() {
    tasks.innerHTML = "";
    selected_project_id = this.getAttribute("id");
    displayTasks(this.getAttribute("id"));
    select_projet = this.getAttribute("id");
}

// Open tab to create a task
let add_task = document.getElementById("add-task");
let task_form = document.getElementById("task_form");
let cancel_task = document.getElementById("cancel_task");
let create_task = document.getElementById("create_task");
let task_name = document.getElementById("task_name");
let task_description = document.getElementById("task_description");

add_task.addEventListener("click", function() {
    task_form.style.display = "block";
})

cancel_task.addEventListener("click", function() {
    task_form.style.display = "none";
})

create_task.addEventListener("click", function() {
    createTask(task_name.value, task_description.value, selected_project_id);
    // make notification with electron
});


// Gestion des chronomètres pour les taches
function manage_timer() {
    // get actual time of the selected task
    let actual_time = document.getElementsByClassName("task_time "+this.getAttribute("class").split(" ")[1])[0].innerHTML;
    let hours = parseInt(actual_time.split(":")[0]);
    let minutes = parseInt(actual_time.split(":")[1]);
    let secondes = parseInt(actual_time.split(":")[2]);
    let element = document.getElementsByClassName("task_time "+this.getAttribute("class").split(" ")[1]);
    let max = 60;

    if(!started) {
        timer = setInterval(function(){
            secondes++;
    
            if(secondes % max == 0) {
                secondes = 0;
                minutes++;
            }
    
            if((minutes % max == 0) && (minutes != 0)) {
                minutes = 0;
                hours++;
            }

            let formated_time = "";

            // hours
            if(hours == 0) formated_time += "00:";
            else if (hours < 10) formated_time += "0"+hours+":";
            else formated_time += hours+":";
            
            // minutes
            if(minutes == 0) formated_time += "00:";
            else if (minutes < 10 && minutes > 0) formated_time += "0"+minutes+":"; 
            else formated_time += minutes+":";

            // secondes
            if(secondes == 0) formated_time += "00";
            else if (secondes < 10) formated_time += "0"+secondes;
            else formated_time += secondes;
    
            element[0].innerHTML = formated_time;
        }, 1000, element);
        started = true;
    } else {
        clearInterval(timer);
        started = false;
    }

}

for(let i = 0; i < start_stop_btn.length; i++) {
    start_stop_btn[i].addEventListener("click", manage_timer, false);
}

function save_time() {
    let id_task = this.getAttribute("class").split(" ")[1];
    let new_time = document.getElementsByClassName("task_time "+this.getAttribute("class").split(" ")[1])[0].innerHTML;
    updateTimeTask(id_task, new_time);
}

for(var i = 0; i < save_btn.length; i++) {
    save_btn[i].addEventListener("click", save_time, false);
}