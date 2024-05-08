"use strict";

// Необходимо реализовать список задач с использованием технологий:
// HTML + (CSS или любой препроцессор) + JavaScript

// В нашем приложении должно быть поле для ввода задачи, после нажатия на “Enter” оно должно добавляться в список.
// Данную задачу можно удалить, можно отметить выполненной.
// Под списком должны быть кнопки для удаления выполненных задач, а также для удаления всех задач.

// Один из требований будет сохранение задач даже после обновления страницы, то есть при обновлении страницы добавленные задачи не должны пропадать.

// Задание со звездочкой* Добавить возможность редактирования задачи.

// CONSTS
const todoItem = document.querySelector(".todo-item");
const taskInput = document.getElementById("todo-display__input");
const btnRemoveCompleted = document.querySelector(".todo-btns__remove-completed");
const btnRemoveAll = document.querySelector(".todo-btns__remove-all");

// VARIABLES
let tasks = [];
let taskId = 1;

// FUNCTIONS
const handleEnterKey = (event) => {
  if (event.key === "Enter") {
    const task = taskInput.value;
    if (task) {
      tasks.push({ id: taskId, text: task, completed: false });
      console.log("> handleEnterKey, tasks:", tasks);
      taskId++;
    }
    renderResults();
    taskInput.value = "";
  }
};

const renderResults = () => {
  todoItem.innerHTML = "";
  tasks.forEach((task) => {
    todoItem.innerHTML += `
    <input type="checkbox" class="todo-item__checkbox" onchange="completedTask(${task.id})" ${
      task.completed ? "checked" : ""
    }>
        <span class="todo-item__text">${task.text}</span>
        <div onclick="deleteTask(${task.id})" class="todo-item__delete">
            <img src="img/delete.png" width="41" height="41" alt="delete">
        </div>`;
  });
};

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  renderResults();
  console.log("> deleteTask, tasks:", tasks);
};

const completedTask = (id) => {
  tasks = tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task));
  renderResults();
  console.log("> completedTask, tasks:", tasks);
};

const deleteCompletedTask = () => {
  tasks = tasks.filter((task) => !task.completed);
  renderResults();
  console.log("> deleteCompletedTask, tasks:", tasks);
};

const deleteAllTasks = () => {
  tasks = [];
  renderResults();
  console.log("> deleteAllTasks, tasks:", tasks);
};

// LISTENERS
taskInput.addEventListener("keyup", handleEnterKey);
btnRemoveCompleted.addEventListener("click", deleteCompletedTask);
btnRemoveAll.addEventListener("click", deleteAllTasks);
