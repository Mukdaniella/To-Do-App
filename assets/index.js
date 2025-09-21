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