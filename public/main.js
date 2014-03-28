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
  $( "#salida" ).show();

});

  $( "#download" ).click(function() {
    saveTextAsFile($( "#output" ).html(),$( "#saveas" ).val());
});
  

  var editor = CodeMirror.fromTextArea($("#salida"), {
    mode: "text/pascal"
  });

});


  function saveTextAsFile(val,name)
{
    var textToWrite = val;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = name;
    
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

  

