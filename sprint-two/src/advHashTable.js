var AdvHashTable = function() {
  this._limit = 8;
  this._loadFactor;
  this._occupied = 0;
  this._storage = LimitedArray(this._limit);
};

AdvHashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);

  	var pair = {};
  	pair[k] = v;
  	this._occupied++;

	for (var i = index; i < this._limit; i++)
	{
		if (this._storage.get(i) === undefined) {
  			this._storage.set(i, pair);
  			break;
		} else if (Object.keys(this._storage.get(i))[0] === k) {
  			this._storage.set(i, pair);
  			break;
		}

		if (i === this._limit-1) {
			i = -1;
		}
	}



	this._loadFactor = Math.ceil(100 * this._occupied/this._limit);

	if (this._loadFactor >= 75) {
		this._limit *= 2;
		var newArray = LimitedArray(this._limit);

		this._storage.each(function(val, key) {
			newArray.set(key, val);
		});

		this._storage = newArray;
	}
};

AdvHashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  	var check = -1;

	for (var i = index; i < this._limit; i++)
	{
		if (this._storage.get(i) !== undefined) {
			if (Object.keys(this._storage.get(i))[0] === k) {
  				return this._storage.get(i)[k];
			}
		}

		if (i === this._limit-1) {
			i = -1;
			check = index-1;
		}
		if (i === check) {
			break;
		}
	}

  return undefined;
};

AdvHashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var check = -1;

	for (var i = index; i < this._limit; i++) {
		if (this._storage.get(i) !== undefined) {
			if (Object.keys(this._storage.get(i))[0] === k) {
				this._occupied--;
 				this._storage.set(i, undefined);

 				this._loadFactor = Math.ceil(100 * this._occupied/this._limit);

				if (this._loadFactor < 25) {
					this._limit /= 2;
					var newArray = LimitedArray(this._limit);

					this._storage.each(function(val, key) {
						newArray.set(key, val);
					});

					this._storage = newArray;
				}
				
				break;
			}

			if (i === this._limit-1) {
				i = -1;
				check = index-1;
			}
			if (i === check) {
				break;
			}
		} else {
			if (i === this._limit-1) {
				i = -1;
				check = index-1;
			}
			if (i === check) {
				break;
			}
		}
	}
};



/*
 * Complexity: What is the time complexity of the above functions?
 */


