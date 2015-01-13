
angular.module('userFactories', ['firebase', 'firebase.utils', 'changeEmail'])


    .factory('authUserFactory', ['$firebaseAuth', 'fbutil', function($firebaseAuth, fbutil) {
     return $firebaseAuth(fbutil.regularRef);
     }])


    .factory('userFactories', ['$firebaseAuth', 'fbutil', 'changeEmail', '$firebase', 'FBURL', 'authUserFactory',
        function($firebaseAuth, fbutil, changeEmail, $firebase, FBURL, authUserFactory) {
            var auth = authUserFactory;
            var listeners = [];



            //every time user status changes it fires and check user is first authenticating in app and
            //then if first time save into Firebase
            auth.$onAuth(function(authData){
                if(authData){

                    var exsitingUser = fbutil.regularRef.child('users').child(authData.uid);
                    exsitingUser.on("value", function(snapshot) {
                        UserFunction.user.info = snapshot.val();
                        //fns.user.info = snapshot.val();
                        //fns.user.data = snapshot.val();
                        console.log('this is checking user data in firebase. And if there is no data, this function will record data in Firebase');
                        if(snapshot.val() === null) {
                            var newUserData =  $firebase(fbutil.regularRef.child('users'));
                            newUserData.$set(authData.uid, authData);
                            console.log('this is new user, I just saved data!');                        }
                    }, function (errorObject) {
                        console.log("The read failed: " + errorObject.code);
                    });
                    console.log("onAuth just fired from onAuth service: Payload of authData ");
                } else {
                    console.log("User not authenticated!");
                };


            });



            return UserFunction = {
                user: {
                    info: null
                },

                login: function(email, pass) {
                    return auth.$authWithPassword({
                        email: email,
                        password: pass
                    }, {rememberMe: true});
                },

                //oauth to login 3 party provider like Facebook, Twitter, Github and Google
                oauthLogin: function(provider){
                    return auth.$authWithOAuthPopup(provider).then(function(authData) {
                        return authData;
                        console.log("Success log fired from oathLogin function in userFactory:");
                    }).catch(function(error) {
                        return error;
                    });
                },

                logout: function() {
                    auth.$unauth();
                    this.user.info = null;
                }

            };
        }]);