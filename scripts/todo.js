const todoList = JSON.parse(localStorage.getItem('todoList')) || [{
  
  dueDate: '2022-12-22',
  name: 'make dinner',
  timeInput: '22:00'
}, {
  dueDate: '2022-12-22',
  name: 'wash dishes',
  timeInput: '21:00'
}];

document.querySelector('.add-todo-button').addEventListener('click', () => {
  addTodo();
});

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';
  todoList.forEach(function(todoObject, index){
    const { dueDate, name, timeInput } = todoObject;
    const html = `
      <div class="ot-date">${dueDate}</div>
      <div class="ot-name">${name}</div>
      <div class="ot">${timeInput}</div>
      <button class="delete-todo-button" data-index="${index}">Delete</button>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  document.querySelectorAll('.delete-todo-button').forEach((deleteButton) => {
    deleteButton.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      todoList.splice(index, 1);
      renderTodoList();
      saveToStorage(); // Save the updated list after deletion
    });
  });
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value.trim(); // Trim whitespace

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value.trim(); // Trim whitespace

  const timeInputElement = document.querySelector('.due-time-input');
  const timeInput = timeInputElement.value.trim(); // Trim whitespace

  // Check if name, due date, or time is empty
  if (name === '' || dueDate === '' || timeInput === '') {
    document.querySelector('.js-empty').innerHTML = `Please enter Todo name, Due date, and Time`;
    return;
  } else {
    document.querySelector('.js-empty').innerHTML = ``;
  }

  todoList.push({
    name,
    dueDate,
    timeInput
  });

  inputElement.value = '';
  dateInputElement.value = '';
  timeInputElement.value = '';

  renderTodoList();

  // Save the updated todo list in localStorage
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}


  document.addEventListener('DOMContentLoaded', function() {
    var timeInput = document.getElementById('dueTimeInput');
    
    // Check if browser supports input[type="time"]
    if (timeInput.type === 'time') {
      timeInput.addEventListener('input', function() {
        var value = timeInput.value;
        if (value) {
          var [hours, minutes] = value.split(':');
          if (hours.length < 2) {
            hours = '0' + hours;
          }
          timeInput.value = `${hours}:${minutes}`;
        }
      });
    } else {
      // Fallback for browsers that don't support input[type="time"]
      timeInput.type = 'text';
      timeInput.placeholder = 'HH:MM';
      timeInput.pattern = '[0-9]{2}:[0-9]{2}';
      timeInput.addEventListener('input', function() {
        var value = timeInput.value;
        if (value && !/^\d{2}:\d{2}$/.test(value)) {
          timeInput.setCustomValidity('Invalid time format. Use HH:MM');
        } else {
          timeInput.setCustomValidity('');
        }
      });
    }
  });
