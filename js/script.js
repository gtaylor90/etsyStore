// example url for requests
// https://openapi.etsy.com/v2/listings/active?api_key=r0qoq1mdfhswufpc5krm18n4

// sample search URL 
// https://openapi.etsy.com/v2/listings/active.js?keywords="+terms+"&limit=12&includes=Images:1&api_key="+api_key

var qs = function(input) {
    return document.querySelector(input)
};

var ItemCollection = Backbone.Collection.extend({
    url: "https://openapi.etsy.com/v2/listings/active",
    _key: "r0qoq1mdfhswufpc5krm18n4",
    parse: function(rawJSON) {
    	console.log('Parsing Item Collection')
        return rawJSON.response.docs
    }
});

var ItemModel = Backbone.Model.extend({
	url: "https://openapi.etsy.com/v2/listings/active",
    _key: "r0qoq1mdfhswufpc5krm18n4",
    parse: function(rawJSON) {
    	console.log('parsing Item Model')
        return rawJSON.response.docs[0]
    }
})

var ItemsView = Backbone.View.extend({
	el: qs("#container"),
	events:{
		"click .itemContainer": "_handleClick"
	},
	initialize: function(coll){
		console.log('Initializing Items View')
		var thisView = this
		this.coll = coll
		var boundRender = this._render.bind(thisView)
		this.coll.on('sync', boundRender)
	},
	_handleClick: function(e){
		var itemDiv = e.target
		window.itemDiv = itemDiv
		location.hash = "item/" + itemDiv.getAttribute('listing_id')
	},
	_render: function(){
		var itemsArray = this.coll.models
		var htmlString = ''
		for (var i = 0; i < itemsArray.length; i++) {
			var itemMod = itemsArray[i]
			console.log(itemMod)
			// build out the HTML from here…
		}
		this.el.innerHTML = htmlString
	}
});

var DetailView = Backbone.View.extend({
	el: qs("#container"),
	initialize: function(model){
		console.log('Initializing Detail View')
		this.model = model;
		var boundRender = this._render.bind(this) 
		this.model.on('sync', boundRender)
	},
	_render: function(){
		console.log(this.model)
		// use this space to render out the detail view of the list items
		// once we get that hammered out
	}	
});

var EtsyRouter = Backbone.Router.extend({
    routes: {
        "item/:itemId": "doItemView",
        "search/:topic": "doSearchView",
        "home": "showHomeView",
        "*catchAll": "redirect"
    },
    doItemView: function(itemID) {
    	console.log('Doing Item View')
    	var itemModel = new ItemModel()
    	console.log(itemModel)
    	itemModel.fetch({
    		dataType: 'jsonp',
    		processData: true,
    		data: {
    			apikey: itemModel._key
    		}
    	})
    	new DetailView(itemModel)
    },
    doSearchView: function(searchTerm) {
    	console.log('Doing Search View')
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
    	console.log('Doing Home View')
        var homeCollection = new ItemCollection()
        homeCollection.fetch({
            dataType: 'jsonp',
            processData: true,
            data: {
            	// apikey: homeCollection._key
            }
        })

    },
    redirect: function() {
    	console.log('Doing Redirect')
    	location.hash = "home"
    },
    initialize: function() {
    	console.log('Doing Initialize')
        Backbone.history.start();
    }
});

new EtsyRouter();

qs('input').addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        location.hash = "search/" + e.target.value
    }
});
