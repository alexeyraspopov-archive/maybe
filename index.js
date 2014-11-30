function isMonad(value){
	return value && (value.isJust || value.isNothing);
}

function isNullable(value){
	return typeof value === 'undefined' || value == null;
}

function Nothing(value){
	return isMonad(value) ? value : {
		isNothing: true,
		// todo: return this?
		bind: function(){
			return Nothing();
		}
	};
}

function Just(value){
	// todo: use object.create
	return isMonad(value) ? value : {
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