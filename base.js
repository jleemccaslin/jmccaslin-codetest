"use strict";

//////// DOM Element Variables

const addBtn = document.querySelector(".header__input-btn");
const todoItem = document.querySelector(".todo__item");
const toggleBtn = document.querySelectorAll(".todo__btn--toggle");
const deleteBtn = document.querySelectorAll(".todo__btn--delete");
const input = document.querySelector(".header__input");
const main = document.querySelector("main");

//////// Todo Item COMPLETE/UNDO Functionality

const toggleBtnsInit = function () {
  main.addEventListener("click", function (e) {
    if (e.target && e.target.matches(".todo__btn--toggle")) {
      // Toggle '.todo__completed' class to parent div for styling
      const parent = e.target.closest(".todo__item");
      parent.classList.toggle("todo__completed");

      // Toggle clicked button text to appropriate content
      if (e.target.innerHTML === "Complete") {
        e.target.innerHTML = "Undo";
      } else {
        e.target.innerHTML = "Complete";
      }
    }
  });
};

toggleBtnsInit();

//////// Todo Item DELETE Functionality

const deleteBtnsInit = function () {
  main.addEventListener("click", function (e) {
    if (e.target && e.target.matches(".todo__btn--delete")) {
      // Add class to parent element and CSS will display: none;
      const parent = e.target.closest(".todo__item");
      parent.classList.toggle("todo__removed");
    }
  });
};

deleteBtnsInit();

//////// Todo Item ADD Functionality

let textDataCount = 0;

const populateData = async function () {
  try {
    // Fetch API data
    const data = await fetch(`https://jsonplaceholder.typicode.com/todos`).then(
      (response) => response.json()
    );

    input.value = data[textDataCount].title;
    textDataCount++;
  } catch (err) {
    console.error(err.message);
  }
};

input.addEventListener("focus", populateData);

const addItem = function () {
  let inputValue = document.querySelector("input").value;
  let HTML = `<div class="todo__item">
  <p class="todo__description">
    ${inputValue}
  </p>
  <div class="todo__btn-container">
    <button class="todo__btn--toggle btn">Complete</button>
    <button class="todo__btn--delete btn btn-red">Delete</button>
  </div>
</div>`;
  main.insertAdjacentHTML("afterbegin", HTML);
};

addBtn.addEventListener("click", addItem);
