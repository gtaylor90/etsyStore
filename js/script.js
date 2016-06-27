// example url for requests
// https://openapi.etsy.com/v2/listings/active?api_key=r0qoq1mdfhswufpc5krm18n4

// sample search URL 
// https://openapi.etsy.com/v2/listings/active.js?keywords="+terms+"&limit=12&includes=Images:1&api_key="+api_key

var qs = function(input) {
    return document.querySelector(input)
}
var ItemCollection = Backbone.Collection.extend({
    url: "https://openapi.etsy.com/v2/listings/active",
    _key: "r0qoq1mdfhswufpc5krm18n4",
    parse: function(rawJSON) {
        return rawJSON.response.docs
    }
});


var EtsyRouter = Backbone.Router.extend({
    routes: {
        "/store/:shopID/:itemId": "doItemView",
        "/search/:topic": "doSearchView",
        "/home": "showHomeView",
        "*catchAll": "redirect"
    },
    doItemView: function(itemID) {
    	var itemModel = new ItemCollection()
    	console.log(itemModel)
    	itemModel.fetch({
    		dataType: 'jsonp',
    		processData: true,
    		data: {
    			apikey: itemModel._key
    		}
    	})
    },
    doSearchView: function(searchTerm) {
        var searchCollection = new ItemCollection()
        searchCollection.fetch({
            dataType: 'jsonp',
            processData: true,
            data: {

            }

        });
        new ItemsView(searchCollection);
    },
    showHomeView: function() {
        var homeCollection = new ItemCollection()
        homeCollection.fetch({
            dataType: 'jsonp',
            processData: true,
            data: {

            }
        })

    },
    redirect: function() {
    	location.hash = "home"
    },
    initialize: function() {
        Backbone.history.start();
    }
});

new EtsyRouter()

qs('input').addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        location.hash = "search/" + e.target.value
    }
})
