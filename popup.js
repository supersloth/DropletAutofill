/*
 * A backbone view
*/
var list = Backbone.View.extend({
    events:{
    },
	initialize: function() {
        var self = this;
        _.bindAll(self, 'render', 'createMessage');
        var data = localStorage["DropletAutofillJSONData"];
        self.model = new listmodel(eval("(" + data + ")"));
        if(data == null || data == undefined || data == "") {
        }
        else {
            self.render();
        }
	},
	render: function() {
        var self = this;
		$.each(this.model.attributes, function(index, value){
            var template1 = _.template($("#displaySet").html(), {setName: index});
            $("#set").append(template1);
        });
        
        $(".fill").bind('click', function(){
            self.createMessage(this);
        });
	},
    createMessage: function(event){
        console.log($(event).parent().parent());
        var index = $(event).parent().parent().find('.setName')[0].innerHTML;
        this.sendMessageToConentScript(index);
    },
    sendMessageToConentScript: function(index) {
        var value = this.model.get(index);
        /*$.each(value, function(name, innerValue){
                console.log(name+" : "+ innerValue);
            $("#set").append(name+" : "+ innerValue+"<hr>");
        });*/
        
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendMessage(tab.id,{message:value}, function(response) {
                console.log('Start action sent');
            });
        });
    }
});

/*
 * A model that just specifies the url to get the data from
*/
var listmodel = Backbone.Model.extend({
});


/*
 * called automatically as soon as the page loads
*/
$( document ).ready(function() {
    new list();
});