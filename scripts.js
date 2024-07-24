function TodoApp() {
  this.todoListData = [
    { name: 'Todo 1', isDone: true },
    { name: 'Todo 2', isDone: false },
    { name: 'Làm bài tập về nhà nhứ 3 trong tuần', isDone: false },
  ];
  this.editingIndex = -1;
  this.todoNameInput = document.getElementById('task-name');
  this.addTodoButton = document.getElementById('add-task-button');
  this.cancelEditButton = document.getElementById('cancel-edit-button');
  this.filterInput = document.getElementById('filter-input');
  this.todoList = document.getElementById('todo-list');

  this.addTodoButton.addEventListener('click', this.addOrEditTodo.bind(this));
  this.cancelEditButton.addEventListener('click', this.cancelEdit.bind(this));
  this.filterInput.addEventListener('change', this.renderList.bind(this));

  this.renderList();
}

TodoApp.prototype.addOrEditTodo = function () {
  const taskName = this.todoNameInput.value.trim();
  if (taskName) {
    if (this.editingIndex === -1) {
      this.todoListData.push({ name: taskName, isDone: false });
    } else {
      this.todoListData[this.editingIndex].name = taskName;
      this.editingIndex = -1;
      this.addTodoButton.textContent = 'Add';
      this.cancelEditButton.style.display = 'none';
    }
    this.todoNameInput.value = '';
    this.renderList();
  }
};

TodoApp.prototype.cancelEdit = function () {
  this.todoNameInput.value = '';
  this.editingIndex = -1;
  this.addTodoButton.textContent = 'Add';
  this.cancelEditButton.style.display = 'none';
};

TodoApp.prototype.renderList = function () {
  const filterValue = this.filterInput.value;
  this.todoList.innerHTML = '';

  this.todoListData.forEach((todo, index) => {
    if (
      filterValue === 'all' ||
      (filterValue === 'done' && todo.isDone) ||
      (filterValue === 'undone' && !todo.isDone)
    ) {
      const li = document.createElement('li');
      li.innerHTML = `
<input type="checkbox" onchange="app.checkTodo(${index})" ${
        todo.isDone ? 'checked' : ''
      }>
<span>${todo.name}</span>
<div class="area-button">
<button class="edit-button" onclick="app.editTodo(${index})">Edit</button>
<button class="delete-button" onclick="app.deleteTodo(${index})">Delete</button>
</div>
`;
      this.todoList.appendChild(li);
    }
  });
};

TodoApp.prototype.editTodo = function (index) {
  this.todoNameInput.value = this.todoListData[index].name;
  this.editingIndex = index;
  this.addTodoButton.textContent = 'Save';
  this.cancelEditButton.style.display = 'inline';
};

TodoApp.prototype.deleteTodo = function (index) {
  this.todoListData.splice(index, 1);
  this.renderList();
};

TodoApp.prototype.checkTodo = function (index) {
  this.todoListData[index].isDone = !this.todoListData[index].isDone;
  this.renderList();
};

const app = new TodoApp();