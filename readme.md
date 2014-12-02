# Maybe

A JavaScript Maybe implementation.

## Install

	npm install alexeyraspopov/maybe

## API

## Usage

Simple validation

	function square(n){
		return n * n;
	};

	function isEven(n){
		return n % 2 ? Nothing() : Just(n);
	}

	Just(5)
		.bind(square)
		.bind(isEven)
		.bind(alert);

Null safe

	Maybe(product.description)
		.bind(toLowerCase)
		.bind(translate)
		.bind(alert);

## License

MIT License &copy; Alexey Raspopov