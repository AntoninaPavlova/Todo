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
const modal = document.querySelector(".todo-modal");
const modalText = document.getElementById("todo-modal__text");
const closeIcon = document.querySelector(".todo-modal__close");
const btnSaveChanges = document.querySelector(".todo-modal__save");

// VARIABLES
let tasks = [];

// FUNCTIONS
const generateUniqueId = () => {
  return Date.now();
};

const handleEnterKey = (event) => {
  if (event.key === "Enter") {
    const task = taskInput.value;
    if (task) {
      tasks.push({ id: generateUniqueId(), text: task, completed: false });
      console.log("> handleEnterKey, tasks:", tasks);
    }
    renderResults();
    taskInput.value = "";
    saveInLocalStorage();
  }
};

const renderResults = () => {
  todoItem.innerHTML = "";
  tasks.forEach((task) => {
    todoItem.innerHTML += `
    <input type="checkbox" class="todo-item__checkbox" onchange="completedTask(${task.id})" ${
      task.completed ? "checked" : ""
    }>
        <span onclick="openModal(${task.id})" class="todo-item__text">${task.text}</span>
        <div onclick="deleteTask(${task.id})" class="todo-item__delete">
            <img src="img/delete.png" width="41" height="41" alt="delete">
        </div>`;
  });
};

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  renderResults();
  console.log("> deleteTask, tasks:", tasks);
  saveInLocalStorage();
};

const completedTask = (id) => {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  renderResults();
  console.log("> completedTask, tasks:", tasks);
  saveInLocalStorage();
};

const deleteCompletedTask = () => {
  tasks = tasks.filter((task) => !task.completed);
  renderResults();
  console.log("> deleteCompletedTask, tasks:", tasks);
  saveInLocalStorage();
};

const deleteAllTasks = () => {
  tasks = [];
  renderResults();
  console.log("> deleteAllTasks, tasks:", tasks);
  saveInLocalStorage();
};

const openModal = (id) => {
  const task = tasks.find((task) => task.id === id);

  console.log("> openModal, id:", id);

  modalText.value = task.text;
  console.log("> openModal, task.text:", task.text);

  modalText.setAttribute("name", id);
  modal.style.display = "block";
};

const editTask = () => {
  const taskId = parseInt(modalText.getAttribute("name"));

  console.log("> editTask, taskId:", taskId);
  console.log("> editTask, modalText.value:", modalText.value);

  tasks = tasks.map((task) => {
    console.log(task.id === taskId);
    if (task.id === taskId) {
      return { ...task, text: modalText.value };
    }
    return task;
  });

  console.log("> editTask, tasks:", tasks);
  renderResults();
  saveInLocalStorage();
  closeModal();
};

const closeModal = () => {
  modal.style.display = "none";
};

const saveInLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const getFromLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }

  renderResults();
  console.log("> getFromLocalStorage, tasks:", tasks);
};

getFromLocalStorage();

// LISTENERS
taskInput.addEventListener("keyup", handleEnterKey);
btnRemoveCompleted.addEventListener("click", deleteCompletedTask);
btnRemoveAll.addEventListener("click", deleteAllTasks);
closeIcon.addEventListener("click", closeModal);
btnSaveChanges.addEventListener("click", editTask);
