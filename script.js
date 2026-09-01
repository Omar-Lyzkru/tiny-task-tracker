const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

const savedTasks = localStorage.getItem('tasks');

let parsedTasks;

try {
    parsedTasks = JSON.parse(savedTasks);
} catch {
    parsedTasks = [];
}

const tasks = Array.isArray(parsedTasks) ? parsedTasks : [];


// Saves the current tasks array to localStorage
function saveTasks() {
    const tasksJSON = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksJSON);
}


// Creates the HTML for one task
function renderTask(task) {

    const taskLabel = document.createElement('span');
    taskLabel.textContent = task.text;

    const newTask = document.createElement('li');

    const completeCheckbox = document.createElement('input');
    completeCheckbox.type = 'checkbox';
    completeCheckbox.checked = task.completed;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';


    // Restore completed appearance
    if (task.completed) {
        taskLabel.style.textDecoration = 'line-through';
    }


    // Build the task
    newTask.appendChild(taskLabel);
    newTask.appendChild(completeCheckbox);
    newTask.appendChild(deleteButton);

    taskList.appendChild(newTask);


    // Delete task
    deleteButton.addEventListener('click', function() {

        const index = tasks.indexOf(task);

        if (index !== -1) {
            tasks.splice(index, 1);
        }

        saveTasks();

        newTask.remove();
    });


    // Complete / uncomplete task
    completeCheckbox.addEventListener('change', function() {

        task.completed = completeCheckbox.checked;

        if (completeCheckbox.checked) {
            taskLabel.style.textDecoration = 'line-through';
        } else {
            taskLabel.style.textDecoration = 'none';
        }

        saveTasks();
    });
}


// Render saved tasks when page loads
tasks.forEach(function(task) {
    renderTask(task);
});


// Add new task
addTaskButton.addEventListener('click', function() {

    const taskText = taskInput.value.trim();

    if (taskText !== '') {

        const task = {
            text: taskText,
            completed: false
        };

        tasks.push(task);

        saveTasks();

        renderTask(task);

        taskInput.value = '';
    }
});




