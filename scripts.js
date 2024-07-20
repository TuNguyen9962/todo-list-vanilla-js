var todoListData = [
	{ name: "Todo 1", isDone: true },
	{ name: "Todo 2", isDone: false },
	{ name: "Làm bài tập về nhà nhứ 3 trong tuần", isDone: false },
];

let editingIndex = -1;

const todoNameInput = document.getElementById("task-name");
const addTodoButton = document.getElementById("add-task-button");
const cancelEditButton = document.getElementById("cancel-edit-button");
const filterInput = document.getElementById("filter-input");

const todoList = document.getElementById("todo-list");

addTodoButton.addEventListener("click", addOrEditTodo);
cancelEditButton.addEventListener("click", cancelEdit);

function addOrEditTodo() {
	const taskName = todoNameInput.value.trim();
	if (taskName) {
		if (editingIndex === -1) {
			todoListData.push({ name: taskName, isDone: false });
		} else {
			todoListData[editingIndex].name = taskName;
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
	const filterValue = filterInput.value;

	todoList.innerHTML = "";

	todoListData.forEach((todo, index) => {
		if (
			filterValue === "all" ||
			(filterValue === "done" && todo.isDone) ||
			(filterValue === "undone" && !todo.isDone)
		) {
			const li = document.createElement("li");
			if (todoListData[index].isDone === true) {
				li.innerHTML = `
                        <input type="checkbox" onchange="checkTodo(${index})" checked>
                        <span>${todo.name}</span>
                        <div class="area-button">
                            <button class="edit-button" onclick="editTodo(${index})">Edit</button>
                            <button class="delete-button" onclick="deleteTodo(${index})">Delete</button>
                        </div>
                    `;
			} else {
				li.innerHTML = `
					<input type="checkbox" onchange="checkTodo(${index})" >
	                <span>${todo.name}</span>
	                <div>
	                    <button class="edit-button" onclick="editTodo(${index})">Edit</button>
	                    <button class="delete-button" onclick="deleteTodo(${index})">Delete</button>
	                </div>
	            `;
			}

			todoList.appendChild(li);
		}
	});
}

filterInput.addEventListener("change", renderList);

function editTodo(index) {
	todoNameInput.value = todoListData[index].name;
	editingIndex = index;
	addTodoButton.textContent = "Save";
	cancelEditButton.style.display = "inline";
}

function deleteTodo(index) {
	//danh sách bắt đầu từ vị trí số 0
	todoListData.splice(index, 1);
	renderList();
}

function checkTodo(index) {
	if (todoListData[index].isDone === true) {
		todoListData[index].isDone = false;
		renderList();
	} else {
		todoListData[index].isDone = true;
		renderList();
	}
}

renderList();
