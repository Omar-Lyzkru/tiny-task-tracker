const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const emptyState = document.getElementById('emptyState');
const statusMessage = document.getElementById('statusMessage');
const filterButtons = document.querySelectorAll('.filter-button');

const savedTasks = localStorage.getItem('tasks');
let parsedTasks;

try {
    parsedTasks = JSON.parse(savedTasks);
} catch {
    parsedTasks = [];
}

const tasks = Array.isArray(parsedTasks)
    ? parsedTasks
        .filter(task => task && typeof task.text === 'string')
        .map(task => ({
            text: task.text.trim(),
            completed: Boolean(task.completed)
        }))
        .filter(task => task.text !== '')
    : [];

let activeFilter = 'all';

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function announce(message) {
    statusMessage.textContent = '';

    window.setTimeout(function() {
        statusMessage.textContent = message;
    }, 10);
}

function getVisibleTasks() {
    if (activeFilter === 'active') {
        return tasks.filter(task => !task.completed);
    }

    if (activeFilter === 'completed') {
        return tasks.filter(task => task.completed);
    }

    return tasks;
}

function updateToolbar() {
    const remainingTasks = tasks.filter(task => !task.completed).length;
    taskCount.textContent = `${remainingTasks} ${remainingTasks === 1 ? 'task' : 'tasks'} left`;

    filterButtons.forEach(function(button) {
        const isActive = button.dataset.filter === activeFilter;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });
}

function beginEditing(task, taskItem, taskLabel, editButton) {
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = task.text;
    editInput.maxLength = 120;
    editInput.setAttribute('aria-label', `Edit task: ${task.text}`);

    const saveButton = editButton.cloneNode(true);
    saveButton.textContent = 'Save';
    saveButton.classList.add('save-button');
    saveButton.setAttribute('aria-label', `Save task: ${task.text}`);

    taskItem.replaceChild(editInput, taskLabel);
    editButton.replaceWith(saveButton);

    editInput.focus();
    editInput.select();

    function finishEdit() {
        const updatedText = editInput.value.trim();

        if (updatedText === '') {
            announce('Task text cannot be empty.');
            editInput.focus();
            return;
        }

        task.text = updatedText;
        saveTasks();
        renderTasks();
        announce('Task updated.');
    }

    saveButton.addEventListener('click', finishEdit);

    editInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            finishEdit();
        }

        if (event.key === 'Escape') {
            renderTasks();
            announce('Edit canceled.');
        }
    });
}

function createTaskElement(task) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.classList.toggle('completed', task.completed);

    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';

    const completeCheckbox = document.createElement('input');
    completeCheckbox.type = 'checkbox';
    completeCheckbox.className = 'task-checkbox';
    completeCheckbox.checked = task.completed;
    completeCheckbox.setAttribute('aria-label', `Mark ${task.text} as ${task.completed ? 'active' : 'completed'}`);

    const taskLabel = document.createElement('span');
    taskLabel.className = 'task-label';
    taskLabel.textContent = task.text;

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.className = 'secondary-button';
    editButton.textContent = 'Edit';
    editButton.setAttribute('aria-label', `Edit task: ${task.text}`);

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('aria-label', `Delete task: ${task.text}`);

    taskContent.appendChild(completeCheckbox);
    taskContent.appendChild(taskLabel);
    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(actions);

    completeCheckbox.addEventListener('change', function() {
        task.completed = completeCheckbox.checked;
        saveTasks();
        renderTasks();
        announce(task.completed ? 'Task completed.' : 'Task marked active.');
    });

    editButton.addEventListener('click', function() {
        beginEditing(task, taskItem, taskLabel, editButton);
    });

    deleteButton.addEventListener('click', function() {
        const index = tasks.indexOf(task);

        if (index !== -1) {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
            announce('Task deleted.');
        }
    });

    return taskItem;
}

function renderTasks() {
    taskList.replaceChildren();

    const visibleTasks = getVisibleTasks();

    visibleTasks.forEach(function(task) {
        taskList.appendChild(createTaskElement(task));
    });

    emptyState.hidden = visibleTasks.length !== 0;

    if (visibleTasks.length === 0 && tasks.length > 0) {
        emptyState.textContent = `No ${activeFilter} tasks.`;
    } else {
        emptyState.textContent = 'No tasks yet. Add one above.';
    }

    updateToolbar();
}

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === '') {
        taskInput.focus();
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);
    saveTasks();

    taskInput.value = '';
    activeFilter = 'all';
    renderTasks();
    taskInput.focus();
    announce('Task added.');
});

filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        activeFilter = button.dataset.filter;
        renderTasks();
    });
});

saveTasks();
renderTasks();
