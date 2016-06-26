// example url for requests
// https://openapi.etsy.com/v2/listings/active?api_key=r0qoq1mdfhswufpc5krm18n4

// sample search URL 
// https://openapi.etsy.com/v2/listings/active.js?keywords="+terms+"&limit=12&includes=Images:1&api_key="+api_key

var qs = function(input) {
	return document.querySelector(input)
}
var ItemCollection = Backbone.Collection.$.extend({
	url: "https://openapi.etsy.com/v2/listings/active"
	_key: "r0qoq1mdfhswufpc5krm18n4"
	parse: function(rawJSON){
		return rawJSON.response.docs
	}
});


var EtsyRoutes = Backbone.Router.extend({
	routes: {
		"/store/:shopID/:itemId": "doItemView",
		"/search/:topic": "doSearchView", 
		"/home": "showHomeView", 
		"*catchAll": "redirect" 
	},
	doItemView: function(itemID) {

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

	},
	redirect: function() {

	},
	initialize: function(){
		Backbone.history.start();
	}
});

