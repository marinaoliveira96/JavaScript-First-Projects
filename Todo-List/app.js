//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const clearBtn = document.querySelector('.clear-tasks');
const filterAll = document.querySelector('#filter-all');

//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
clearBtn.addEventListener('click', clearTasks);
filterAll.addEventListener('keyup', filterTasks);

//functions
function addTodo(event) {
    //prevent to submitting
    event.preventDefault();

    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //add todo to localstorage
    saveLocalTodos(todoInput.value);

    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;
    //delete todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    //check mark
    if (item.classList[0] == 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //check --hey do i already have thing in there
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        //todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Clear Tasks
function clearTasks() {
    // //delete todo
    // const todo = document.querySelector('.todo');
    // //animation
    // todo.classList.add('fall');
    // removeLocalTodos(todo);
    // todo.addEventListener('transitionend', function () {
    //     todo.remove();
    // });

    // const todoR = todoList.childNodes;
    // todoR.forEach(function (t) {
    //     t.remove();
    // });
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }

    console.log('clear click');

    clearTasksFromLocalStorage();
}

//Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    //querrySelectorAll return a node list = allow foreach
    document.querySelectorAll('.todo-item').forEach(function (task) {
        // const item = task.firstChild.textContent;
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            // task.style.display = 'flex';
            task.parentElement.style.display = 'flex';
        } else {
            // task.style.display = 'none';
            task.parentElement.style.display = 'none';
        }
    });
}
// todo-item
