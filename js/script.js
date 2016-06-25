var qs = function(input) {
	return document.querySelector(input)
}


var EtsyRoutes = Backbone.Router.extend({
	routes: {
		"/store/:shopID/:itemId": "doItemView",
		"/store/:shopID": "doShopView", 
		"/search/:topic": "doSearchView", 
		"/home": "showHomeView", 
		"*catchAll": "redirect" 
	},
	doItemView: function() {

	},
	doShopView: function() {

	},
	doSearchView: function() {

	},
	showHomeView: function() {

	},
	redirect: function() {

	}
});

