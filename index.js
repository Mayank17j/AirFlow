const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;
let cors = require('cors');
app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

/*
Endpoint 1. Add a Task to the Task List
Endpoint: /tasks/add
Example Call:<http://localhost:3000/tasks/add?taskId=4&text=Review%20code&priority=1>
*/
function addnewTask(tasks, taskId, text, priority) {
  tasks.push({ taskId: taskId, text: text, priority: priority });
  return tasks;
}
app.get('/tasks/add', (req, res) => {
  let taskId = parseFloat(req.query.taskId);
  let text = req.query.text;
  let priority = parseFloat(req.query.priority);
  let result = addnewTask(tasks, taskId, text, priority);
  res.json({ tasks: result });
});

/*
Endpoint 2. Read All Tasks in the Task List
Endpoint: /tasks
Example Call:<http://localhost:3000/tasks>
*/
function currentTask(tasks) {
  return tasks;
}
app.get('/tasks', (req, res) => {
  let result = currentTask(tasks);
  res.json({ tasks: result });
});

/*
Endpoint 3. Sort Tasks by Priority
Endpoint: /tasks/sort-by-priority
Example Call:<http://localhost:3000/tasks/sort-by-priority>
*/
function sortbyPriority(obj1, obj2) {
  return obj1.priority - obj2.priority;
}
app.get('/tasks/sort-by-priority', (req, res) => {
  let tasksCopy = tasks.slice();
  let result = tasksCopy.sort(sortbyPriority);
  res.json({ tasks: result });
});

/*
Endpoint 4. Edit Task Priority
Endpoint: /tasks/edit-priority
Example Call:<http://localhost:3000/tasks/edit-priority?taskId=1&priority=1>
*/

function editTaskPriority(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) tasks[i].priority = priority;
  }
  return tasks;
}
app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseFloat(req.query.taskId);
  let priority = parseFloat(req.query.priority);
  let result = editTaskPriority(tasks, taskId, priority);
  res.json({ tasks: result });
});

/*
Endpoint 5. Edit/Update Task Text
Endpoint: /tasks/edit-text
Example Call:<http://localhost:3000/tasks/edit-text?taskId=3&text=Update%20documentation>
*/
function editTask(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) tasks[i].text = text;
  }
  return tasks;
}
app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseFloat(req.query.taskId);
  let text = req.query.text;
  let result = editTask(tasks, taskId, text);
  res.json({ tasks: result });
});

/*
Endpoint 6. Delete a Task from the Task List
Endpoint: /tasks/delete
Example Call:<http://localhost:3000/tasks/delete?taskId=2>
*/
function deleteTask(tasksObj, taskId) {
  return tasksObj.taskId != taskId;
}
app.get('/tasks/delete', (req, res) => {
  let taskId = parseFloat(req.query.taskId);
  let result = tasks.filter((tasksObj) => deleteTask(tasksObj, taskId));
  res.json({ tasks: result });
});

/*
Endpoint 7. Filter Tasks by Priority
Endpoint: /tasks/filter-by-priority
Example Call:<http://localhost:3000/tasks/filter-by-priority?priority=1>
*/
function filterByPriority(tasksObj, priority) {
  return tasksObj.priority === priority;
}
app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseFloat(req.query.priority);
  let result = tasks.filter((tasksObj) => filterByPriority(tasksObj, priority));
  res.json({ tasks: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
