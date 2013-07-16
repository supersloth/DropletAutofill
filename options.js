function getJSONData() {
    var data = localStorage["DropletAutofillJSONData"];
    if(data == null || data == undefined || data == "") {
        $("#note")[0].innerHTML = "<strong>Oh Snap!!</strong> It seems that you dont have any JSON data. Please contact your lead to get the latest JSON file.";
        $("#note").addClass("alert alert-error");
    }
    else {
        $("#jsonText").val(data);
    }
}

/*
 * called automatically as soon as the options page loads
*/
$( document ).ready(function() {
    $("#updateButton").bind('click', function(){
        localStorage["DropletAutofillJSONData"] = $("#jsonText").val();
        $("#note").removeClass("alert-error");
        $("#note").addClass("alert alert-success");
        $("#note")[0].innerHTML = "<strong>Nice!!</strong> Now that you have the updated JSON data, try clicking on the droplet icon on the extentions bar.";
    });
    getJSONData();
});