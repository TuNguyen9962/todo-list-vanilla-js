todoList = [
	{ name: "Todo 1", isDone: false },
	{ name: "Todo 2", isDone: false },
];

let editingIndex = -1

const todoNameInput = document.getElementById("taskName");
const addTodoButton = document.getElementById("addTask");
const cancelEditButton = document.getElementById("cancelEdit")

const todoListElement = document.getElementById("todoList");

addTodoButton.addEventListener("click", addOrEditTodo);
cancelEditButton.addEventListener("click", cancelEdit);
function addOrEditTodo(){
	const taskName = todoNameInput.value.trim();
	if (taskName) {
		if (editingIndex === -1) {
			todoList.push({ name: taskName, isDone: false });
		} else {
			todoList[editingIndex].name = taskName;
			editingIndex = -1;
			addTodoButton.textContent = "Add";
			cancelEditButton.style.display = "none";
		}
		todoNameInput.value = "";
		renderList();
	}
}

function cancelEdit() {
	todoNameInput.value = "";
	editingIndex = -1;
	addTodoButton.textContent = "Add";
	cancelEditButton.style.display = "none";
}


function renderList() {
	const filterValue = filter.value;
	todoListElement.innerHTML = "";
	todoList.forEach((todo, index) => {
		if (
			filterValue === "all" ||
			(filterValue === "done" && todo.done) ||
			(filterValue === "undone" && !todo.done)
		) {
			const li = document.createElement("li");
			li.innerHTML = `
                <span>${todo.name}</span>
                <div>
                    <button class="edit-button" onclick="editTodo(${index})">Edit</button>
                    <button class="delete-button" onclick="deleteTodo(${index})">Delete</button>
                </div>
            `;
			todoListElement.appendChild(li);
		}
	});
}

function editTodo(index) {
	todoNameInput.value = todoList[index].name;
	editingIndex = index;
	addTodoButton.textContent = "Save";
	cancelEditButton.style.display = "inline";
}

function deleteTodo(index) {
	//danh sách bắt đầu từ vị trí số 0
	todoList.splice(index, 1)
	renderList();
}

function checkTodo(index) {
	if (todoList[index].isDone === true) {
		todoList[index].isDone = false
		renderList();
	}
	else {
		todoList[index].isDone = true
		renderList();
	}

}

renderList();
