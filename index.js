function Nothing(value){
	return value && value.isMonad ? value : { bind: function(){
			return Nothing();
	} };
}

function Just(value){
	return value && value.isMonad ? value : { bind: function(morphism){
			return Just(morphism(value));
	} };
};

function isNullable(value){
	return typeof value === 'undefined' || value == null;
}

function Maybe(value){
	return (isNullable(value) ? Nothing : Just)(value);
}

exports.Just = Just;
exports.Nothing = Nothing;
exports.Maybe = Maybe;