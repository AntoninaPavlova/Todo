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

// VARIABLES
let tasks = [];

// FUNCTIONS
const renderResults = () => {
  todoItem.innerHTML = "";
  tasks.forEach((task, index) => {
    todoItem.innerHTML += ` 
        <input type="checkbox" class="todo-item__checkbox">
        <span class="todo-item__text">${task}</span>
        <div onclick="deleteTask(${index})" class="todo-item__delete">
            <img src="img/delete.png" width="41" height="41" alt="delete">
        </div>`;
  });
};

const handleEnterKey = (event) => {
  if (event.key === "Enter") {
    const task = taskInput.value;
    if (task) {
      tasks.push(task);
      console.log("> handleEnterKey, tasks:", tasks);
    }
    renderResults();
    taskInput.value = "";
  }
};

const deleteTask = (index) => {
  tasks = tasks.filter((elem, i) => i !== index);
  renderResults();
  console.log("> deleteTask, tasks:", tasks);
};

// LISTENERS
taskInput.addEventListener("keyup", handleEnterKey);
