

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);

  	var pair = {};
  	pair[k] = v;

	for (var i = index; i < this._limit; i++)
	{
		if (this._storage.get(index) === undefined) {
  			this._storage.set(index, pair);
  			return;
		} else if (Object.keys(this._storage.get(index))[0] === k) {
  			this._storage.set(index, pair);
  			return;
		}

		index++;
	}
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);

	for (var i = index; i < this._limit; i++)
	{
		if (this._storage.get(index) !== undefined) {
			if (Object.keys(this._storage.get(index))[0] === k) {
  				return this._storage.get(index)[k];
			}
		}

		index++;
	}

  return undefined;
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);

	for (var i = index; i < this._limit; i++)
	{
		if (this._storage.get(index) !== undefined) {
			if (Object.keys(this._storage.get(index))[0] === k) {
 				this._storage.set(index, undefined);
			}
		}

		index++;
	}
};



/*
 * Complexity: What is the time complexity of the above functions?
 */


