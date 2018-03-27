(function() {
  module.exports = [
    '$scope',
    function($scope) {
      return $scope.deleteTodo = function(delData) {
        _.remove($scope.todos,
    function(todo) {
          return todo === delData;
        });
        return $scope.setTodos($scope.todos);
      };
    }
  ];

}).call(this);
