var BloomFilter = function() {
	var bf = {};	
	var slots = []; 
	var m = 18; // 18 slots
	var k = 3; // 3 hash functions

	var check = function(item) {
		if (slots[hash1] && slots[hash2] && slots[hash3]) {
			return true;
		} else {
			return false;
		}
	};

	var hash1 = function(item) {
		
	};

	var hash2 = function(item) {
		
	};

	var hash3 = function(item) {

	};

	return bf;
};