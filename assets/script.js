const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const darkToggle = document.getElementById("dark-mode-toggle");
const searchInput = document.getElementById("search-input");
const taskPriority = document.getElementById("task-priority");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "") {
  taskList.innerHTML = "";

  tasks
    .filter((task) => task.text.toLowerCase().includes(filter.toLowerCase()))
    .forEach((task, index) => {
      const li = document.createElement("li");

      // Base classes for task
      li.className =
        "flex justify-between items-center p-2 border rounded hover:shadow cursor-pointer";

      // Priority classes
      if (task.priority === "low") {
        li.classList.add("border-l-4", "border-green-500", "pl-2");
      } else if (task.priority === "medium") {
        li.classList.add("border-l-4", "border-orange-500", "pl-2");
      } else if (task.priority === "high") {
        li.classList.add("border-l-4", "border-red-500", "pl-2");
      }

      // Completed task styling
      if (task.completed) {
        li.classList.add("line-through", "text-gray-500");
      }

      li.innerHTML = `
        <span onclick="toggleComplete(${index})" ondblclick="editTask(${index})">${task.text}</span>
        <button onclick="deleteTask(${index})" class="text-red-500 font-bold ml-2">X</button>
      `;

      taskList.appendChild(li);
    });
}

// Add new task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  const priority = taskPriority.value;

  if (text) {
    tasks.push({ text, completed: false, priority });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
});

// Toggle completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks(searchInput.value);
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks(searchInput.value);
}

// Edit task
function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks(searchInput.value);
  }
}

// Dark mode toggle
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Search filter
searchInput.addEventListener("input", () => {
  renderTasks(searchInput.value);
});

// Initial render
renderTasks();
