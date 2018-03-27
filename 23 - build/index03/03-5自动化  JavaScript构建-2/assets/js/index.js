angular
.module("TodoList", [])
.controller('TodosController', require('./todos-controller.js'))
.controller('AddTodoController', require('./add-todo-controller.js'))
.controller("TodoController", require('./todo-controller.js'));