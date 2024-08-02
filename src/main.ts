const taskForm = document.querySelector<HTMLFormElement>(".form");
const formInput = document.querySelector<HTMLInputElement>(".form-input");
const taskListElement = document.querySelector<HTMLUListElement>(".list");

type Task = {
  id: number;
  description: string;
  isCompleted: boolean;
};

let tasks: Task[] = loadLocalStorage();

function loadLocalStorage(): Task[] {
  const storedTasks = localStorage.getItem("tasks");

  return storedTasks ? JSON.parse(storedTasks) : [];
}

tasks.forEach(renderTask);

taskForm?.addEventListener("submit", (event) => {
  event?.preventDefault();

  const taskDescription = formInput?.value;
  if (taskDescription) {
    const task: Task = {
      id: Date.now(),
      description: taskDescription,
      isCompleted: false,
    };
    // add task to list
    addTask(task);
    // render tasks
    renderTask(task);
    // update local storage
    updateLocalStorage();
    formInput.value = "";
    return;
  }

  alert("Please insert a task!");
});

function addTask(task: Task): void {
  tasks.push(task);

  console.log(tasks);
}

function renderTask(task: Task): void {
  const taskElement = document.createElement("li");
  //   taskElement.textContent = task.description;

  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = task.isCompleted;

  const taskSpan = document.createElement("span");
  taskSpan.className = "task";
  taskSpan.textContent = task.description;

  taskCheckbox.addEventListener("change", () => {
    task.isCompleted = !task.isCompleted;
    console.log("task", task);

    taskSpan.style.textDecoration = task.isCompleted ? "line-through" : "";
    updateLocalStorage();
  });

  // taskElement.append(taskSpan);

  const group = document.createElement("div");
  group.className = "item";
  const deleteIcon = document.createElement("span");
  deleteIcon.className = "material-symbols-outlined delete";
  deleteIcon.textContent = " delete ";

  deleteIcon.addEventListener("click", () => {
    //verificar qual o index do li
    deleteTask(task.id, taskElement);
  });

  group.appendChild(taskCheckbox);
  group.appendChild(taskSpan);

  // taskElement.append(group);

  taskElement?.appendChild(group);
  taskElement?.appendChild(deleteIcon);

  taskListElement?.appendChild(taskElement);
}

function deleteTask(taskId: number, taskElement: HTMLLIElement): void {
  tasks = tasks.filter((task) => task.id !== taskId);

  taskElement?.remove();

  updateLocalStorage();
}
function updateLocalStorage(): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
