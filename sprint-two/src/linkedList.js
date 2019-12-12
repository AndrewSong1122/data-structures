var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    var newNode = Node(value);

    if (list.head === null) {
      list.head = newNode;
      list.tail = newNode;
    } else if (list.head === list.tail) {
      list.head.next = newNode;
      list.tail = newNode;
    } else {
      list.tail.next = newNode;
      list.tail = newNode;
    }
  };

  list.removeHead = function() {
    var output;

    if (list.head === null) {
      return output;
    } else if (list.head === list.tail) {
      output = list.head.value;
      list.head = null;
      list.tail = null;
    } else {
      output = list.head.value;
      list.head = list.head.next;
    }

    return output;
  };

  list.contains = function(target) {
    var here = list.head;

    while(here.next !== null) {
      if (here.value === target) {
        return true;
      }

      here = here.next;
    }

    if (here.value === target) {
      return true;
    }

    return false;
  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
