var AdvHashTable = function() {
  this._limit = 8;
  this._loadFactor;
  this._occupied = 0;
  this._storage = LimitedArray(this._limit);
  this._testPair1;
  this._testPair2;
};

AdvHashTable.prototype.insert = function(k, v) {
	AdvHashTable.findSpaceAndPlace(k,v,this);

	if (this._loadFactor >= 75) {
		this._limit *= 2;
		var oldArray = [];

		this._storage.each(function(val) {
			oldArray.push(val);
		});

		this._storage = LimitedArray(this._limit);
		this._occupied = 0;
		this._loadFactor = 0;

		for (var i = 0; i < oldArray.length; i++) {
			if (oldArray[i] !== undefined)
			{
				// AdvHashTable.testPair(oldArray[i]);

				AdvHashTable.findSpaceAndPlace(oldArray[i][0], oldArray[i][1], this);
							
				// AdvHashTable.testPair([undefined,undefined]);
				// var advval = AdvHashTable.prototype.retrieve.call(this,oldArray[i][0]);
				// AdvHashTable.testPair([oldArray[i][0],advval]);
			}
		}
	}
};

AdvHashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);

	for (var i = index; i < this._limit; i++) {
		if (this._storage.get(i) !== undefined) {
			if (this._storage.get(i)[0] === k) {
				return this._storage.get(i)[1];
			}
		}
	}
	for (var i = 0; i < index; i++) {
		if (this._storage.get(i) !== undefined) {
			if (this._storage.get(i)[0] === k) {
				return this._storage.get(i)[1];
			}
		}
	}

  return undefined;
};

AdvHashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var check = -1;

	for (var i = index; i < this._limit; i++) {
		if (this._storage.get(i) !== undefined) {
		 	if (this._storage.get(i)[0] === k) {	
				this._occupied--;
 				this._storage.set(i, undefined);

 				this._loadFactor = Math.floor(100 * this._occupied/this._limit);

				if (this._loadFactor < 25) {
					this._limit /= 2;

					var oldArray = [];

					this._storage.each(function(val) {
						oldArray.push(val);
					});

					this._storage = LimitedArray(this._limit);
					this._occupied = 0;
					this._loadFactor = 0;

					for (var i = 0; i < oldArray.length; i++) {
						if (oldArray[i] !== undefined)
						{
							// AdvHashTable.testPair(oldArray[i]);

							AdvHashTable.findSpaceAndPlace(oldArray[i][0], oldArray[i][1], this);
							
							// AdvHashTable.testPair([undefined,undefined]);
							// var advval = AdvHashTable.prototype.retrieve.call(this,oldArray[i][0]);
							// AdvHashTable.testPair([oldArray[i][0],advval]);
						}
					}
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

AdvHashTable.findSpaceAndPlace = function(key, val, store) {
					var index = getIndexBelowMaxForKey(key, store._limit);
					var pair = [];
			  		pair[0] = key;
			  		pair[1] = val;

			  		var test = store._limit;
					
					for (var i = index; i < store._limit; i++)
					{
						if (store._storage.get(i) === undefined) {
				  			store._storage.set(i, pair);
				  			break;
						} else if (store._storage.get(i)[0] === key) {	
				  			store._storage.set(i, pair);
				  			break;
						}

						if (i === store._limit-1) {
							i = -1;
						}
					}
			  		store._occupied++;
					store._loadFactor = Math.ceil(100 * store._occupied/store._limit);
				}

// AdvHashTable.testPair = function(pair) {
// 	this._testPair1 = pair[0];
// 	this._testPair2 = pair[1];
// }

/*
 * Complexity: What is the time complexity of the above functions?
 */


