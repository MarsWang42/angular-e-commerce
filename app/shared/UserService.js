angular
    .module('UserService', [])
    .factory('User', ['$stamplay', '$q', UserService]);

function UserService($stamplay, $q) {

    // return an object all functions required
    return {
        getCurrent: getCurrent,
        signup: signup,
        login: login,
        logout: logout
    };

    /**
     * Get the current logged in user
     */
    function getCurrent() {
        var def = $q.defer();

        // Stamplay sdk will automatically generate
        // the AJAX call for you by given function
        var user = $stamplay.User;
        user.currentUser()
            .then(function(result) {
                // send the entire user model back
                def.resolve(result);
            });

        return def.promise;
    }

    /**
     * Register a user with their name, email, and password
     */
    function signup(data) {
        var def = $q.defer();

        // instantiate a new user model from the stamplay js sdk
        var user = $stamplay.User;
        user.signup(data)
            .then(function(result) {
                // send the entire user model back
                def.resolve(result);
              console.log(result)
            })

        return def.promise;
    }

    /**
     * Log a user in with their email and password
     */
    function login(data) {
        var def = $q.defer();

        var user = $stamplay.User;
        user.login(data)
            .then(function(result) {
                // send the entire user model back
                def.resolve(result);
            }, function() {
                def.reject({ 'error': 'Unable to login user.' });
            });

        return def.promise;
    }

    /**
     * Log the current user out
     */
    function logout() {
        var user = $stamplay.User;
        user.logout();
    }

} 
