const input = document.getElementById("todoinput")! as HTMLInputElement;
const form = document.querySelector("#todoform")! as HTMLFormElement;
const todoList = document.querySelector("#todolist");

const readTodos = (): Todo[] => {
  const todosJSON = localStorage.getItem("todos");
  if (todosJSON === null) return [];
  return JSON.parse(todosJSON);
};

const createTodo = (todo: Todo): void => {
  const newLI = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", (): void => {
    todo.completed = checkbox.checked;
    saveTodos();
  });

  newLI.append(checkbox);
  newLI.append(todo.text);
  todoList?.append(newLI);
};
const saveTodos = (): void => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const todos: Todo[] = readTodos();
todos.forEach(createTodo);

const handleSubmit = (e: SubmitEvent): void => {
  e.preventDefault();
  const newTodo: Todo = {
    text: input.value,
    completed: false,
  };
  createTodo(newTodo);
  todos.push(newTodo);
  saveTodos();
  input.value = "";
};

form.addEventListener("submit", handleSubmit);

interface Todo {
  text: string;
  completed: boolean;
}
