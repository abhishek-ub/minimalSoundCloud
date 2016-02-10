function init() {
    SC.initialize({
          client_id: '14bf255b6a8682914f41bdc90e3d4bde',
      redirect_uri: 'http://minimalsoundcloud.bitballoon.com/soundcloud-callback.html'
    });
}


function login () {

    // initiate auth popup
    //SC.connect().then(function() {
    //  return SC.get('/me');
    //}).then(function(me) {
    //     console.log('Hello, ' + me.username);
    //     removelogon();
    //});

}

var page_size = 50;
var prevTerm = "";
function search(term) {
    // if search term don't change, do nothing
    if (prevTerm == term) { return };
    prevTerm = term;
    // clear previous list
    $("#tracklist").empty();

    SC.get('/tracks', {
          q: term, limit: page_size, linked_partitioning: 1
    }).then(function(tracks) {
          console.log(tracks);
          listtracks(tracks.collection);
          ontrackClick(tracks.collection);
    });
}

function listtracks(tracks) {
    for (var i = 0; i <tracks.length  ; i++) {
        $("#maintable > tbody:last").append('<tr><td>'+ tracks[i].title.toLowerCase() + ' </td></tr>');
    };
}

var prev_track;
function ontrackClick (tracks) {
    $("#maintable").find("tr").click(function() {
        console.log(tracks[$(this).index()].title);
        var track_url = tracks[$(this).index()].uri;
        
        if (prev_track == track_url) { return};
        prev_track = track_url;
        
        SC.oEmbed(track_url, { auto_play: true, show_artwork: false}).then(function(oEmbed) {
            console.log('oEmbed response: ', oEmbed);
            var frame = oEmbed.html.replace("visual=true", "visual=false");
            var re = (/(height=")(\d+")/g);
            frame = frame.replace(re, "height=\"150\"");
            $("#playerRow").html('<td>'+ frame + ' </td>');
        });

    });
}

function removelogon() {
    $("#loginbutton").remove();
}


$(function () {
    init();

    $("#loginbutton").click( function() {
        login();
    });

    $("#searchform").on("submit", function(e) {
        e.preventDefault();
        search($("#search").val());
        
    });
});

