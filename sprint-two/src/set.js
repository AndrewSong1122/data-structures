var Set = function() {
  var set = Object.create(setPrototype);
  set._storage = {}; // fix me
  return set;
};

var setPrototype = {};

setPrototype.add = function(item) {
	this._storage[Set.stringify(item)] = item;	
};

setPrototype.contains = function(item) {
	return this._storage.hasOwnProperty(Set.stringify(item));
};

setPrototype.remove = function(item) {
	delete this._storage[Set.stringify(item)];
};

Set.stringify = function(item) {
	if (item === null) {
		return 'null';
	} else if (item === undefined) {
		return 'undefined';
	} else if (typeof item === 'string') {
		return item;
	} else if (typeof item === 'number' || typeof item === 'boolean') {
		return item.toString;
	} else if (Array.isArray(item)) {
		var output = item.join('\/');
		return '[' + output + ']';
	} else if (typeof item === 'object') {
		var output = '';

		for (var key in item) {
			output = output + key + ':' + Set.stringify(item[key]) + ',';
		}

		output = output.slice(0, output.length-1);

		return '{'+output+'}';
	}
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
