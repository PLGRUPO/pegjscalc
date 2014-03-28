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
    if(f){
      var r = new FileReader();
	r.onload = function(e) { 
	  var contents = e.target.result;
	  $("#saveas").val(f.name);
	  input.innerHTML = contents;
	}
      r.readAsText(f);
    } else { 
      alert("Failed to load file");
    }
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

  

