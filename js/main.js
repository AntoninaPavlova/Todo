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
const btnDeleteTask = document.querySelector(".todo-modal__delete");

// VARIABLES
let tasks = [];

const localStorageKey = "tasks";

// FUNCTIONS
const generateUniqueId = () => Date.now();

const handleEnterKey = (event) => {
  if (event.key === "Enter") {
    const task = taskInput.value.trim();

    if (task) {
      tasks.push({ id: generateUniqueId(), text: task, completed: false });

      renderResults();
      taskInput.value = "";
      saveInLocalStorage();
    }
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
  saveInLocalStorage();
};

const deleteCompletedTask = () => {
  tasks = tasks.filter((task) => !task.completed);
  renderResults();
  saveInLocalStorage();
};

const deleteAllTasks = () => {
  tasks = [];
  renderResults();
  saveInLocalStorage();
};

const openModal = (id) => {
  const task = tasks.find((task) => task.id === id);

  modalText.value = task.text;
  modalText.setAttribute("name", id);
  modal.style.display = "block";
};

const editTask = () => {
  const taskId = +modalText.getAttribute("name");

  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, text: modalText.value };
    }
    return task;
  });

  renderResults();
  saveInLocalStorage();
  closeModal();
};

const checkModalText = () => {
  if (modalText.value.trim() === "") {
    btnSaveChanges.disabled = true;
    btnSaveChanges.style.opacity = "0.4";
  } else {
    btnSaveChanges.disabled = false;
    btnSaveChanges.style.opacity = "1";
  }
};

const deleteThisTask = () => {
  const taskId = +modalText.getAttribute("name");

  const confirmDelete = confirm("Вы уверены, что хотите удалить эту задачу?");

  if (confirmDelete) {
    tasks = tasks.filter((task) => task.id !== taskId);
    renderResults();
    saveInLocalStorage();
    closeModal();
  } else {
    alert("Удаление отменено.");
  }
};

const closeModal = () => {
  modal.style.display = "none";
};

const saveInLocalStorage = () => {
  localStorage.setItem(localStorageKey, JSON.stringify(tasks));
};

const getFromLocalStorage = () => {
  const savedTasks = localStorage.getItem(localStorageKey);

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }

  renderResults();
};

getFromLocalStorage();

// LISTENERS
taskInput.addEventListener("keyup", handleEnterKey);
btnRemoveCompleted.addEventListener("click", deleteCompletedTask);
btnRemoveAll.addEventListener("click", deleteAllTasks);
closeIcon.addEventListener("click", closeModal);
btnSaveChanges.addEventListener("click", editTask);
modalText.addEventListener("input", checkModalText);
btnDeleteTask.addEventListener("click", deleteThisTask);
