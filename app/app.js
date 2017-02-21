angular
  .module('shopOnMars', [
    'ngStamplay',
    'ui.router',
    'ngFileUpload',
    'app.routes',
    'app.admin',
    'app.authenticate',
    'app.checkout',
    'app.home',
    'app.product',
    'app.profile',
    'app.shop',
    'UserService',
    "ProductService"
  ])
  .controller('MainController', [ 'User', '$rootScope', MainController ]);

/**
 * The main controller for our application
 */
function MainController(User, $rootScope) {
  var main = this;
  $rootScope.currentUser = {};
  main.logout = logout;

  // Get the current user from backend and save it in rootscope.
  // Otherwise reset currentUser.
  User.getCurrent()
    .then(function(data) {
      var user = data.user;
      if (user && user._id) {
        $rootScope.currentUser.id = user.id;
        $rootScope.currentUser.name  = user.displayName;
        $rootScope.currentUser.image = user.profileImg;
      } else {
        $rootScope.currentUser = {};
      }
    });

  function logout() {
    User.logout();
    $rootScope.currentUser = {};
  }
}
