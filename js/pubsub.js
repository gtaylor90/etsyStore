

var Dog = function(){
	this.legs = 4;
	this.speak = function(){
		console.log('woof')
	};
	var self = this

	Backbone.Events.on('bacon', self.speak);
};

var jake = new Dog();

// write a function that logs "KERPLUNK"
var BoomBby = function(){
	var stableSelf = this;
	this.boomBby = function(){
		console.log('KERPLUNK')
	};
	Backbone.Events.on('cannonBall', stableSelf.boomBby);
};

// var newCannon = new BoomBby();

Backbone.Events.trigger('cannonBall')