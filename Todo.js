// Variables
let todoList = document.getElementById("todoList");
let todoTable = document.getElementById("todoTable");
let doneList = document.getElementById("doneList");
let todoArray = [];
	// Dummy task string
	// [{ id: 1, task: "test task", completed: false, deleted: false},{ id: 2, task: "test task2", completed: true, deleted: false},{ id: 3, task: "test tasks", completed: true, deleted: true}];
let todoIndex = 0;
let todoTextBox = document.getElementById("newTodo");

/*
// Check local storage for persistent tasks
let storage = localStorage.getItem("todoArray");
if (storage != null) {
	todoIndex = parseInt(localStorage.getItem("todoIndex"));
	todoArray = JSON.parse(storage);
	todoArray.forEach(element => {
		switch (element.completed) {
			case false:
				if (element.deleted == false) {
					var newRow = document.createElement("tr");
					newRow.id = 'task' + element.id;
					newRow.className = 'task';
					newRow.innerHTML = `
						<th scope="row"><span class="notDone">&#9744;</span></th>
						<td>` + element.task + `</td>
						<td><span class="delete">&#10008;</span></td>`;
					todoTable.appendChild(newRow);
				}
				break;
			case true:
				if (element.deleted == false) {
					var newRow = document.createElement("tr");
					newRow.id = 'task' + element.id;
					newRow.className = 'task';
					newRow.innerHTML = `
						<th scope="row"><span class="notDone">&#9745;</span></th>
						<td>` + element.task + `</td>
						<td><span class="delete">&#10008;</span></td>`;
					doneTable.appendChild(newRow);
				}
				break;
			default:
				fireToast("There was an issue with the saved local storage!\nClear local storage");
				break;
		}
	});
}
*/

/*
// setup listeners for both lists
todoList.addEventListener('click', (caller) => {
	console.log(caller.target);
	var callerNode = caller.target;
	var taskParent = callerNode.closest(".task"); // Find closest parent with the .task class
	var callerID = taskParent.id.substring(4);
	var callerClass = callerNode.className;
	switch (callerClass) {
		case "notDone":
			doneTodo(callerID);
			callerNode.className = "done";
			callerNode.innerHTML = "&#9745;";
			break;
		case "delete":
			deleteTodo(callerID);
		default:
			break;
	}
})
*/

/*
doneList.addEventListener('click', (caller) => {
	console.log(caller.target);
	var callerNode = caller.target;
	var taskParent = callerNode.closest(".task"); // Find closest parent with the .task class
	var callerID = taskParent.id.substring(4);
	var callerClass = callerNode.className;
	console.log(callerNode.className);
	switch (callerClass) {
		case "done":
			undoneTodo(callerID);
			callerNode.className = "notDone";
			callerNode.innerHTML = "&#9744;";
			break;
		case "delete":
			deleteTodo(callerID);
		default:
			break;
	}
})
*/

/*
// Listener for Add Task button
document.getElementById("addTodo").addEventListener('click', () => {
	// Verify box IS NOT empty before proceeding
	let workingText = todoTextBox.value;
	if (workingText != "" ) {
		addNewTodo(workingText);
		todoTextBox.value= "";
	} else {
		fireToast("You didn't enter a task!?\nDo you NOT have anything to do?");
	};
	
	// console.log(todoArray);
})
*/


function addNewTodo (taskText) {
	// Create function to make new todo
	todoArray.push({
		id: todoIndex,
		task: taskText,
		completed: false,
		deleted: false
		});
	
	var newRow = document.createElement("tr");
	newRow.id = 'task' + todoIndex;
	newRow.className = 'task';
	newRow.innerHTML = `
		<th scope="row"><span class="notDone">&#9744;</span></th>
		<td>` + taskText + `</td>
		<td><span class="delete">&#10008;</span></td>`;
	todoTable.appendChild(newRow);
	localStorage.setItem("todoArray", JSON.stringify(todoArray));
	localStorage.setItem("todoIndex", todoIndex);
	todoIndex += 1;
	fireToast('New Task added!');
}

function doneTodo (taskIndex) {
	// What happens when a todo is done
	var moveID = 'task' + taskIndex;
	var moveTask = document.getElementById(moveID);
	doneTable.appendChild(moveTask);
	var tempTask = todoArray.find((task) => task.id == taskIndex);
	tempTask.completed = true;
	localStorage.setItem("todoArray", JSON.stringify(todoArray));
	fireToast("Task Completed!!");
	// Modify array
}

function undoneTodo (taskIndex) {
	// What happens when a todo is undone
	var moveID = 'task' + taskIndex;
	var moveTask = document.getElementById(moveID);
	todoTable.appendChild(moveTask);
	var tempTask = todoArray.find((task) => task.id == taskIndex);
	tempTask.completed = false;
	localStorage.setItem("todoArray", JSON.stringify(todoArray));
	fireToast("Task unCompleted!!");
	// Modify array
}

function deleteTodo(taskIndex) {
	// What happens when we delete a task
	var moveID = 'task' + taskIndex;
	var moveTask = document.getElementById(moveID);
	moveTask.remove();
	var tempTask = todoArray.find((task) => task.id == taskIndex);
	tempTask.deleted = true;
	localStorage.setItem("todoArray", JSON.stringify(todoArray));
	fireToast("Task Deleted!!");
	// Modify array
}

function fireToast (content) {
	Toastify({
	  text: content,
	  duration: 3000,
	  close: false,
	  gravity: "bottom", // `top` or `bottom`
	  position: "center", // `left`, `center` or `right`
	  stopOnFocus: true, // Prevents dismissing of toast on hover
	  //style: {background: "linear-gradient(to right, #00b09b, #96c93d)",},
	  onClick: function(){} // Callback after click
	}).showToast();
}