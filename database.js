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
    return new Promise(resolve => {
        db.each("SELECT * FROM projects ORDER BY id_project DESC", async (err, data) => {
            if (err) { throw err }

            let project = document.createElement("div");
            project.classList += "project";
            project.id = data.id_project;

            let project_name = document.createElement("div");
            project_name.classList += "project_name";
            project_name.innerHTML = data.name;

            let project_time = document.createElement("div");
            project_time.classList += "project_time"; 
            project_time.innerHTML = await getTimeForProject(data.id_project);

            let project_descritpion = document.createElement("div");
            project_descritpion.classList += "project_descritpion";
            project_descritpion.innerHTML = data.description;

            project.appendChild(project_name);
            project.appendChild(project_descritpion);
            project.appendChild(project_time);

            projects.appendChild(project);
        })
        resolve("projects displayed");
    });
}

async function displayTasks(id_project) {
    return new Promise(resolve => {
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
            
            let task_chrono = document.createElement("div");
            task_chrono.classList += "chrono";
            task_chrono.classList += " "+data.id_task;
            
            let task_time = document.createElement("div");
            task_time.classList += "task_time";
            task_time.classList += " "+data.id_task;
            task_time.innerHTML = data.time;

            let btn_start = document.createElement("button");
            btn_start.innerHTML = "Start / Stop";
            btn_start.classList += "start_stop";
            btn_start.classList += " "+data.id_task;
            let btn_save = document.createElement("button");
            btn_save.innerHTML = "Save";
            btn_save.classList += "save";
            btn_save.classList += " "+data.id_task;
            
            task.appendChild(task_name);
            task.appendChild(task_description);
            
            task_chrono.appendChild(task_time);
            task_chrono.appendChild(btn_start);
            task_chrono.appendChild(btn_save);
            
            task.appendChild(task_chrono);
            
            tasks.appendChild(task);
            resolve("displayed");
        }) 
    });
}

function createTask(name, description, id_project) {
    return new Promise(resolve => {
        db.run("INSERT INTO tasks(name, description, id_project) VALUES(?,?,?)",[name, description, id_project])
        resolve("Task added");
    });
}

function createProject(name, description) {
    return new Promise(resolve => {
        db.run("INSERT INTO projects(name, description) VALUES(?,?)",[name, description])
        resolve("Project created");
    });
}

function getProjects() {
    db.all("SELECT * FROM projects", (err, data) => {
        if (err) { throw err }
        return data;
    })
}

function updateTimeTask(id_task, time) {
    return db.run("UPDATE tasks SET time = ? WHERE id_task = ?", [time, id_task]);
}

function getTimeForProject(id_project) {
    return new Promise(resolve => {
        let total_secondes = 0;

        db.all("SELECT time FROM tasks WHERE id_project = ?", [id_project], (err, data) => {
            for(let i = 0; i < data.length; i++) {
                total_secondes += parseInt(data[i].time.split(":")[2]); // secondes
                total_secondes += parseInt(data[i].time.split(":")[1])*60; // minutes
                total_secondes += parseInt(data[i].time.split(":")[0])*3600; // hours
            }

            resolve(new Date(total_secondes * 1000).toISOString().substring(14, 19));
        });

    })
}

// displayProjects();