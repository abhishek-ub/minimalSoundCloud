
function login () {
    SC.initialize({
          client_id: '14bf255b6a8682914f41bdc90e3d4bde',
      redirect_uri: 'http://localhost/soundcloud-callback.html'
    });

    // initiate auth popup
    SC.connect().then(function() {
      return SC.get('/me');
    }).then(function(me) {
         alert('Hello, ' + me.username);
    });
}


$(function () {
    alert("hey");
    $("#loginbutton").click( function() {
        login();
    });
});

