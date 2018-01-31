$( document ).ready(function() {
    console.log( "ready!" );
    $games = $("#games");
    $marketplace = $("#marketplace");
    $games.on('click', ()=>{
    	$.get("/games");
    });
    $marketplace.on('click', ()=>{
    	$.ajax({url: "http://127.0.0.1:3000/market.html", type: "get"});
    });
});