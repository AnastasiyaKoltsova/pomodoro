const addTaskBtn = document.querySelector('.tasks-add');
const setTaskWindow = document.querySelector('.tasks-description');
const cancelBtn = document.querySelector('.tasks-cancel');
const tasksList = document.querySelector('.tasks-list');
const tasksDescription = document.querySelector('.tasks-description');
const inputTask = document.querySelector('.tasks-description__settings-input-task');
const inputNumber = document.querySelector('.tasks-description__settings-input-number');
const saveBtn = document.querySelector('.tasks-save');

function getSavedTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(task, count) {
    const newTask = document.createElement('div');
    newTask.classList.add('tasks-list__item');
    newTask.innerHTML = `
<div class="tasks-list__item-color"></div>
<img class="tasks-list__item-icon" src="./src/assets/icons/check.png">
<div class="tasks-list__item-task">${task}</div>
<div class="tasks-list__item-count">0/${count}</div>
<button class="tasks-list__item-btn">
    <img src="./src/assets/icons/dots.png" alt="More options" class="dots"></img>
</button>
`;

    return newTask;
}

function loadTasks() {
    const savedTasks = getSavedTasks();
    savedTasks.forEach(({ task, count }) => {
        const newTask = createTaskElement(task, count);
        tasksList.appendChild(newTask);
    });

    if (savedTasks.length > 0) {
        tasksList.classList.remove('hidden');
    }
}

loadTasks();

setTaskWindow.classList.add('hidden'); 

addTaskBtn.addEventListener('click', function() { 
    setTaskWindow.classList.remove('hidden'); 
    addTaskBtn.classList.add('hidden'); 
}); 

cancelBtn.addEventListener('click', function() { 
    setTaskWindow.classList.add('hidden'); 
    addTaskBtn.classList.remove('hidden'); 
}); 

saveBtn.addEventListener('click', function() { 
    const task = inputTask.value.trim(); 
    if (!task) return; 
    const count = inputNumber.value || 1; 
    
    const savedTasks = getSavedTasks(); 
    savedTasks.push({ task, count }); 
    saveTasks(savedTasks); 

    const newTask = createTaskElement(task, count); 
    tasksList.appendChild(newTask); 
    
    tasksList.classList.remove('hidden'); 
    
    inputTask.value = ''; 
    inputNumber.value = ''; 
    setTaskWindow.classList.add('hidden'); 
    
    addTaskBtn.classList.remove('hidden');
});