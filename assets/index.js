const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const darkToggle = document.getElementById('dark-mode-toggle');
const searchInput = document.getElementById('search-input');
const taskPriority = document.getElementById('task-priority');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(filter = '') {
    taskList.innerHTML = '';

    tasks
        .filter(task => task.text.toLowerCase().includes(filter.toLowerCase()))
        .forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `flex justify-between items-center p-2 border rounded hover:shadow cursor-pointer 
                            ${task.completed ? 'completed' : ''} ${task.priority}`;

            li.innerHTML = `
                <span onclick="toggleComplete(${index})" ondblclick="editTask(${index})">${task.text}</span>
                <button onclick="deleteTask(${index})" class="text-red-500 font-bold ml-2">X</button>
            `;

            taskList.appendChild(li);
        });
}
taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const text = taskInput.value.trim();
    const priority = taskPriority.value;
    if (text) {
        tasks.push({ text, completed: false, priority });
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
});

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks(searchInput.value);
}


function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks(searchInput.value);
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks(searchInput.value);
    }
}