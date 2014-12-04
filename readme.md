# Maybe

A JavaScript Maybe monad implementation.

## Install

	npm install alexeyraspopov/maybe

## API

 * `Maybe` - function which receives single value and returns `Just(value)` or `Nothing` depending of value
 * `Just` - monoid with single value and `bind` operator
 * `Nothing` - empty monoid
 * `bind` - operator for `Just` and `Nothing` which takes morphism and returns new monoid (behaves like `flatMap`)

## Usage

Require `Maybe` function.

	var Maybe = require('dgelong.maybe');

It also takes you two monoids.

	var { Just, Nothing } = Maybe;

Simple validation.

	function square(n){
		return n * n;
	};

	function isEven(n){
		return n % 2 ? Nothing() : Just(n);
	}

	Just(5)
		.bind(square) // returns Just(25)
		.bind(isEven) // returns Nothing()
		.bind(alert); // won't work

If you want to use alternative value to continue a chain (in case of Nothing), use second param of `bind`.

	Nothing()
		.bind(_, () => return Just('new data'))
		.bind(log); // 'new data'

Example: null-safe processing.

	Maybe(product.description)
		.bind(toLowerCase)
		.bind(translate)
		.bind(alert);

## License

MIT License &copy; Alexey Raspopov