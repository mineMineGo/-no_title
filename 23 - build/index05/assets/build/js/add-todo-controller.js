(function() {
  module.exports = [
    '$scope',
    function($scope) {
      alert("heiheie");
      $scope.newTodo = "";
      return $scope.addTodo = function(newTodo) {
        if (!newTodo) {
          return;
        }
        $scope.todos.push({
          name: newTodo
        });
        $scope.setTodos($scope.todos);
        return $scope.newTodo = '';
      };
    }
  ];

}).call(this);
