module.exports = ['$scope', function($scope){
  $scope.deleteTodo = function(delData){
    _.remove($scope.todos, function(todo){
      return todo === delData
    })
    $scope.setTodos($scope.todos)
  }
}]