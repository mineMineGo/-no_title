module.exports = ['$scope', ($scope) =>{
  $scope.newTodo = "";
  $scope.addTodo = (newTodo) => {
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