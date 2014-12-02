function isMonad(value){
	return value && (value.isJust || value.isNothing);
}

function isNullable(value){
	return typeof value === 'undefined' || value === null;
}

function isFunction(value){
	return typeof value === 'function';
}

function Nothing(value){
	return isMonad(value) ? value : {
		isNothing: true,
		bind: function(_, alternative){
			return isFunction(alternative) ? Just(alternative()) : Nothing();
		},
		toString: function(){ return 'Nothing()'; }
	};
}

function Just(value){
	return isMonad(value) ? value : {
		isJust: true,
		bind: function(morphism){ return Just(morphism(value)); },
		toString: function(){ return 'Just(' + value + ')'; }
	};
}

function Maybe(value){
	return (isNullable(value) ? Nothing : Just)(value);
}

exports.Just = Just;
exports.Nothing = Nothing;
exports.Maybe = Maybe;