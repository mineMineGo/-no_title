(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
module.exports = ['$scope', function($scope){
  $scope.newTodo = "";
  $scope.addTodo = function(newTodo){
    if(!newTodo){
      return;
    }
    $scope.todos.push({
      name: newTodo
    });
    $scope.setTodos($scope.todos);
    $scope.newTodo = '';
  };
}];
},{}],2:[function(require,module,exports){
var angular = require("angular");
var _ = require('lodash');
angular
.module("TodoList", [])
.controller('TodosController', require('./todos-controller.js'))
.controller('AddTodoController', require('./add-todo-controller.js'))
.controller("TodoController", require('./todo-controller.js'));
},{"./add-todo-controller.js":1,"./todo-controller.js":3,"./todos-controller.js":4,"angular":"angular","lodash":"lodash"}],3:[function(require,module,exports){
module.exports = ['$scope', function($scope){
  $scope.deleteTodo = function(delData){
    _.remove($scope.todos, function(todo){
      return todo === delData;
    });
    $scope.setTodos($scope.todos);
  };
}];
},{}],4:[function(require,module,exports){
module.exports = ['$scope', function($scope){
  $scope.setTodos = function(todos){
    localStorage.setItem('todos', JSON.stringify(todos))
  };

  $scope.getTodos = function(){
    todos = localStorage.getItem('todos');
    if(todos){
      todos = JSON.parse(todos);
    }else{
      todos = [];
    }
    return todos;
  };
  $scope.todos = $scope.getTodos();
}];
},{}]},{},[2]);
