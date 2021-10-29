$(document).ready(function(){
  // Disable Browser Caching
  $.ajaxSetup({ cache: false });

  $('#search').keyup(function(){
      //Hide loading elements
      $('#load_img, #load_label').hide();
      // Clear result on keyup
      $('#result').html('');
      // Get Radio button val
      var checkedRadio = $("input[name='search_option']:checked").val();
      // Get Search Field input
      var searchField = $('#search').val();
      // If no input reload img
      if(searchField == ''){
        // Return loading img
        $('#load_img, #load_label').show();
        // Clear Html container
        $('#result').clear('');
      }
      // Add regex to field
      var expression = new RegExp(searchField, "i");

      // Get JSON Object
      $.getJSON('js/json200.js', function(data) {
        // loop through JSON Object
        $.each(data.results, function(key, value){

          // Reusable Html Element
          var htmlElement = '<li class="list-group-item link-class"><img src="'+value.picture.thumbnail
          +'" height="40" width="40" class="img-thumbnail" /> '+value.name.first+" "+value.name.last
          +' | <span class="text-muted">Adress: '+value.location.street+'</span> | <span class="text-muted">Age: '
          +value.dob.age+'</span><button style="float:right;" data-id='+key+' class="btn btn-info">X</button></li>'

          // RadioButton Name
          if('name' == checkedRadio){
            // Compare by Name
            if (value.name.first.search(expression) != -1 || value.name.last.search(expression) != -1 ){
              // Append content
              $('#result').append(htmlElement);

            }
          }
          // RadioButton Address
          else if ('address' == checkedRadio) {
            // Compare by Address
            if (value.location.street.search(expression) != -1){
              // Append content
              $('#result').append(htmlElement);

            }
          }
          // RadioButton Age
          else if ('age' == checkedRadio) {
            // Compare by Age
            if((value.dob.age).toString().search(expression) != -1 ){
              // Append content
              $('#result').append(htmlElement);

            }
          }
        });
      });
  });

  // Get and exectute delete
  $(document).on('click','button',function(){
     $(this).parent().remove()
  });
});
