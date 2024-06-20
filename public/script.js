document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    const fetchTasks = async () => {
      const response = await fetch('/tasks');
      const tasks = await response.json();
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.text;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async () => {
          await fetch(`/tasks/${index}`, { method: 'DELETE' });
          fetchTasks();
        });
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
      });
    };
  
    taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const task = { text: taskInput.value };
      await fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      taskInput.value = '';
      fetchTasks();
    });
  
    fetchTasks();
  });
  