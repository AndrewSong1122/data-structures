var AdvHashTable = function() {
  this._limit = 8;
  this._loadFactor;
  this._occupied = 0;
  this._storage = LimitedArray(this._limit);
};

/*
 * Adds a key-value pair to storage, and increases
 * storage size if necessary.
 */
AdvHashTable.prototype.insert = function(k, v) {
	// See line 141
	AdvHashTable.findSpaceAndPlace(k,v,this);

	// Double storage size when load factor reaches or exceeds 75%
	if (this._loadFactor >= 75) {
		// Double storage size
		this._limit *= 2;

		// Copy all data into temp array
		var oldArray = [];
		this._storage.each(function(val) {
			oldArray.push(val);
		});

		// Reinitialize storage with updated size, and reset occupied spaces counter and load factor
		this._storage = LimitedArray(this._limit);
		this._occupied = 0;
		this._loadFactor = 0;

		// Reinsert data into storage
		for (var i = 0; i < oldArray.length; i++) {
			if (oldArray[i] !== undefined)
			{
				AdvHashTable.findSpaceAndPlace(oldArray[i][0], oldArray[i][1], this);
			}
		}
	}
};

/*
 * Searches for the value associated with k and returns it, or
 * undefined if k is not a key in storage.
 */ 
AdvHashTable.prototype.retrieve = function(k) {
  	var index = getIndexBelowMaxForKey(k, this._limit);

  	// Begins searching for k at hash index
	for (var i = index; i < this._limit; i++) {
		if (this._storage.get(i) !== undefined) {
			// Check occupied spaces
			if (this._storage.get(i)[0] === k) {
				// Return value associated with k
				return this._storage.get(i)[1];
			}
		}
	}
	// Also checks spaces before index
	for (var i = 0; i < index; i++) {
		// Check occupied spaces
		if (this._storage.get(i) !== undefined) {
			if (this._storage.get(i)[0] === k) {
				// Return value associated with k
				return this._storage.get(i)[1];
			}
		}
	}

	// Return undefined if k is not found
	return undefined;
};

/*
 * If key k exists in storage, it is removed. Storage
 * size is halved if necessary.
 */
AdvHashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var check = -1;

  	/*
  	 * Start searching for k starting at hash index
  	 */
	for (var i = index; i < this._limit; i++) {
		// Skip empty spaces
		if (this._storage.get(i) !== undefined) {
		 	if (this._storage.get(i)[0] === k) {	
 				// Remove matching key, and update occupied space counter and load factor
 				this._storage.set(i, undefined);
				this._occupied--;
 				this._loadFactor = Math.floor(100 * this._occupied/this._limit);

 				// Resize array when load factor drops below 25%
				if (this._loadFactor < 25) {
					// Halve size of array
					this._limit /= 2;

					// Copy data into temp array
					var oldArray = [];
					this._storage.each(function(val) {
						oldArray.push(val);
					});

					// Reset storage with updated size, reset occupied spaces and load factor
					this._storage = LimitedArray(this._limit);
					this._occupied = 0;
					this._loadFactor = 0;

					// Reinsert all data into new storage
					for (var i = 0; i < oldArray.length; i++) {
						if (oldArray[i] !== undefined)
						{
							AdvHashTable.findSpaceAndPlace(oldArray[i][0], oldArray[i][1], this);
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

/*
 * Creates an array to hold a key-value pair, locates a suitable
 * place in storage, and places the array there.
 */
AdvHashTable.findSpaceAndPlace = function(key, val, store) {
	// Create key-value pair array
	var pair = [key, val];

	// Search for a place to put pair, starting at hash index
	var index = getIndexBelowMaxForKey(key, store._limit);
	// Sequentially finds a space on collision
	for (var i = index; i < store._limit; i++)
	{	
		if (store._storage.get(i) === undefined) {
				// Either put pair in empty space...
				store._storage.set(i, pair);
				break;
		} else if (store._storage.get(i)[0] === key) {	
				// ... or overwrite existing key
				store._storage.set(i, pair);
				break;
		}

		if (i === store._limit-1) {
			i = -1;
		}
	}
	// Update occupied space counter and load factor
	store._occupied++;
	store._loadFactor = Math.ceil(100 * store._occupied/store._limit);
}

/*
 * Complexity: What is the time complexity of the above functions?
 */


