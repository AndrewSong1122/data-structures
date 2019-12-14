var AdvTree = function(value) {
  var newTree = {};
  newTree.value = value;

  // your code here
  newTree.children = [];  // fix me
  newTree.parent;

  for(var i in treeMethods) {
  	newTree[i] = treeMethods[i];
  }

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
	var newTree = AdvTree(value);
	newTree.parent = this;

	this.children.push(newTree);
};

treeMethods.contains = function(target) {
	var bool = false;

	var search = function(node) {
		if (node.value === target)
		{
			bool = true;
		} else {
			for (var i = 0; i < node.children.length; i++) {
				search(node.children[i]);
			}	
		}
	}

	search(this);

	return bool;
};

treeMethods.removeFromParent = function() {
	if (this.parent !== undefined) {
		var ind;

		for (var i = 0; i < this.parent.children.length; i++) {
			if (this.parent.children[i].value === this.value) {
				ind = i;
			}
		}

		this.parent.children.splice(ind,1);

		this.parent = undefined;
	}
};


treeMethods.traverse = function(cb) {
	cb(this.value);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].traverse(cb);
	}
};


/*
 * Complexity: What is the time complexity of the above functions?
 */
