module.exports = ['$scope', ($scope)=>{
  $scope.setTodos = (todos)=>{
    localStorage.setItem('todos', JSON.stringify(todos))
  };

  $scope.getTodos = ()=>{
    var todos = localStorage.getItem('todos');
    if(todos){
      todos = JSON.parse(todos);
    }else{
      todos = [];
    }
    return todos;
  };
  $scope.todos = $scope.getTodos();
}];