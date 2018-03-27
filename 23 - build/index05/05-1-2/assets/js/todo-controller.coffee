module.exports = ['$scope', ($scope) ->
  $scope.deleteTodo = (delData) ->
    _.remove($scope.todos, (todo) ->
      todo == delData;
    );
    $scope.setTodos($scope.todos);
];