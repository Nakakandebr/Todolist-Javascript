const firstContainer = document.getElementById('todos');
const addForm = document.getElementById('addTodoForm');
const todoInput = document.getElementById('ourtodo');
let todos = [];
const getTodos = () => {
  return fetch('https://dummyjson.com/todos/user/7')
    .then(response => response.json())
    .then(response => {
      todos = response.todos;
      console.log(todos);
    });
};


const displayTodos = () => {
  firstContainer.innerHTML = '';
  todos.map(item => {
    let div = document.createElement('div');
    let todo = document.createElement('h3');
    let completed = document.createElement('p');
    let checkbox = document.createElement('input');
    let  removeButton = document.createElement('button');


    todo.innerHTML = item.todo;
    completed.innerHTML = item.completed;
    checkbox.type = 'checkbox';
    checkbox.checked = item.completed;
    removeButton.textContent = '-';
    checkbox.addEventListener('click', () => updateTodo(item.id, checkbox.checked));
    removeButton.addEventListener('click', () => deleteTodo(item.id));



    div.appendChild(todo);
    div.appendChild(completed);
    div.appendChild(checkbox);
    div.appendChild(removeButton);
    div.setAttribute('key', item.id);
    div.setAttribute('class', 'get');
   
   
  

    if (item.completed) {
      div.style.color = 'blue';
    } else {
       div.style.color= 'red';
     
    }


    firstContainer.appendChild(div);
  });
};




const addTodo = () => {
  const todo = todoInput.value;
  fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      todo,
      completed: true,
      userId: 3
      
    }),
  })
    .then(response => response.json())
    .then(response => {
      if (response.completed) {
        updateTodo(response.id, true);
      }
      todos.unshift(response);
      displayTodos();
      todoInput.value = '';
    })
    .catch(error => {
      console.error('failure of adding todo message:', error);
    });
};


const deleteTodo = todoId => {
  fetch('https://dummyjson.com/todos/7', {
    method: 'DELETE',
  })
    .then(() => {
      todos = todos.filter(item => item.id !== todoId);
      displayTodos();
    })
    .catch(error => {
      console.error('failure of deleting todo message:', error);
    });
};
const updateTodo = (todoId, completed) => {
  const updatedTodo = todos.find(item => item.id === todoId);
  if (updatedTodo) {
    updatedTodo.completed = completed;
    fetch('https://dummyjson.com/todos/7',{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        updatedTodo)
    })
    .then(response =>response.json())
    .then(response=>{
       if(response.ok) {console.log("The PUT rquest was successful .")}
   else{
       console.log("PUT request was not a success")}
       
  
  
  })
 
  .then(response=>console.log(response))
  .catch(error=>console.log(error))
    
  }
};




 addForm.addEventListener('submit', add => {
  add.preventDefault();
  addTodo();
 });
getTodos()
  .then(() => {
    displayTodos();
  });



















































