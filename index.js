function isMonad(value){
	return value && value.isMonad;
}

function isNullable(value){
	return typeof value === 'undefined' || value == null;
}

function Nothing(value){
	return isMonad(value) ? value : {
		isMonad: true,
		isNothing: true,
		bind: function(){
			return Nothing();
		}
	};
}

function Just(value){
	return isMonad(value) ? value : {
		isMonad: true,
		isJust: true,
		bind: function(morphism){
			return Just(morphism(value));
		}
	};
}

function Maybe(value){
	return (isNullable(value) ? Nothing : Just)(value);
}

exports.Just = Just;
exports.Nothing = Nothing;
exports.Maybe = Maybe;