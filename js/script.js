// example url for requests
// https://openapi.etsy.com/v2/listings/active?api_key=r0qoq1mdfhswufpc5krm18n4

// sample search URL 
// https://openapi.etsy.com/v2/listings/active.js?keywords="+terms+"&limit=12&includes=Images:1&api_key="+api_key

// example of good key
// https://openapi.etsy.com/v2/listings/active?api_key=r0qoq1mdfhswufpc5krm18n4
// https://openapi.etsy.com/v2/listings/active.js?keywords=teeth&limit=12&api_key=r0qoq1mdfhswufpc5krm18n4

// url that's being produced:
// https://openapi.etsy.com/v2/listings/active?callback=jQuery300022380679628797173_1467011142832&_=1467011142833
var qs = function(input) {
    return document.querySelector(input)
};

var ItemCollection = Backbone.Collection.extend({
    url: "https://openapi.etsy.com/v2/listings/active.js",
    _key: "r0qoq1mdfhswufpc5krm18n4",
    parse: function(rawJSON) {
        console.log('Parsing Item Collection')
        console.log("rawJSON.results= ", rawJSON.results)
        return rawJSON.results
    }
});

var ItemModel = Backbone.Model.extend({
    url: "https://openapi.etsy.com/v2/listings/active.js",
    _key: "r0qoq1mdfhswufpc5krm18n4",
    parse: function(rawJSON) {
        console.log('parsing Item Model')
        console.log('rawJSON>>', rawJSON)
        return rawJSON.results[0]
    }
})

var ItemsView = Backbone.View.extend({
    el: qs("#container"),
    events: {
        "click .itemContainer": "_handleClick"
    },
    initialize: function(coll) {
        console.log('Initializing Items View')
        var thisView = this
        this.coll = coll
        var boundRender = this._render.bind(thisView)
        this.coll.on('sync', boundRender)
    },
    _handleClick: function(e) {
        console.log('handling clicks for ItemsView')
        var itemDiv = e.target
        console.log('the item div>>', itemDiv)
        window.itemDiv = itemDiv
        console.log('itemDiv>>', itemDiv)
        location.hash = "details/" + itemDiv.getAttribute('id')
    },
    _render: function() {
        console.log('rendering ItemsView')
        var itemsArray = this.coll.models
        var htmlString = ''
        console.log("First Item on the array", itemsArray[0])
        for (var i = 0; i < itemsArray.length; i++) {
            var itemMod = itemsArray[i]
            var itemAttr = itemMod.attributes
            var imgAttr = itemAttr.Images[0]
                // console.log(itemMod)
                // build out the HTML from here…
            htmlString += '<div id="' + itemAttr.listing_id + '" class="itemContainer">'
            htmlString += '<h2 id="' + itemAttr.listing_id + '">' + itemAttr.title + '</h2>'
            htmlString += '<img id="' + itemAttr.listing_id + '" src="' + imgAttr.url_fullxfull + '">'
            htmlString += '<p id="' + itemAttr.listing_id + '">' + itemAttr.description + '</P>'
            htmlString += '</div>'
        }
        this.el.innerHTML = htmlString
    }
});

var DetailView = Backbone.View.extend({
    el: qs("#container"),
    initialize: function(model) {
        console.log('Initializing Detail View')
        this.model = model;
        var boundRender = this._render.bind(this)
        this.model.on('sync', boundRender)
    },
    _render: function() {
        console.log("rendering out detail model>>", this.model)
        var itemMod = this.model
        var itemAttr = itemMod.attributes
        var htmlString = ''
        // cool img thing doesn't work 
        // var imgAttr = itemAttr.Images 
        // console.log("imageAttr>>", imgAttr)
            // console.log(itemMod)
            // build out the HTML from here…
        htmlString += '<div id="' + itemAttr.listing_id + '" class="itemContainer">'
        htmlString += '<h2 id="' + itemAttr.listing_id + '">' + itemAttr.title + '</h2>'
        // htmlString += '<img id="' + itemAttr.listing_id + '" src="' + imgAttr.url_fullxfull + '">'
        htmlString += '<p id="' + itemAttr.listing_id + '">' + itemAttr.description + '</P>'
        htmlString += '</div>'
        this.el.innerHTML = htmlString

    }
});

var EtsyRouter = Backbone.Router.extend({
    routes: {
        "details/:id": "doItemView",
        "search/:topic": "doSearchView",
        "home": "showHomeView",
        "*catchAll": "redirect"
    },
    doItemView: function(id) {
        console.log('Doing Item View')
        var itemModel = new ItemModel()
        console.log("item model>>", itemModel)
        itemModel.fetch({
            dataType: 'jsonp',
            processData: true,
            data: {
                fq: "_id" + id,
                api_key: itemModel._key
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
                api_key: searchCollection._key,
                q: searchTerm

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
                includes: 'Images:1',
                api_key: homeCollection._key
            }
        })
        new ItemsView(homeCollection)

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
