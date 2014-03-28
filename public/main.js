$(document).ready(function() {
  $('#parse').click(function() {
    try {
      var result = pl0.parse($('#input').val());
      $('#output').html(JSON.stringify(result,undefined,2));
    } catch (e) {
      $('#output').html('<div class="error"><pre>\n' + String(e) + '\n</pre></div>');
    }
  });

  $("#examples").change(function(ev) {
    var f = ev.target.files[0]; 
    var r = new FileReader();
    r.onload = function(e) { 
      var contents = e.target.result;
      
      input.innerHTML = contents;
    }
    r.readAsText(f);
  });

  
  
$( "#tad_entrada" ).click(function() {
  $("#salida").hide();
  $( "#entrada" ).show();
});

$( "#tad_salida" ).click(function() {
  $("#entrada").hide();
  editor.
  $( "#salida" ).show();
});

  var editor = CodeMirror.fromTextArea($("#salida"), {
    mode: "text/pascal"
  });

});

  

