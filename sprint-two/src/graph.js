

// Instantiate a new graph
var Graph = function() {
	this.graph = {};
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
	var newNode = {value : node, edges : []};
	this.graph[node] = newNode;
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
	for(var n in this.graph) {
		if (this.graph[n].value === node) {
			return true;
		}
	}

	return false;
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {
	var nodeForRemoval = this.graph[node];

	for(var i = 0; i < nodeForRemoval.edges.length; i++) {
		var neighbor = this.graph[nodeForRemoval.edges[i]];

		for(var n = 0; n < neighbor.edges.length; n++) {
			if (neighbor.edges[n] === node) {
				neighbor.edges.splice(n, 1);
			}
		}
	}

	delete this.graph[node];
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
	return this.graph[fromNode].edges.includes(toNode);
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
	this.graph[fromNode].edges.push(toNode);
	this.graph[toNode].edges.push(fromNode);
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
	this.graph[fromNode].edges.splice(this.graph[fromNode].edges.indexOf(toNode),1);
	this.graph[toNode].edges.splice(this.graph[toNode].edges.indexOf(fromNode),1);
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
	for (var key in this.graph) {
		cb(this.graph[key].value);
	}
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


