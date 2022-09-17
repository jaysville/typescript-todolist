"use strict";
const input = document.getElementById("todoinput");
const form = document.querySelector("#todoform");
const todoList = document.querySelector("#todolist");
const readTodos = () => {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
};
const createTodo = (todo) => {
    const newLI = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        saveTodos();
    });
    newLI.append(checkbox);
    newLI.append(todo.text);
    todoList?.append(newLI);
};
const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};
const todos = readTodos();
todos.forEach(createTodo);
const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
        text: input.value,
        completed: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);
    saveTodos();
    input.value = "";
};
form.addEventListener("submit", handleSubmit);
