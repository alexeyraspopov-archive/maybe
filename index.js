'use strict';

function isNullable(value){
	return typeof value === 'undefined' || value === null;
}

function check(value){
	return (isNullable(value) ? Nothing : Just)(value);
}

function isFunction(value){
	return typeof value === 'function';
}

var Monad = require('dgelong.monad'),
	Maybe, Just, Nothing;

Maybe = Monad('Maybe', function(value, right, left){
	return check(value).bind(right, left);
});

Just = Monad('Just', function(value, morphism){
	return Just(morphism(value));
});

Nothing = Monad('Nothing', function(value, _, alternative){
	return isFunction(alternative) ? Just(alternative()) : Nothing();
});

Maybe.Just = Just;
Maybe.Nothing = Nothing;
module.exports = Maybe;
