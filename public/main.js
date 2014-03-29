$(document).ready(function() {
  $('#salida').hide();
  $('#parse').click(function() {
    try {
      var result = pl0.parse($('#input').val());
      $('#output').html(JSON.stringify(result,undefined,2));
      $('#entrada').hide();
      $( "#salida" ).show();
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
    $( "#tad_salida" ).parent().removeClass("active");
    $( "#savebutton" ).parent().removeClass("active");
    $( "#download" ).parent().removeClass("active");  
    $( "#tad_entrada" ).parent().addClass("active");
    
  $("#salida").hide();
  $( "#entrada" ).show();
});

$( "#tad_salida" ).click(function() {
    $( "#tad_entrada" ).parent().removeClass("active");
    $( "#savebutton" ).parent().removeClass("active");
    $( "#download" ).parent().removeClass("active");  
    $( "#tad_salida" ).parent().addClass("active");
    
  $("#entrada").hide();
  $( "#salida" ).show();

});

  $( "#download" ).click(function() {
    $( "#tad_entrada" ).parent().removeClass("active");
    $( "#savebutton" ).parent().removeClass("active");
    $( "#tad_salida" ).parent().removeClass("active");  
    $( "#download" ).parent().addClass("active");
    
    saveTextAsFile($( "#output" ).html(),$( "#saveas" ).val());
});
  
$( "#savebutton" ).click(function() {
    $( "#tad_entrada" ).parent().removeClass("active");
    $( "#download" ).parent().removeClass("active");
    $( "#tad_salida" ).parent().removeClass("active");  
    $( "#savebutton" ).parent().addClass("active");
    
    $('#formsave').submit();
});

  var editor = CodeMirror.fromTextArea($("#input"), {
    mode: "text/pascal"
  });

});


  function saveTextAsFile(val,name)
{
    var textToWrite = val;
    if(textToWrite.length>5){
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
    }else{
      alert("Es necesario introducir un contenido en el textarea y lanzar el parser antes de descargar!!");
    }
}

function test_main(value){ 
       var result = pl0.parse(value);
       
      return JSON.stringify(result,undefined,2).replace(/\n/g,"");
}

  

