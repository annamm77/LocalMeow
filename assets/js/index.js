$( document ).ready(function() {
    console.log( "your jquery is working!" );
});

$('a.nextlink').click(function(event) {
    event.preventDefault();
    $('a.nextlink').parent().children('img').attr('src', 'boop');
});
