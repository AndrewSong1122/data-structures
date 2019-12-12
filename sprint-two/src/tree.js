var Tree = function(value) {
  var newTree = {};
  newTree.value = value;

  // your code here
  newTree.children = [];  // fix me

  for(var i in treeMethods) {
  	newTree[i] = treeMethods[i];
  }

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
	var newTree = Tree(value);

	this.children.push(newTree);
};

treeMethods.contains = function(target) {
	var bool = false;

	// if (this.value === target) {
	// 	bool = true;
	// }
	// if (bool === false)
	// {
		// for (var i = 0; i < this.children.length; i++) {
		// 	bool = this.children[i].contains(target);
		// }
	// }
	// return bool;

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



/*
 * Complexity: What is the time complexity of the above functions?
 */
