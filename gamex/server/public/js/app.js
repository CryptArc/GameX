App = {

  init: function() {
    // Load pets.
    $.getJSON('../credits.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.credit-title').text(data[i].creditTitle);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.game-name').text(data[i].gameName);
        petTemplate.find('.credit-name').text(data[i].creditName);
        petTemplate.find('.price').text(data[i].price);
        petTemplate.find('.btn-buy').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
