
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    populateFields(request.message);
  });

function populateFields(value) {
    $.each(value, function(name, innerValue){
        if(!$("#"+name).attr("disabled")) {
            callEvents(name, innerValue);
            
        }
    });
}

function callEvents(name, innerValue) {
   // for checkbox
    if($("#"+name)[0].type == "checkbox") {
        if(!$("#"+name).prop("checked")){
            $("#"+name).trigger("click");

            $("#"+name).prop("checked", innerValue);
            $("#"+name).trigger("change");
        }
    }
    // for input fields and select boxes
    else {
        $("#"+name).trigger("click");
        $("#"+name).trigger("keydown");
        $("#"+name).val(innerValue);
        $("#"+name).trigger("change");
        $("#"+name).trigger("keyup");
    }
    
}
