var _ = require('./index'),
	Maybe = _.Maybe,
	Just = _.Just,
	Nothing = _.Nothing;

function unwrap(m){
	var value;

	m.bind(function(v){
		value = v;
	});

	return value;
}

describe('Just', function(){
	var value = 13, morphism = function(n){ return n * n };

	it('should satisfy the left identity law', function(){
		var m = Just(value),
			left = m.bind(morphism),
			right = morphism(value);

		expect(unwrap(left)).toBe(right);
	});

	it('should satisfy the right identity law', function(){
		var m = Just(value),
			left = m.bind(Just),
			right = m;

		expect(unwrap(left)).toBe(unwrap(right));
	});

	it('should satisfy the associativity law', function(){
		var m = Just(value),
			left = m.bind(Just).bind(morphism),
			right = m.bind(function(v){
				return Just(v).bind(morphism);
			});

		expect(unwrap(left)).toBe(unwrap(right));
	});
});

describe('Nothing', function(){
	it('should not execute the chain', function(){
		var subscriber = { method: function(){} };

		spyOn(subscriber, 'method');
		Nothing().bind(subscriber.method);

		expect(subscriber.method).not.toHaveBeenCalled();
	});
});

describe('Maybe', function(){
	it('should recognize nullable values', function(){
		var subscriber1 = { method: function(){} },
			subscriber2 = { method: function(){} };

		spyOn(subscriber1, 'method');
		spyOn(subscriber2, 'method');

		Maybe(null).bind(subscriber1.method);
		Maybe(true).bind(subscriber2.method);

		expect(subscriber1.method).not.toHaveBeenCalled();
		expect(subscriber2.method).toHaveBeenCalled();
	});
});