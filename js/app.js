
function login () {
    SC.initialize({
          client_id: '14bf255b6a8682914f41bdc90e3d4bde',
      redirect_uri: 'http://minimalsoundcloud.bitballoon.com/soundcloud-callback.html'
    });

    // initiate auth popup
    SC.connect().then(function() {
      return SC.get('/me');
    }).then(function(me) {
         console.log('Hello, ' + me.username);
         removelogon();
    });

    SC.get('/tracks', {
          q: 'buskers', license: 'cc-by-sa'
    }).then(function(tracks) {
          console.log(tracks);
    });
}


function removelogon() {
    $("#loginbutton").remove();
}


$(function () {
    $("#loginbutton").click( function() {
        login();
    });
});

