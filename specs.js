var Maybe = require('./index'),
	Just = Maybe.Just,
	Nothing = Maybe.Nothing;

function unwrap(m){
	var value;

	m.bind(function(v){
		value = v;
	});

	return value;
}

function spy(){
	var object = { method: function(){} };

	spyOn(object, 'method');

	return object;
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
		var subscriber = spy();

		Nothing().bind(subscriber.method);

		expect(subscriber.method).not.toHaveBeenCalled();
	});

	it('should accept alternative way of computation', function(){
		var subscriber = spy();

		Nothing().bind(function(){}, subscriber.method);

		expect(subscriber.method).toHaveBeenCalled();
	});

	it('should use Just in alternative way', function(){
		var value = 5;

		Nothing().bind(function(){}, function(){
			return Just(value);
		}).bind(function(wrapped){
			expect(wrapped).toBe(value);
		});
	});
});

describe('Maybe', function(){
	it('should recognize nullable values', function(){
		var subscriber1 = spy(),
			subscriber2 = spy();

		Maybe(null).bind(subscriber1.method);
		Maybe(true).bind(subscriber2.method);

		expect(subscriber1.method).not.toHaveBeenCalled();
		expect(subscriber2.method).toHaveBeenCalled();
	});
});