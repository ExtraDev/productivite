const sqlite3 = require('sqlite3');
const dbname = "database.db";

let db = new sqlite3.Database(dbname, sqlite3.OPEN_READWRITE, err => {
    if (err) { throw err }


    console.log("Connected to database");
})

// db.close(err => {
//     if(err) { throw err }

//     console.log("Database disconnected");
// })

const projects = document.getElementById("projects");
const tasks = document.getElementById("tasks");

function displayProjects() {
    db.each("SELECT * FROM projects", (err, data) => {
        if (err) { throw err }

        let project = document.createElement("div");
        project.classList += "project";
        project.id = data.id_project;

        let project_name = document.createElement("div");
        project_name.classList += "project_name";
        project_name.innerHTML = data.name;

        let project_time = document.createElement("div");
        project_time.classList += "project_time";
        project_time.innerHTML = data.time;

        let project_descritpion = document.createElement("div");
        project_descritpion.classList += "project_descritpion";
        project_descritpion.innerHTML = data.description;

        project.appendChild(project_name);
        project.appendChild(project_descritpion);
        project.appendChild(project_time);

        projects.appendChild(project);
    })
}

function displayTasks(id_project) {
    db.each("SELECT * FROM tasks WHERE id_project = ? ORDER BY id_task", [id_project] ,(err, data) => {
        if (err) { throw err }

        let task = document.createElement("div");
        task.classList += "task";

        let task_name = document.createElement("div");
        task_name.classList += "task_name";
        task_name.innerHTML = data.name;

        let task_description = document.createElement("div");
        task_description.classList += "task_description";
        task_description.innerHTML = data.description;

        let task_time = document.createElement("div");
        task_time.classList += "task_time";
        task_time.innerHTML = data.time;

        task.appendChild(task_name);
        task.appendChild(task_description);
        task.appendChild(task_time);
        
        tasks.appendChild(task);
    })
}

function addTask(name, description, id_project) {
    return db.run("INSERT INTO tasks(name, description, id_project) VALUES(?,?,?)",[name, description, id_project])
}

function getProjects() {
    db.all("SELECT * FROM projects", (err, data) => {
        if (err) { throw err }
        return data;
    })
}

displayProjects();
displayTasks(1);