var BinarySearchTree = function(value) {

	var tree = Object.create(BSTmethods);
	tree.left;
	tree.right;
	tree.value = value;
	tree.minHeight = 1;
	tree.root = true;

	return tree;
};

var BSTmethods = {};

BSTmethods.insert = function(val) {
	var newTree = BinarySearchTree(val);
	newTree.root = false;


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

	this.updateTreeProperties();
	if (this.height >= this.minHeight * 2) {

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

BSTmethods.updateTreeProperties = function() {
	var edgeAndNodeCounts = this.DFS();
	this.minHeight = Math.ceil(Math.log2(edgeAndNodeCounts[1] + 1));
	this.height = edgeAndNodeCounts[0];
};

BSTmethods.DFS = function() {
	var arr = [0, 0]; // [depth, node count]
	var left = 0;
	var right = 0;
	var nodeCount = 1;

	if (this.left) {
		var leftReturn = this.left.DFS();
		left = 1 + leftReturn[0];
		nodeCount += leftReturn[1];
	}
	if (this.right) {
		var rightReturn = this.right.DFS();
		right = 1 + rightReturn[0];
		nodeCount += rightReturn[1];
	}
	if (!this.left && !this.right) {
		return [1,1];
	}

	// edge counts
	if (left >= right) {
		// return left;
		arr[0] = left;
	} else {
		// return right;
		arr[0] = right;
	}

	arr[1] = nodeCount;

	return arr;
};

BSTmethods.rebalance = function() {
	// Check
	if (this.right && !this.left) {
		if (this.right.right && !this.right.left) {
			if (this.right.right.left && !this.right.right.right) {
				var c = this.right.right.left;
				var p = this.right.right;
				var gp = this.right;

				c.left = gp;
				c.right = p;
				this.right = c;

				// gp.left = undefined;
				gp.right = undefined;
				p.left = undefined;
				// p.right = undefined;
			}
		}
	}
	if (this.left && !this.right) {
		if (this.left.left && !this.left.right) {
			if (this.left.left.right && !this.left.left.left) {
				var c = this.left.left.right;
				var p = this.left.left;
				var gp = this.left;

				c.right = gp;
				c.left = p;
				this.left = c;

				p.right = undefined;
				gp.left = undefined;
			}

		}

	}
}

BSTmethods.fixHeight = function() {

};

BSTmethods.rotate = function() {
	//   \
	//    \
	//    /
		if (this.right.right && !this.right.left) {
			if (this.right.right.left && !this.right.right.right) {
				var c = this.right.right.left;
				var p = this.right.right;
				var gp = this.right;

				if (c === undefined && this.left === undefined) {
					this.left = p;
					gp.right = undefined;
				} else {
					c.left = gp;
					c.right = p;
					this.right = c;

					// gp.left = undefined;
					gp.right = undefined;
					p.left = undefined;
					// p.right = undefined;
				}
			}
		}
		//  /
		// /
		// \
		if (this.left.left && !this.left.right) {
			if (this.left.left.right && !this.left.left.left) {
				var c = this.left.left.right;
				var p = this.left.left;
				var gp = this.left;

				if (c === undefined && this.right === undefined) {
					this.right = p;
					gp.left = undefined;
				} else {
					c.right = gp;
					c.left = p;
					this.left = c;
	
					p.right = undefined;
					gp.left = undefined;
				}
			}
		}
		//  \
		//  /
		//  \
		if (this.right.left && !this.right.right) {
			if (this.right.left.right && !this.right.left.left) {
				var c = this.right.left.right;
				var p = this.right.left;
				var gp = this.right;

				if (c === undefined && this.left === undefined) {
					this.left = p;
					gp.left = undefined;
				} else {
					gp.right = c;
					p.right = undefined;
				}
			}
		}
		// /
		// \
		// /
		if (this.left.right && !this.left.left) {
			if (this.left.right.left && !this.left.right.right) {
				var c = this.left.right.left;
				var p = this.left.right;
				var gp = this.left;

				if (c === undefined && this.right === undefined) {
					this.right = p;
					gp.right = undefined;
				} else {
					gp.right = c;
					p.left = undefined;
				}
			}
		}
		//  \
		//  /
		// /
		if (this.right.left && !this.right.left) {
			if (this.right.left.left && !this.right.left.right) {
				var c = this.right.right.left;
				var p = this.right.right;
				var gp = this.right;

				c.left = gp;
				c.right = p;
				this.right = c;

				// gp.left = undefined;
				gp.right = undefined;
				p.left = undefined;
				// p.right = undefined;
			}
		}
		//   /
		//  /
		// /
		if (this.left.left && !this.left.right) {
			if (this.left.left.left && !this.left.left.right) {
				var c = this.left.left.right;
				var p = this.left.left;
				var gp = this.left;

				c.right = gp;
				c.left = p;
				this.left = c;

				p.right = undefined;
				gp.left = undefined;
			}
		}
		// \
		//  \
		//   \
		if (this.right.right && !this.right.left) {
			if (this.right.right.right && !this.right.right.left) {
				var c = this.right.right.left;
				var p = this.right.right;
				var gp = this.right;

				c.left = gp;
				c.right = p;
				this.right = c;

				// gp.left = undefined;
				gp.right = undefined;
				p.left = undefined;
				// p.right = undefined;
			}
		}
		// /
		// \
		//  \
		if (this.left.right && !this.left.left) {
			if (this.left.right.right && !this.left.right.left) {
				var c = this.left.left.right;
				var p = this.left.left;
				var gp = this.left;

				c.right = gp;
				c.left = p;
				this.left = c;

				p.right = undefined;
				gp.left = undefined;
			}
		}
}

// BSTmethods.balanceCheck

/*
 * Complexity: What is the time complexity of the above functions?
 */
