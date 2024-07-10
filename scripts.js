todoList = [
	{ name: "Todo 1", isDone: false },
	{ name: "Todo 2", isDone: false },
];

const todoListElement = document.getElementById("todoList");

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
			if (todoList[index].isDone === true) {
				li.innerHTML = `
				<input type="checkbox" onchange="checkTodo(${index})" checked>
                <span>${todo.name}</span>
                <div>
                    <button class="edit-button" onclick="editTask(${index})">Edit</button>
                    <button class="delete-button" onclick="deleteTodo(${index})">Delete</button>
                </div>
            `;
			}
			else
			{
				li.innerHTML = `
				<input type="checkbox" onchange="checkTodo(${index})" >
                <span>${todo.name}</span>
                <div>
                    <button class="edit-button" onclick="editTask(${index})">Edit</button>
                    <button class="delete-button" onclick="deleteTodo(${index})">Delete</button>
                </div>
            `;}
			todoListElement.appendChild(li);
		}
	});
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
