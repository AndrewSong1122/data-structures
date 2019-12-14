var BinarySearchTree = function(value) {

	var tree = Object.create(BSTmethods);
	tree.left;
	tree.right;
	tree.value = value;
	tree.nodeCount = 1;
	// tree.height = 1;
	tree.minHeight = 1;

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
};

BSTmethods.breadthFirstLog = function(cb) {
	var queue = [this];

	var BFS = function(node) {
		cb(node.value);

		if (node.left) {
			queue.push(node.left);
		}
		if (node.right) {
			queue.push(node.right);
		}

		queue.shift();

		if (queue.length > 0) {
			BFS(queue[0]);
	 	}
	};

	BFS(this);
};

BSTmethods.updateMinHeight = function() {
	this.minHeight = Math.ceil(Math.log2(this.nodeCount + 1));
};

BSTmethods.updateHeight = function() {
	var currentHeight = 1;
	var height = 1;

	// var DFS = function(node, depth) {
	// 	if (node.left) {
	// 		DFS(node.left, depth + 1);
	// 	}
	// 	if (node.right) {
	// 		DFS(node.right, depth + 1);
	// 	}
	// 	if (depth > height) {
	// 		return depth;
	// 	}
	// }

	// DFS(this, currentHeight);

	// this.height = height;

	return this.DFS(currentHeight, height);
};

BSTmethods.DFS = function(depth, currentTreeHeight) {	
		if (this.left) {
			this.left.DFS(depth + 1, depth);
		}
		if (this.right) {
			this.right.DFS(depth + 1, depth);
		}
		if (depth > currentTreeHeight) {
			return;
		}
}

/*
 * Complexity: What is the time complexity of the above functions?
 */
