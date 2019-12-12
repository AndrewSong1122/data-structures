var BinarySearchTree = function(value) {

	var tree = Object.create(BSTmethods);
	tree.left;
	tree.right;
	tree.value = value;

	return tree;
};

var BSTmethods = {};

BSTmethods.insert = function(val) {
	var newTree = BinarySearchTree(val);

	if (val < this.value) {
		if (this.left ===  undefined) {
			this.left = newTree;
		} else {
			this.left.insert(val);
		}
	} else {
		if (this.right ===  undefined) {
			this.right = newTree;
		} else {
			this.right.insert(val);
		}
	}
};

BSTmethods.contains = function(val) {
	if (val === this.value) {
		return true;
	} else if (val < this.value && this.left !== undefined) {
		return this.left.contains(val);
	} else if (this.right !== undefined) {
		return this.right.contains(val);
	}

	return false;
};

BSTmethods.depthFirstLog = function(cb) {
	cb(this.value);
	if (this.left) {
		this.left.depthFirstLog(cb);
	}
	if (this.right) {
		this.right.depthFirstLog(cb);
	}
}

/*
 * Complexity: What is the time complexity of the above functions?
 */
